import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const PREFIX = 'ExplorerMytthof';
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'ExplorerMytthofSrc');

function prefixName(name) {
  if (!name || name.startsWith(PREFIX) || name === 'index.ts') {
    return name;
  }
  const dot = name.lastIndexOf('.');
  if (dot > 0) {
    const base = name.slice(0, dot);
    if (base === 'index') {
      return name;
    }
    const ext = name.slice(dot);
    return `${PREFIX}${base[0].toUpperCase()}${base.slice(1)}${ext}`;
  }
  return `${PREFIX}${name[0].toUpperCase()}${name.slice(1)}`;
}

function mapPath(relativePath) {
  return relativePath
    .split(path.sep)
    .map(segment => prefixName(segment))
    .join(path.sep);
}

function walkFiles(dir, base = dir, files = []) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(full, base, files);
    } else {
      files.push(path.relative(base, full));
    }
  }
  return files;
}

function collectRenames() {
  const relFiles = walkFiles(SRC, SRC);
  const fileRenames = relFiles.map(rel => ({
    from: path.join(SRC, rel),
    to: path.join(SRC, mapPath(rel)),
  }));

  const dirs = new Set();
  for (const rel of relFiles) {
    const parts = rel.split(path.sep);
    for (let i = 1; i < parts.length; i++) {
      dirs.add(parts.slice(0, i).join(path.sep));
    }
  }

  const dirRenames = [...dirs]
    .sort((a, b) => b.split(path.sep).length - a.split(path.sep).length)
    .map(rel => ({
      from: path.join(SRC, rel),
      to: path.join(SRC, mapPath(rel)),
    }));

  return {fileRenames, dirRenames};
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), {recursive: true});
}

function applyFileRenames(fileRenames) {
  const sorted = [...fileRenames].sort(
    (a, b) => b.from.split(path.sep).length - a.from.split(path.sep).length,
  );
  for (const {from, to} of sorted) {
    if (from === to || !fs.existsSync(from)) {
      continue;
    }
    ensureDir(to);
    fs.renameSync(from, to);
    console.log(`file: ${path.relative(ROOT, from)} -> ${path.relative(ROOT, to)}`);
  }
}

function applyDirRenames(dirRenames) {
  for (const {from, to} of dirRenames) {
    if (from === to || !fs.existsSync(from)) {
      continue;
    }
    if (fs.readdirSync(from).length === 0) {
      fs.rmdirSync(from);
      console.log(`rmdir: ${path.relative(ROOT, from)}`);
    }
  }
}

function transformModulePath(modulePath) {
  if (!modulePath.startsWith('.')) {
    return modulePath;
  }
  return modulePath
    .split('/')
    .map(segment => {
      if (
        segment === '.' ||
        segment === '..' ||
        segment === '' ||
        segment === 'src' ||
        segment === 'ExplorerMytthofSrc' ||
        segment === 'elements'
      ) {
        return segment;
      }
      return prefixName(segment);
    })
    .join('/');
}

function updateFileContents(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  content = content.replace(
    /(from\s+['"])(\.[^'"]+)(['"])/g,
    (_, start, modulePath, end) =>
      `${start}${transformModulePath(modulePath)}${end}`,
  );

  content = content.replace(
    /(require\(\s*['"])(\.[^'"]+)(['"]\s*\))/g,
    (_, start, modulePath, end) =>
      `${start}${transformModulePath(modulePath)}${end}`,
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    return true;
  }
  return false;
}

function updateConfigPaths() {
  const configs = [
    path.join(ROOT, 'tsconfig.json'),
    path.join(ROOT, 'babel.config.js'),
    path.join(ROOT, 'App.tsx'),
    path.join(ROOT, 'scripts', 'apply-explorer-prefix.mjs'),
  ];

  const folderMap = [
    ['ExplorerMytthofSrc/navigation', 'ExplorerMytthofSrc/ExplorerMytthofNavigation'],
    ['ExplorerMytthofSrc/screens', 'ExplorerMytthofSrc/ExplorerMytthofScreens'],
    ['ExplorerMytthofSrc/components', 'ExplorerMytthofSrc/ExplorerMytthofComponents'],
    ['ExplorerMytthofSrc/data', 'ExplorerMytthofSrc/ExplorerMytthofData'],
    ['ExplorerMytthofSrc/palette', 'ExplorerMytthofSrc/ExplorerMytthofPalette'],
    ['ExplorerMytthofSrc/types', 'ExplorerMytthofSrc/ExplorerMytthofTypes'],
    ['ExplorerMytthofSrc/loungeKit', 'ExplorerMytthofSrc/ExplorerMytthofLoungeKit'],
    ['ExplorerMytthofSrc/assets', 'ExplorerMytthofSrc/ExplorerMytthofAssets'],
    ['src/', 'ExplorerMytthofSrc/'],
  ];

  for (const configPath of configs) {
    if (!fs.existsSync(configPath)) {
      continue;
    }
    let content = fs.readFileSync(configPath, 'utf8');
    let changed = false;
    for (const [from, to] of folderMap) {
      if (content.includes(from)) {
        content = content.split(from).join(to);
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(configPath, content);
      console.log(`config: ${path.relative(ROOT, configPath)}`);
    }
  }
}

function walkAllSourceFiles(dir, out = []) {
  if (!fs.existsSync(dir)) {
    return out;
  }
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') {
        continue;
      }
      walkAllSourceFiles(full, out);
    } else if (/\.(ts|tsx|js|json)$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

const {fileRenames, dirRenames} = collectRenames();
applyFileRenames(fileRenames);
applyDirRenames(dirRenames);

const filesToUpdate = walkAllSourceFiles(ROOT).filter(
  f => !f.includes('node_modules') && !f.includes('scripts/rename-explorer-paths'),
);

let updated = 0;
for (const file of filesToUpdate) {
  if (updateFileContents(file)) {
    updated += 1;
  }
}

updateConfigPaths();
console.log(`Updated imports in ${updated} files.`);
