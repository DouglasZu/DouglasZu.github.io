import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'css', 'responsive.css'), 'utf8');
const errors = [];

const responsiveLink = '<link rel="stylesheet" href="css/responsive.css">';
const responsivePosition = html.indexOf(responsiveLink);
const previousLayerPosition = html.indexOf('<link rel="stylesheet" href="css/qa-update.css">');

if (!/<meta name="viewport" content="width=device-width, initial-scale=1\.0">/.test(html)) {
  errors.push('Viewport meta tag is missing or invalid.');
}

if (responsivePosition < 0) errors.push('Responsive stylesheet is not linked.');
if (responsivePosition < previousLayerPosition) errors.push('Responsive stylesheet must be the last CSS layer.');

const requiredPatterns = [
  [/@container\s+hero-proof/, 'component container query'],
  [/repeat\(auto-fit,\s*minmax\(min\(100%/, 'intrinsic auto-fit grid'],
  [/clamp\(/, 'fluid sizing'],
  [/100dvh/, 'dynamic viewport height'],
  [/@media\s*\(pointer:\s*coarse\)/, 'coarse-pointer targets'],
  [/@media\s*\(width\s*<=\s*22\.5em\)/, 'small-phone reflow'],
  [/env\(safe-area-inset-/, 'safe-area support'],
];

for (const [pattern, feature] of requiredPatterns) {
  if (!pattern.test(css)) errors.push(`Missing responsive feature: ${feature}.`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: responsive layer includes fluid sizing, intrinsic grids, container queries, touch targets, dynamic viewport and 320–360px reflow.');
