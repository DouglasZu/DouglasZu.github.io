import { access, readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(process.argv[2] || '.');
const errors = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === '.git') continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(fullPath));
    else files.push(fullPath);
  }
  return files;
}

function localTargets(markdown) {
  const targets = new Set();
  const patterns = [
    /!?(?:\[[^\]]*\])\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g,
    /\b(?:src|href)=["']([^"']+)["']/g,
  ];
  for (const pattern of patterns) {
    for (const match of markdown.matchAll(pattern)) {
      const target = match[1].split('#')[0].split('?')[0];
      if (!target || /^(?:https?:|mailto:|tel:|#)/i.test(target)) continue;
      targets.add(decodeURIComponent(target));
    }
  }
  return targets;
}

const files = await walk(root);
const readmePath = path.join(root, 'README.md');
const readme = await readFile(readmePath, 'utf8');
const readmeStats = await stat(readmePath);

if (readmeStats.size > 500_000) errors.push(`README.md is ${readmeStats.size} bytes; GitHub truncates content above 500 KiB.`);
const h1Count = (readme.match(/^#\s+/gm) || []).length + (readme.match(/<h1\b/gi) || []).length;
if (h1Count !== 1) errors.push(`README.md must contain exactly one H1; found ${h1Count}.`);

for (const file of files.filter((candidate) => candidate.endsWith('.md'))) {
  const markdown = await readFile(file, 'utf8');
  for (const target of localTargets(markdown)) {
    const resolved = path.resolve(path.dirname(file), target);
    try {
      await access(resolved);
    } catch {
      errors.push(`${path.relative(root, file)} links to missing local file: ${target}`);
    }
  }
}

for (const file of files.filter((candidate) => candidate.endsWith('.svg'))) {
  const svg = await readFile(file, 'utf8');
  if (!/<svg[\s>]/.test(svg)) errors.push(`${path.relative(root, file)} does not contain an SVG root element.`);
  if (/<(?:script|foreignObject)[\s>]/i.test(svg)) errors.push(`${path.relative(root, file)} contains disallowed active content.`);
  if (!/<title[\s>]/.test(svg)) errors.push(`${path.relative(root, file)} needs a <title> for accessibility.`);
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log(`Profile validation passed: ${files.length} files, ${readmeStats.size} byte README, ${files.filter((file) => file.endsWith('.svg')).length} SVG assets.`);
