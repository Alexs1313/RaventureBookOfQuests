#!/usr/bin/env node
/**
 * Compare two React Native iOS JS bundles for 4.3 similarity signals.
 *
 * Usage:
 *   node tools/compareBundles.mjs bundle-a.jsbundle bundle-b.jsbundle
 *
 * Generate a bundle:
 *   npm run bundle:ios
 */
import {readFileSync} from 'node:fs';

const [pathA, pathB] = process.argv.slice(2);

if (!pathA || !pathB) {
  console.error(
    'Usage: node tools/compareBundles.mjs <bundle-a> <bundle-b>',
  );
  process.exit(1);
}

const read = p => readFileSync(p, 'utf8');

const tokenize = text => {
  const ids = text.match(
    /[A-Z][a-zA-Z0-9]{3,}|[a-z][a-zA-Z0-9]{6,}|RavenQuest[A-Za-z]+|@[a-z_/]+/g,
  );
  return new Set(ids ?? []);
};

const strings = text => {
  const found = text.match(/"[^"]{8,120}"/g);
  return new Set(found ?? []);
};

const a = read(pathA);
const b = read(pathB);

const idsA = tokenize(a);
const idsB = tokenize(b);
const strA = strings(a);
const strB = strings(b);

const overlapIds = [...idsA].filter(x => idsB.has(x));
const overlapStr = [...strA].filter(x => strB.has(x));

const pct = (n, total) =>
  total === 0 ? 0 : ((n / total) * 100).toFixed(1);

console.log('\n=== Bundle comparison (4.3 heuristic) ===\n');
console.log(`A: ${pathA} (${(a.length / 1024).toFixed(0)} KB)`);
console.log(`B: ${pathB} (${(b.length / 1024).toFixed(0)} KB)\n`);
console.log(
  `Identifier overlap: ${overlapIds.length} / ${idsA.size} in A (${pct(overlapIds.length, idsA.size)}%)`,
);
console.log(
  `String literal overlap: ${overlapStr.length} / ${strA.size} in A (${pct(overlapStr.length, strA.size)}%)\n`,
);

if (overlapIds.length > 0) {
  console.log('Sample shared identifiers:');
  overlapIds.slice(0, 40).forEach(x => console.log(`  - ${x}`));
  if (overlapIds.length > 40) {
    console.log(`  … and ${overlapIds.length - 40} more`);
  }
}

if (overlapStr.length > 0) {
  console.log('\nSample shared strings:');
  overlapStr.slice(0, 20).forEach(x => console.log(`  ${x}`));
}

console.log(
  '\nTip: overlap >30% on identifiers may indicate template siblings.\n',
);
