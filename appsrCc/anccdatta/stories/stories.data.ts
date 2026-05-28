import type {ImageSourcePropType} from 'react-native';

import type {MythLocale, ChronicleEntry, BranchScript} from '../../annccTyppes';

const chronicleVisuals: Record<string, ImageSourcePropType> = {
  'greece-delphi': require('../../../elements/images/stories/greeceDelphi.png'),
  'egypt-falcon': require('../../../elements/images/stories/egyptFalcon.png'),
  'india-moon-river': require('../../../elements/images/stories/indiaMoonRiver.png'),
  'aztecs-red-sky': require('../../../elements/images/stories/aztecsRedSky.png'),
  'greece-shipwreck': require('../../../elements/images/stories/greeceShipwreck.png'),
  'egypt-obsidian-gate': require('../../../elements/images/stories/egyptObsidianGate.png'),
  'india-tiger-temple': require('../../../elements/images/stories/indiaTigerTemple.png'),
  'aztecs-underground-city': require('../../../elements/images/stories/aztecsUndergroundCity.png'),
  'greece-silver-harp': require('../../../elements/images/stories/greeceSilverHarp.png'),
  'egypt-moon-tomb': require('../../../elements/images/stories/egyptMoonTomb.png'),
  'india-emerald-palace': require('../../../elements/images/stories/indiaEmeraldPalace.png'),
  'aztecs-golden-eclipse': require('../../../elements/images/stories/aztecsGoldenEclipse.png'),
};

const assembleChronicle = (
  meta: {
    entryKey: string;
    localeTag: MythLocale;
    headline: string;
    synopsis: string;
    openingPassage: string;
  },
  forkCaptionA: string,
  forkCaptionB: string,
  branchScriptA: BranchScript,
  branchScriptB: BranchScript,
): Omit<ChronicleEntry, 'coverVisual'> => ({
  ...meta,
  passageMap: {
    start: {
      promptStem: 'What will you do?',
      branchOptions: [
        {
          optionCaption: forkCaptionA,
          onwardKey: 'a',
        },
        {
          optionCaption: forkCaptionB,
          onwardKey: 'b',
        },
      ],
    },
    a: {
      insertedPassage: branchScriptA.interludePassage,
      promptStem: 'What will you do?',
      branchOptions: [
        {
          optionCaption: branchScriptA.secondForkA,
          onwardKey: 'a-end1',
        },
        {
          optionCaption: branchScriptA.secondForkB,
          onwardKey: 'a-end2',
        },
      ],
    },
    'a-end1': {
      insertedPassage: branchScriptA.finalePassageA,
      closesPassage: true,
    },
    'a-end2': {
      insertedPassage: branchScriptA.finalePassageB,
      closesPassage: true,
    },
    b: {
      insertedPassage: branchScriptB.interludePassage,
      promptStem: 'What will you do?',
      branchOptions: [
        {
          optionCaption: branchScriptB.secondForkA,
          onwardKey: 'b-end1',
        },
        {
          optionCaption: branchScriptB.secondForkB,
          onwardKey: 'b-end2',
        },
      ],
    },
    'b-end1': {
      insertedPassage: branchScriptB.finalePassageA,
      closesPassage: true,
    },
    'b-end2': {
      insertedPassage: branchScriptB.finalePassageB,
      closesPassage: true,
    },
  },
});

