import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const i18nSource = fs.readFileSync(path.join(root, 'js', 'i18n.js'), 'utf8');
const errors = [];

const context = { window: {} };
vm.createContext(context);
vm.runInContext(`${i18nSource}\nglobalThis.translationsOut = translations;`, context);
const translations = context.translationsOut;

function flatten(value, prefix = '', output = new Set()) {
  for (const [key, child] of Object.entries(value)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (child && typeof child === 'object') flatten(child, fullKey, output);
    else output.add(fullKey);
  }
  return output;
}

const ptKeys = flatten(translations['pt-br']);
const enKeys = flatten(translations.en);
for (const key of ptKeys) if (!enKeys.has(key)) errors.push(`Missing English translation: ${key}`);
for (const key of enKeys) if (!ptKeys.has(key)) errors.push(`Missing Portuguese translation: ${key}`);

const referencedKeys = new Set();
for (const match of html.matchAll(/data-i18n(?:-aria|-tooltip)?="([^"]+)"/g)) referencedKeys.add(match[1]);
for (const key of referencedKeys) {
  if (!ptKeys.has(key)) errors.push(`Missing Portuguese DOM translation: ${key}`);
  if (!enKeys.has(key)) errors.push(`Missing English DOM translation: ${key}`);
}

const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
for (const match of html.matchAll(/href="#([^"]+)"/g)) {
  if (!ids.has(match[1])) errors.push(`Broken internal anchor: #${match[1]}`);
}

for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  const reference = match[1];
  if (/^(?:https?:|mailto:|#)/.test(reference)) continue;
  const cleanReference = decodeURIComponent(reference.split(/[?#]/)[0]);
  if (!fs.existsSync(path.join(root, cleanReference))) errors.push(`Missing local asset: ${reference}`);
}

const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (!jsonLdMatch) errors.push('Missing JSON-LD block.');
else {
  try { JSON.parse(jsonLdMatch[1]); }
  catch (error) { errors.push(`Invalid JSON-LD: ${error.message}`); }
}

const forbiddenClaims = [
  /redu(?:ção|ced).{0,30}70%/i,
  /150\+? endpoints/i,
  /98% (?:de )?(?:confiabilidade|reliability)/i,
  /(?:melhor|improv).{0,30}40%/i,
  /every commit triggers/i,
  /todo commit executa/i,
  /discord\.gg/i,
];
for (const pattern of forbiddenClaims) {
  if (pattern.test(html) || pattern.test(i18nSource)) errors.push(`Forbidden or unsupported claim remains: ${pattern}`);
}

if (/<form\b/i.test(html)) errors.push('A form remains in the page.');
if (!html.includes('1200') || !html.includes('630')) errors.push('Open Graph image dimensions are missing.');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`OK: ${referencedKeys.size} translated DOM keys, ${ptKeys.size} keys per language, local assets and internal anchors validated.`);
