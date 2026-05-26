import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const PREFIX = 'explorerMytthof';
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'ExplorerMytthofSrc');
const TARGET_DIRS = [
  'ExplorerMytthofScreens',
  'ExplorerMytthofComponents',
  'ExplorerMytthofNavigation',
  'ExplorerMytthofLoungeKit',
].filter(dir => fs.existsSync(path.join(ROOT, dir)));

const SKIP_FILES = new Set([
  path.join(
    'ExplorerMytthofComponents',
    'ExplorerMytthofJokes',
    'ExplorerMytthofCategoryCard.tsx',
  ),
  path.join(
    'ExplorerMytthofComponents',
    'ExplorerMytthofJokes',
    'ExplorerMytthofJokeCard.tsx',
  ),
  path.join(
    'ExplorerMytthofLoungeKit',
    'ExplorerMytthofStorage',
    'ExplorerMytthofJokesStorage.ts',
  ),
]);

function addPrefix(name) {
  if (!name || name.startsWith(PREFIX)) {
    return name;
  }
  return `${PREFIX}${name[0].toUpperCase()}${name.slice(1)}`;
}

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) {
    return files;
  }
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (/\.(ts|tsx)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

function extractTopLevelStyleKeys(content) {
  const keys = [];
  const createIdx = content.indexOf('StyleSheet.create');
  if (createIdx === -1) {
    return keys;
  }
  const openBrace = content.indexOf('{', createIdx);
  if (openBrace === -1) {
    return keys;
  }

  let depth = 0;
  let end = openBrace;
  for (let i = openBrace; i < content.length; i++) {
    const ch = content[i];
    if (ch === '{') {
      depth += 1;
    } else if (ch === '}') {
      depth -= 1;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }

  const block = content.slice(openBrace + 1, end);
  const keyRe = /^ {2}([A-Za-z_][A-Za-z0-9_]*):/gm;
  let match;
  while ((match = keyRe.exec(block)) !== null) {
    keys.push(match[1]);
  }
  return keys;
}

function applyStyleRenames(content) {
  let next = content;
  const hadStyles = /\bconst styles = StyleSheet\.create/.test(next);
  const hadLayout = /\bconst layout = StyleSheet\.create/.test(next);

  next = next.replace(
    /\bconst styles = StyleSheet\.create/g,
    'const explorerMytthofStyles = StyleSheet.create',
  );
  next = next.replace(
    /\bconst layout = StyleSheet\.create/g,
    'const explorerMytthofLayout = StyleSheet.create',
  );

  const keys = extractTopLevelStyleKeys(next);
  for (const key of keys) {
    const prefixed = addPrefix(key);
    next = next.replace(new RegExp(`^( {2})${key}:`, 'gm'), `$1${prefixed}:`);
  }

  const containers = [];
  if (hadStyles) {
    containers.push(['styles', 'explorerMytthofStyles']);
  }
  if (hadLayout) {
    containers.push(['layout', 'explorerMytthofLayout']);
  }

  for (const [oldContainer, newContainer] of containers) {
    for (const key of keys) {
      const prefixed = addPrefix(key);
      next = next.replace(
        new RegExp(`\\b${oldContainer}\\.${key}\\b`, 'g'),
        `${newContainer}.${prefixed}`,
      );
      next = next.replace(
        new RegExp(`\\b${newContainer}\\.${key}\\b`, 'g'),
        `${newContainer}.${prefixed}`,
      );
    }
  }

  return next;
}

function applyUseStateRenames(content) {
  const renamePairs = [];
  let next = content.replace(
    /const \[([a-z][A-Za-z0-9_]*),\s*(set[A-Z][A-Za-z0-9_]*)\]\s*=/g,
    (match, stateName, setterName) => {
      if (stateName.startsWith(PREFIX)) {
        return match;
      }
      const prefixedState = addPrefix(stateName);
      const prefixedSetter = `set${PREFIX[0].toUpperCase()}${PREFIX.slice(1)}${stateName[0].toUpperCase()}${stateName.slice(1)}`;
      renamePairs.push([stateName, prefixedState], [setterName, prefixedSetter]);
      return `const [${prefixedState}, ${prefixedSetter}] =`;
    },
  );

  for (const [from, to] of renamePairs.sort((a, b) => b[0].length - a[0].length)) {
    next = next.replace(new RegExp(`\\b${from}\\b`, 'g'), to);
  }

  return next;
}

function applyModuleConstRenames(content) {
  if (content.includes('StyleSheet.create')) {
    return content;
  }

  const renamePairs = [];
  const re = /^const ([a-z][A-Za-z0-9_]*)\s*=/gm;
  let match;
  while ((match = re.exec(content)) !== null) {
    const name = match[1];
    if (!name.startsWith(PREFIX)) {
      renamePairs.push([name, addPrefix(name)]);
    }
  }

  let next = content;
  for (const [from, to] of renamePairs.sort((a, b) => b[0].length - a[0].length)) {
    next = next.replace(new RegExp(`\\b${from}\\b`, 'g'), to);
  }
  return next;
}

function processFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  let next = original;
  next = applyStyleRenames(next);
  next = applyUseStateRenames(next);
  next = applyModuleConstRenames(next);
  if (next !== original) {
    fs.writeFileSync(filePath, next);
    return true;
  }
  return false;
}

const files = TARGET_DIRS.flatMap(dir => walk(path.join(ROOT, dir))).filter(
  filePath => !SKIP_FILES.has(path.relative(ROOT, filePath)),
);

let changed = 0;
for (const filePath of files) {
  if (processFile(filePath)) {
    changed += 1;
    console.log(path.relative(ROOT, filePath));
  }
}

console.log(`Updated ${changed} files.`);