const chronicleDrafts: Omit<ChronicleEntry, 'coverVisual'>[] = [
  assembleChronicle(
    {
      entryKey: 'greece-delphi',
      localeTag: 'Greece',
      headline: 'The Temple Beneath Delphi',
      synopsis:
        'Discover a collapsed staircase beneath Delphi and uncover what awakens below the mountain.',
      openingPassage:
        'During a violent storm near Delphi, the explorer discovers a collapsed staircase buried beneath the ruins of an abandoned temple. Rainwater flows through cracked marble pillars while faded symbols shimmer strangely under the torchlight. Deep below the mountain, a metallic echo repeats through the darkness as if something ancient has awakened.',
    },
    'Follow the metallic sound deeper underground',
    'Examine the glowing wall symbols first',
    {
      forkCaption: '',
      interludePassage:
        'The tunnel becomes narrower and colder as the explorer descends deeper into the ruins. At the end of the corridor stands a massive bronze mechanism shaped like a coiled serpent wrapped around a sealed stone gate. Fresh footprints in the dust suggest someone else entered recently.',
      secondForkA: 'Activate the serpent mechanism',
      secondForkB: 'Follow the mysterious footprints',
      finalePassageA:
        'The serpent mechanism slowly unlocks the buried chamber behind the gate. Inside rests a golden laurel crown once worn by a forgotten oracle, surrounded by ancient ceremonial treasures and untouched scrolls.',
      finalePassageB:
        'The footprints lead to another treasure hunter trapped inside the ruins. Together, they uncover a sealed archive buried beneath Delphi before escaping the collapsing tunnels.',
    },
    {
      forkCaption: '',
      interludePassage:
        'The glowing markings describe an ancient warning about “the voice beneath the mountain.” As the explorer studies the symbols more carefully, part of the wall shifts aside and reveals a buried staircase descending into darkness.',
      secondForkA: 'Descend the buried staircase',
      secondForkB: 'Ignore the warning and continue forward',
      finalePassageA:
        'The staircase leads to a forgotten underground library filled with sealed scrolls, maps, and celestial charts untouched for centuries beneath the mountain.',
      finalePassageB:
        'Ignoring the warning triggers an ancient floor trap. The explorer barely escapes the collapsing chamber but manages to recover a strange bronze key covered in mysterious symbols.',
    },
  ),
  assembleChronicle(
    {
      entryKey: 'egypt-falcon',
      localeTag: 'Egypt',
      headline: 'The Chamber of the Sun Falcon',
      synopsis:
        'Uncover a buried chamber near the Valley of the Kings where falcon statues guard solar mysteries.',
      openingPassage:
        'Near the Valley of the Kings, the explorer uncovers a buried chamber buried beneath drifting desert sands. Giant falcon statues covered in golden dust stand silently beside black stone walls carved with solar markings. A single beam of sunlight passes through the ceiling and illuminates an ancient altar at the center of the room.',
    },
    'Touch the black stone altar',
    'Search the surrounding chamber walls',
    {
      forkCaption: '',
      interludePassage:
        'The chamber begins trembling softly as buried gears move somewhere behind the walls. Slowly, sealed doors open between the giant falcon statues, revealing a passage descending deeper underground.',
      secondForkA: 'Enter the newly opened passage',
      secondForkB: 'Stay and study the altar symbols',
      finalePassageA:
        'The underground passage reveals a lost royal burial chamber filled with crystal jars, ceremonial jewelry, and treasures untouched for generations.',
      finalePassageB:
        'The symbols on the altar form an ancient solar calendar predicting rare celestial events once used by Egyptian priests and astronomers.',
    },
    {
      forkCaption: '',
      interludePassage:
        'Behind layers of dust, the explorer discovers painted maps showing buried tunnels beneath the desert dunes. The drawings seem to point toward an underground route connecting several forgotten tombs.',
      secondForkA: 'Follow the underground route',
      secondForkB: 'Take one of the golden relics first',
      finalePassageA:
        'The underground tunnels lead to a buried library buried beneath the sands, containing preserved scrolls and astronomical records.',
      finalePassageB:
        'Removing the relic activates ancient defense mechanisms. The explorer escapes through collapsing corridors while giant stone doors crash shut behind them.',
    },
  ),
  assembleChronicle(
    {
      entryKey: 'india-moon-river',
      localeTag: 'India',
      headline: 'The Palace of the Moon River',
      synopsis:
        'Explore an abandoned riverside palace where lanterns glow and blue lights drift on the water.',
      openingPassage:
        'Deep inside the jungle, the explorer discovers an abandoned riverside palace illuminated by silver moonlight. Soft music echoes through the trees while old lanterns suddenly begin glowing along the stone pathways. Beside the palace gates, a calm river reflects thousands of floating blue lights.',
    },
    'Enter the palace courtyard',
    'Follow the glowing riverbank',
    {
      forkCaption: '',
      interludePassage:
        'Inside the palace stands a massive mirror decorated with sapphire patterns and ancient carvings. The surface reflects the room strangely, almost as if another buried chamber exists beyond the glass.',
      secondForkA: 'Touch the mirror',
      secondForkB: 'Read the carved writings carefully',
      finalePassageA:
        'The mirror slowly reveals a buried ceremonial chamber containing royal masks, silver instruments, and forgotten treasures from the river kingdom.',
      finalePassageB:
        'The writings uncover the story of a queen who protected the sacred river and disappeared during a legendary lunar eclipse.',
    },
    {
      forkCaption: '',
      interludePassage:
        'The explorer discovers buried wooden boats tied beneath hanging gardens filled with glowing blue flowers. Fireflies drift through the air while waterfalls echo somewhere deeper within the jungle.',
      secondForkA: 'Take a boat downstream',
      secondForkB: 'Explore the hanging gardens first',
      finalePassageA:
        'The river leads toward a submerged temple buried behind giant waterfalls, where ancient statues rise from the water beneath the moonlight.',
      finalePassageB:
        'Inside the gardens, the explorer discovers rare glowing flowers once used in royal ceremonies and sacred rituals.',
    },
  ),
  assembleChronicle(
    {
      entryKey: 'aztecs-red-sky',
      localeTag: 'Aztecs',
      headline: 'The Pyramid of the Red Sky',
      synopsis:
        'Climb an Aztec pyramid as the sky turns crimson and ancient drums echo through the ruins.',
      openingPassage:
        'As sunset covers the jungle, the explorer climbs an enormous Aztec pyramid rising above the trees. Suddenly, the sky turns deep crimson while distant drums echo across the ancient city ruins. Without warning, part of the stone staircase begins shifting slowly beneath the explorer’s feet.',
    },
    'Continue climbing toward the summit',
    'Enter a side chamber below the pyramid',
    {
      forkCaption: '',
      interludePassage:
        'At the summit of the pyramid stands a giant calendar stone glowing with fiery symbols. Warm wind circles the peak while the symbols pulse brighter as darkness approaches.',
      secondForkA: 'Rotate the calendar stone',
      secondForkB: 'Study the glowing symbols first',
      finalePassageA:
        'Rotating the stone opens a buried observatory above the clouds, revealing ancient instruments used to study the stars.',
      finalePassageB:
        'The glowing symbols reveal a forgotten prophecy describing a celestial event feared by the ancient priests.',
    },
    {
      forkCaption: '',
      interludePassage:
        'The underground chamber walls are covered with paintings of warriors carrying crystal masks through burning cities. Strange echoes travel through buried tunnels beneath the pyramid.',
      secondForkA: 'Take one of the crystal masks',
      secondForkB: 'Search behind the painted walls',
      finalePassageA:
        'A buried tunnel behind the paintings leads toward underground chambers buried beneath the ancient city.',
      finalePassageB:
        'The crystal mask unlocks access to a ceremonial hall guarded by enormous stone statues covered in gold markings.',
    },
  ),
  assembleChronicle(
    {
      entryKey: 'greece-shipwreck',
      localeTag: 'Greece',
      headline: 'The Shipwreck of Poseidon',
      synopsis:
        'Find an ancient shipwreck inside a sea cave after a violent storm near a rocky Greek island.',
      openingPassage:
        'After a violent storm near a rocky Greek island, the explorer discovers an ancient shipwreck buried inside a sea cave. Blue reflections shimmer across the cave walls while broken marble statues lie partially submerged beneath the water. Waves crash loudly outside as cold sea air fills the darkness.',
    },
    'Explore the captain’s cabin',
    'Dive deeper into the flooded ruins',
    {
      forkCaption: '',
      interludePassage:
        'Inside the ruined cabin rests an old navigation map marked with symbols of Poseidon and buried sea routes. Beside it stands a locked silver chest covered in salt and coral.',
      secondForkA: 'Open the silver chest',
      secondForkB: 'Follow the map directions instead',
      finalePassageA:
        'Inside the chest lies a ceremonial trident decorated with glowing blue gems once carried by ancient sea priests.',
      finalePassageB:
        'The map leads to a forgotten harbor buried between cliffs where ancient travelers once worshipped Poseidon.',
    },
    {
      forkCaption: '',
      interludePassage:
        'Beneath the water, the explorer discovers underwater ruins illuminated by strange glowing fish swimming through broken columns. Ancient carvings cover the submerged walls deep inside the cave.',
      secondForkA: 'Swim toward the glowing ruins',
      secondForkB: 'Return later with equipment',
      finalePassageA:
        'The underwater ruins reveal a buried shrine dedicated to sailors lost at sea centuries ago.',
      finalePassageB:
        'Returning during moonlight reveals ancient symbols visible only when the tides rise beneath the cave entrance.',
    },
  ),
  assembleChronicle(
    {
      entryKey: 'egypt-obsidian-gate',
      localeTag: 'Egypt',
      headline: 'The Obsidian Gate',
      synopsis:
        'Face a gigantic black gate buried in the desert where whispers ride the warm wind.',
      openingPassage:
        'Far beyond the pyramids, the explorer discovers a gigantic black gate buried halfway beneath the desert sands. The surface reflects sunlight like dark glass while warm wind carries strange whispers through the abandoned ruins nearby. Ancient torches surround the entrance even though no one has visited the place for centuries.',
    },
    'Push the obsidian gate open',
    'Search the nearby ruins first',
    {
      forkCaption: '',
      interludePassage:
        'The heavy gate slowly moves aside, revealing a staircase descending into darkness beneath the desert. As the explorer walks downward, blue torches suddenly ignite along the underground walls.',
      secondForkA: 'Continue deeper underground',
      secondForkB: 'Study the glowing torch symbols',
      finalePassageA:
        'The underground halls contain enormous statues of forgotten desert kings surrounded by buried ceremonial chambers.',
      finalePassageB:
        'The torch symbols reveal an ancient map leading toward oasis temples buried beneath the sands.',
    },
    {
      forkCaption: '',
      interludePassage:
        'Scattered among the ruins, the explorer discovers broken obsidian tablets describing a legendary “city beneath the desert.” Strange markings suggest the city may still exist underground.',
      secondForkA: 'Reassemble the obsidian tablets',
      secondForkB: 'Ignore them and enter the gate immediately',
      finalePassageA:
        'Reassembling the tablets reveals the location of a massive underground palace buried beneath the dunes.',
      finalePassageB:
        'Entering the gate too quickly activates ancient sand traps, forcing the explorer to escape collapsing corridors deep underground.',
    },
  ),
  assembleChronicle(
    {
      entryKey: 'india-tiger-temple',
      localeTag: 'India',
      headline: 'The Tiger Temple of Jaipur',
      synopsis:
        'Find an abandoned temple behind giant stone tiger statues near the deserts of Jaipur.',
      openingPassage:
        'While traveling through the deserts near Jaipur, the explorer discovers an abandoned temple buried behind giant stone tiger statues. Warm wind carries the scent of incense through the empty halls while orange lanterns flicker softly inside the ruins. Strange claw marks carved into the floor seem to lead deeper underground.',
    },
    'Follow the claw marks into the temple',
    'Climb the upper balcony overlooking the ruins',
    {
      forkCaption: '',
      interludePassage:
        'The underground corridors are lined with golden tiger carvings and faded royal banners. Deep inside the chamber, the explorer discovers a circular room with a massive stone throne surrounded by burning candles.',
      secondForkA: 'Sit on the stone throne',
      secondForkB: 'Examine the candles and symbols first',
      finalePassageA:
        'The throne activates a buried mechanism that opens a sealed treasury filled with ancient jewels and ceremonial weapons.',
      finalePassageB:
        'The symbols reveal the story of a legendary tiger guardian believed to protect the kingdom during war.',
    },
    {
      forkCaption: '',
      interludePassage:
        'From above, the explorer notices buried ropes connected to giant bells hanging over the courtyard. Beyond the balcony, moonlight reveals another sealed section of the temple.',
      secondForkA: 'Ring the ancient bells',
      secondForkB: 'Enter the sealed section quietly',
      finalePassageA:
        'The bells trigger buried doors throughout the temple, revealing forgotten royal chambers.',
      finalePassageB:
        'Inside the sealed wing, the explorer discovers murals describing an ancient tiger festival lost to history.',
    },
  ),
  assembleChronicle(
    {
      entryKey: 'aztecs-underground-city',
      localeTag: 'Aztecs',
      headline: 'The City Beneath the Jungle',
      synopsis:
        'Descend into a forgotten city revealed when the jungle floor collapses beneath ancient ruins.',
      openingPassage:
        'Deep within the jungle, the explorer discovers stone ruins completely covered by vines and giant trees. As thunder rolls above the forest, part of the ground collapses and reveals a staircase descending into darkness beneath the ancient city.',
    },
    'Descend into the underground city',
    'Explore the surface ruins first',
    {
      forkCaption: '',
      interludePassage:
        'The buried city contains massive halls illuminated by glowing crystals embedded in the walls. Ancient murals depict priests carrying golden discs beneath a blood-red moon.',
      secondForkA: 'Follow the glowing crystal corridor',
      secondForkB: 'Study the murals carefully',
      finalePassageA:
        'The crystal corridor leads to a buried chamber containing a giant golden sun disc once used in sacred ceremonies.',
      finalePassageB:
        'The murals reveal the location of a forgotten ceremonial arena buried beneath the jungle.',
    },
    {
      forkCaption: '',
      interludePassage:
        'Among the broken temples, the explorer discovers abandoned market streets filled with shattered pottery and stone statues. A faint drumbeat echoes somewhere deeper in the jungle.',
      secondForkA: 'Follow the mysterious drum sounds',
      secondForkB: 'Search inside the largest temple nearby',
      finalePassageA:
        'The drum sounds lead to an underground gathering hall buried beneath the forest floor.',
      finalePassageB:
        'Inside the temple rests a giant obsidian throne decorated with symbols of ancient rulers.',
    },
  ),
  assembleChronicle(
    {
      entryKey: 'greece-silver-harp',
      localeTag: 'Greece',
      headline: 'The Cave of the Silver Harp',
      synopsis:
        'Follow music echoing from sea cliffs to a cave where silver light dances on underground pools.',
      openingPassage:
        'While sailing near a remote Greek island, the explorer hears music echoing from sea cliffs during the night. Following the sound leads to a buried cave where silver reflections shimmer across underground water pools.',
    },
    'Follow the music deeper into the cave',
    'Explore the underground lake first',
    {
      forkCaption: '',
      interludePassage:
        'Inside the cave stands an ancient silver harp resting beside broken marble columns. The air vibrates softly every time the explorer approaches the instrument.',
      secondForkA: 'Strum the silver harp',
      secondForkB: 'Inspect the nearby ruins first',
      finalePassageA:
        "The silver harp's melody reveals a buried passage leading toward a sealed temple beneath the island cliffs.",
      finalePassageB:
        'The nearby ruins contain scroll fragments describing musicians who once performed for ancient kings.',
    },
    {
      forkCaption: '',
      interludePassage:
        'The underground lake glows faintly blue beneath the cave ceiling. Half-submerged statues stand silently in the water beside a narrow stone bridge.',
      secondForkA: 'Cross the stone bridge',
      secondForkB: 'Dive beneath the water surface',
      finalePassageA:
        'Across the bridge lies a buried chamber filled with silver ceremonial masks and musical instruments.',
      finalePassageB:
        'Beneath the water, the explorer discovers underwater carvings telling the story of a forgotten sea festival.',
    },
  ),
  assembleChronicle(
    {
      entryKey: 'egypt-moon-tomb',
      localeTag: 'Egypt',
      headline: 'The Moon Tomb of Alexandria',
      synopsis:
        'Enter a tomb near Alexandria revealed only when the full moon lights the stone walls.',
      openingPassage:
        'Near the ancient ruins of Alexandria, the explorer discovers a buried tomb entrance revealed only during a full moon. Pale silver light reflects across the stone walls while cold air rises from beneath the underground staircase.',
    },
    'Enter the moonlit tomb immediately',
    'Search the outer ruins first',
    {
      forkCaption: '',
      interludePassage:
        'The underground chambers are covered in silver-painted stars and moon symbols unlike traditional Egyptian tombs. In the center of the room stands a giant circular mirror framed with black stone.',
      secondForkA: 'Touch the mirror surface',
      secondForkB: 'Search behind the mirror',
      finalePassageA:
        'The mirror reveals a buried observatory used by ancient astronomers to study eclipses and constellations.',
      finalePassageB:
        'Behind the mirror lies a sealed chamber containing lunar maps and crystal navigation tools.',
    },
    {
      forkCaption: '',
      interludePassage:
        'Among the collapsed columns, the explorer discovers broken statues carrying moon-shaped necklaces and ancient scroll cases.',
      secondForkA: 'Open the scroll cases',
      secondForkB: 'Follow a buried corridor beneath the ruins',
      finalePassageA:
        'The scrolls describe a forgotten society that studied the stars beneath Alexandria centuries ago.',
      finalePassageB:
        'The buried corridor leads toward underground docks once connected to the ancient harbor.',
    },
  ),
  assembleChronicle(
    {
      entryKey: 'india-emerald-palace',
      localeTag: 'India',
      headline: 'The Emerald Elephant Palace',
      synopsis:
        'Discover an abandoned palace of emerald elephant statues deep inside tropical forests.',
      openingPassage:
        'Buried deep inside tropical forests, the explorer discovers an abandoned palace decorated with giant emerald elephant statues. Rain falls softly through broken rooftops while green reflections shimmer across flooded marble floors.',
    },
    'Enter the royal throne hall',
    'Explore the flooded lower chambers',
    {
      forkCaption: '',
      interludePassage:
        'At the center of the hall stands a golden throne surrounded by hanging lanterns and giant silk banners. Behind the throne, a massive carved elephant door remains tightly sealed.',
      secondForkA: 'Attempt to open the elephant door',
      secondForkB: 'Examine the silk banners first',
      finalePassageA:
        'The elephant door opens into a buried treasury filled with ceremonial crowns and emerald carvings.',
      finalePassageB:
        'The banners reveal the forgotten story of a royal expedition lost in the jungle centuries ago.',
    },
    {
      forkCaption: '',
      interludePassage:
        'The flooded corridors contain floating candles and ancient stone bridges partially submerged beneath dark water. Soft chanting echoes from somewhere below the palace.',
      secondForkA: 'Follow the chanting sounds',
      secondForkB: 'Search the flooded rooms carefully',
      finalePassageA:
        'The chanting leads toward a buried underground sanctuary illuminated by glowing green crystals.',
      finalePassageB:
        'Inside the flooded chambers, the explorer discovers ceremonial boats once used during royal festivals.',
    },
  ),
  assembleChronicle(
    {
      entryKey: 'aztecs-golden-eclipse',
      localeTag: 'Aztecs',
      headline: 'The Temple of the Golden Eclipse',
      synopsis:
        'Reach a mountain temple as a rare solar eclipse makes golden symbols glow in the darkened sky.',
      openingPassage:
        'During a rare solar eclipse, the explorer arrives at a forgotten Aztec temple buried high within the mountains. Shadows move strangely across the stone walls while giant golden symbols begin glowing beneath the darkened sky.',
    },
    'Climb toward the eclipse altar',
    'Enter the underground temple tunnels',
    {
      forkCaption: '',
      interludePassage:
        'At the summit stands a massive golden disc reflecting the eclipse above the mountains. Ancient wind whistles through the ruins while buried mechanisms begin moving beneath the stone floor.',
      secondForkA: 'Rotate the golden disc',
      secondForkB: 'Study the surrounding carvings first',
      finalePassageA:
        'Rotating the disc reveals a buried observatory chamber filled with celestial maps and crystal instruments.',
      finalePassageB:
        'The carvings uncover an ancient prophecy connected to the return of a legendary ruler.',
    },
    {
      forkCaption: '',
      interludePassage:
        'The underground tunnels contain glowing torches and giant warrior statues covered in obsidian armor. Strange echoes travel through the darkness beneath the mountain temple.',
      secondForkA: 'Follow the echoing sounds',
      secondForkB: 'Search behind the warrior statues',
      finalePassageA:
        'The echoes lead toward a ceremonial chamber where ancient priests once observed eclipses in silence.',
      finalePassageB:
        'Behind the statues, the explorer discovers buried passages leading toward treasure rooms beneath the mountain.',
    },
  ),
];

export const chronicleCatalog: ChronicleEntry[] = chronicleDrafts.map(
  chronicle => ({
    ...chronicle,
    coverVisual: chronicleVisuals[chronicle.entryKey],
  }),
);

export const mythLocaleSequence: MythLocale[] = [
  'Greece',
  'Egypt',
  'India',
  'Aztecs',
];

export const resolveChronicle = (entryKey: string) =>
  chronicleCatalog.find(s => s.entryKey === entryKey);

export const chroniclesGroupedByLocale = mythLocaleSequence.map(localeTag => ({
  localeTag,
  groupedEntries: chronicleCatalog.filter(s => s.localeTag === localeTag),
}));
