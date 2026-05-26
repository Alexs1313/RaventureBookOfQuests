import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

function deprefixSegment(segment) {
  if (!segment.startsWith('ExplorerMytthof')) {
    return segment;
  }
  const rest = segment.slice('ExplorerMytthof'.length);
  if (!rest) {
    return segment;
  }
  return `${rest[0].toLowerCase()}${rest.slice(1)}`;
}

function fixAssetPath(assetPath) {
  if (!assetPath.includes('ExplorerMytthofElements')) {
    return assetPath;
  }
  return assetPath.split('/').map(deprefixSegment).join('/');
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    if (entry.name === 'node_modules' || entry.name === '.git') {
      continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (/\.(ts|tsx|js)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  content = content.replace(
    /require\((['"])([^'"]+)\1\)/g,
    (_, quote, assetPath) => `require(${quote}${fixAssetPath(assetPath)}${quote})`,
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    return true;
  }
  return false;
}

const files = walk(path.join(ROOT, 'ExplorerMytthofSrc'));
let changed = 0;
for (const file of files) {
  if (fixFile(file)) {
    changed += 1;
    console.log(path.relative(ROOT, file));
  }
}

console.log(`Fixed ${changed} files.`);
