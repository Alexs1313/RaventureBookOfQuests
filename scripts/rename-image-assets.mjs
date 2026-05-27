import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const IMAGES = path.join(ROOT, 'elements', 'images');

/** Old camelCase filename -> neutral three_word_name.png */
const RENAME_MAP = {
  'anubis.png': 'egypt_anubis_figure.png',
  'anubisPortrait.png': 'egypt_anubis_portrait.png',
  'appBackground.png': 'app_main_background.png',
  'athena.png': 'greece_athena_figure.png',
  'athenaPortrait.png': 'greece_athena_portrait.png',
  'aztecsGoldenEclipse.png': 'mesoamerica_amber_eclipse.png',
  'aztecsRedSky.png': 'mesoamerica_crimson_dusk.png',
  'aztecsUndergroundCity.png': 'mesoamerica_underground_city.png',
  'backIcon.png': 'nav_back_arrow.png',
  'circleOfShiva.png': 'india_shiva_wheel.png',
  'closeIcon.png': 'nav_close_glyph.png',
  'deleteIcon.png': 'action_remove_glyph.png',
  'egyptFalcon.png': 'egypt_falcon_shrine.png',
  'egyptMoonTomb.png': 'egypt_moon_chamber.png',
  'egyptObsidianGate.png': 'egypt_obsidian_arch.png',
  'greeceDelphi.png': 'greece_oracle_temple.png',
  'greeceShipwreck.png': 'greece_coastal_wreck.png',
  'greeceSilverHarp.png': 'greece_silver_lyre.png',
  'guardianGanesha.png': 'india_ganesha_statue.png',
  'hanuman.png': 'india_hanuman_figure.png',
  'hanumanPortrait.png': 'india_hanuman_portrait.png',
  'indiaEmeraldPalace.png': 'india_emerald_court.png',
  'indiaMoonRiver.png': 'india_moonlit_river.png',
  'indiaTigerTemple.png': 'india_temple_grove.png',
  'isis.png': 'egypt_isis_figure.png',
  'isisPortrait.png': 'egypt_isis_portrait.png',
  'loaderBackground.png': 'boot_screen_background.png',
  'lockIcon.png': 'ui_sealed_glyph.png',
  'onboardingArtifacts.png': 'welcome_relic_gallery.png',
  'onboardingCharacters.png': 'welcome_figure_gallery.png',
  'onboardingFourKingdoms.png': 'welcome_four_regions.png',
  'onboardingShapeStory.png': 'welcome_branching_tales.png',
  'owlOfAthena.png': 'greece_wisdom_owl.png',
  'poseidon.png': 'greece_sea_lord.png',
  'poseidonPortrait.png': 'greece_poseidon_portrait.png',
  'quetzalcoatl.png': 'mesoamerica_feather_serpent.png',
  'quetzalcoatlPortrait.png': 'mesoamerica_quetzal_portrait.png',
  'quizComplete.png': 'study_finished_banner.png',
  'quizCompleteBanner.png': 'study_done_banner.png',
  'quizHero.png': 'study_intro_scene.png',
  'quizIntro.png': 'study_welcome_scene.png',
  'savedEmpty.png': 'bookmark_empty_state.png',
  'scarabEternalSands.png': 'egypt_scarab_relic.png',
  'serpentOfEclipse.png': 'mesoamerica_eclipse_serpent.png',
  'shareButtonIcon.png': 'share_action_button.png',
  'shareIcon.png': 'action_share_glyph.png',
  'shiva.png': 'india_shiva_figure.png',
  'shivaPortrait.png': 'india_shiva_portrait.png',
  'solarGuardianWings.png': 'egypt_solar_wings.png',
  'spartanWarHelm.png': 'greece_bronze_helm.png',
  'sunCalendarDisc.png': 'mesoamerica_solar_disc.png',
  'tabArtifacts.png': 'tab_relics_icon.png',
  'tabCharacters.png': 'tab_figures_icon.png',
  'tabQuiz.png': 'tab_study_icon.png',
  'tabSaved.png': 'tab_bookmarks_icon.png',
  'tabTales.png': 'tab_chronicles_icon.png',
  'tezcatlipoca.png': 'mesoamerica_night_sky.png',
  'tezcatlipocaPortrait.png': 'mesoamerica_smoke_portrait.png',
};

function walkSourceFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    if (entry.name === 'node_modules' || entry.name === '.git') {
      continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkSourceFiles(full, out);
    } else if (/\.(ts|tsx|js|mjs|json|html)$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

const diskFiles = fs.readdirSync(IMAGES).filter(f => f.endsWith('.png'));
const missing = diskFiles.filter(f => !RENAME_MAP[f]);
const stale = Object.keys(RENAME_MAP).filter(f => !diskFiles.includes(f));

if (missing.length) {
  console.error('Missing rename entries:', missing);
  process.exit(1);
}
if (stale.length) {
  console.warn('Rename map entries without file:', stale);
}

for (const [from, to] of Object.entries(RENAME_MAP)) {
  const fromPath = path.join(IMAGES, from);
  const toPath = path.join(IMAGES, to);
  if (!fs.existsSync(fromPath)) {
    continue;
  }
  if (fs.existsSync(toPath) && fromPath !== toPath) {
    console.error(`Target already exists: ${to}`);
    process.exit(1);
  }
  fs.renameSync(fromPath, toPath);
  console.log(`${from} -> ${to}`);
}

const sourceFiles = [
  ...walkSourceFiles(path.join(ROOT, 'RadienceffAncienttalesSrc')),
  path.join(ROOT, 'App.tsx'),
  path.join(ROOT, 'scripts', 'fix-elements-imports.mjs'),
].filter(f => fs.existsSync(f));

let updated = 0;
for (const file of sourceFiles) {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  for (const [from, to] of Object.entries(RENAME_MAP)) {
    content = content.split(`elements/images/${from}`).join(`elements/images/${to}`);
  }
  if (content !== original) {
    fs.writeFileSync(file, content);
    updated += 1;
  }
}

console.log(`Updated ${updated} source files.`);
