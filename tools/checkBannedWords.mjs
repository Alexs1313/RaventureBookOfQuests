#!/usr/bin/env node
/**
 * Scans app source for App Store–sensitive terms in user-facing strings.
 * Run: npm run check:words
 */
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

const scanRoots = ['src'];

const banned = [
  'hidden',
  'bet',
  'betting',
  'wager',
  'stake',
  'odds',
  'sportsbook',
  'casino',
  'slots',
  'slot machine',
  'poker',
  'blackjack',
  'roulette',
  'jackpot',
  'lottery',
  'raffle',
  'sweepstakes',
  'prize',
  'cash prize',
  'real money',
  'real cash',
  'winnings',
  'win money',
  'earn rewards',
  'daily rewards',
  'claim reward',
  'lucky draw',
  'spin to win',
  'prediction contest',
  'compete for prizes',
  'leaderboard prizes',
  'bonus coins',
  'cashback',
  'hidden mode',
  'hidden feature',
  'secret mode',
  'secret reward',
  'invisible feature',
  'review mode',
  'special reviewer mode',
  'undocumented',
  'easter egg',
  'hidden switch',
  'diagnose',
  'diagnosis',
  'cure',
  'treatment',
  'therapy',
  'medical advice',
  'earn money',
  'make money',
  'passive income',
  'guaranteed profit',
  'investment advice',
  'trading signals',
  'risk-free',
  'double your money',
  'crypto mining',
  'nft rewards',
  'loan approval',
  'instant loan',
  'free forever',
  '100% free',
  'free premium',
  'free trial',
  'unlock all for free',
  'no payment required',
  'lifetime access',
  'for instagram',
  'for tiktok',
  'netflix',
  'spotify',
  'google play',
  'premium free',
  'viral',
  'trending',
  'guaranteed',
  'tiktok-style',
  'instagram-like',
  'chatgpt clone',
  'hack',
  'hacking',
  'spyware',
  'phishing',
  'steal data',
  'fake location',
  'secret locations',
  'urban exploration',
  'player',
  'players',
  'random',
  ' secret ',
  ' concealed ',
  'points obtained',
  'points needed',
  'earn you',
];

const allow = [
  "overflow: 'hidden'",
  'overflow: hidden',
  'keyboardhidden',
  'space-between',
  'legendsaventurebkk_points',
  'quiz_points',
  'between the worlds',
  ' between ',
  'learning',
  'glowing',
  'wings of ra',
  'wings guided',
  'window',
  'dimensions.get',
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (
        entry.name !== 'node_modules' &&
        entry.name !== 'tools' &&
        entry.name !== 'archive'
      ) {
        walk(full, files);
      }
    } else if (/\.(ts|tsx)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

const hits = [];

for (const root of scanRoots) {
  const absRoot = path.join(projectRoot, root);
  if (!fs.existsSync(absRoot)) {
    continue;
  }
  for (const file of walk(absRoot)) {
    const text = fs.readFileSync(file, 'utf8');
    const lines = text.split('\n');
    lines.forEach((line, index) => {
      const low = line.toLowerCase();
      if (/require\s*\(/.test(line) && !/['"`].*['"`].*['"`]/.test(line)) {
        return;
      }
      const looksLikeCopy =
        /['"`]|description:|title:|label:|legendsaventurebkkdescription/i.test(
          line,
        );
      if (!looksLikeCopy) {
        return;
      }
      for (const word of banned) {
        if (!low.includes(word)) {
          continue;
        }
        if (allow.some(a => low.includes(a))) {
          continue;
        }
        hits.push({
          file: path.relative(projectRoot, file),
          line: index + 1,
          word: word.trim(),
          snippet: line.trim().slice(0, 100),
        });
      }
    });
  }
}

if (hits.length === 0) {
  console.log('No banned terms found in user-facing strings.');
  process.exit(0);
}

console.log(`Found ${hits.length} possible match(es):\n`);
for (const hit of hits) {
  console.log(`${hit.file}:${hit.line} [${hit.word}]`);
  console.log(`  ${hit.snippet}\n`);
}
process.exit(1);
