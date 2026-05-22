import type {ImageSourcePropType} from 'react-native';

import type {
  RavenQuestRegion,
  RavenQuestStory,
  RavenQuestStoryBranch,
} from '../../src/shared/types';

const ravenQuestStoryImages: Record<string, ImageSourcePropType> = {
  'greece-delphi': require('../../assets/imgs/stories/greeceDelphi.png'),
  'egypt-falcon': require('../../assets/imgs/stories/egyptFalcon.png'),
  'india-moon-river': require('../../assets/imgs/stories/indiaMoonRiver.png'),
  'aztecs-red-sky': require('../../assets/imgs/stories/aztecsRedSky.png'),
  'greece-shipwreck': require('../../assets/imgs/stories/greeceShipwreck.png'),
  'egypt-obsidian-gate': require('../../assets/imgs/stories/egyptObsidianGate.png'),
  'india-tiger-temple': require('../../assets/imgs/stories/indiaTigerTemple.png'),
  'aztecs-underground-city': require('../../assets/imgs/stories/aztecsUndergroundCity.png'),
  'greece-silver-harp': require('../../assets/imgs/stories/greeceSilverHarp.png'),
  'egypt-moon-tomb': require('../../assets/imgs/stories/egyptMoonTomb.png'),
  'india-emerald-palace': require('../../assets/imgs/stories/indiaEmeraldPalace.png'),
  'aztecs-golden-eclipse': require('../../assets/imgs/stories/aztecsGoldenEclipse.png'),
};

const ravenQuestMakeStory = (
  meta: {
    ravenQuestId: string;
    ravenQuestRegion: RavenQuestRegion;
    ravenQuestTitle: string;
    ravenQuestDescription: string;
    ravenQuestIntro: string;
  },
  ravenQuestChoice1A: string,
  ravenQuestChoice1B: string,
  ravenQuestBranchA: RavenQuestStoryBranch,
  ravenQuestBranchB: RavenQuestStoryBranch,
): Omit<RavenQuestStory, 'ravenQuestImage'> => ({
  ...meta,
  ravenQuestNodes: {
    start: {
      ravenQuestQuestion: 'What will you do?',
      ravenQuestChoices: [
        {
          ravenQuestLabel: ravenQuestChoice1A,
          ravenQuestNext: 'a',
        },
        {
          ravenQuestLabel: ravenQuestChoice1B,
          ravenQuestNext: 'b',
        },
      ],
    },
    a: {
      ravenQuestAddText:
        ravenQuestBranchA.ravenQuestBridge,
      ravenQuestQuestion: 'What will you do?',
      ravenQuestChoices: [
        {
          ravenQuestLabel:
            ravenQuestBranchA.ravenQuestChoice2A,
          ravenQuestNext: 'a-end1',
        },
        {
          ravenQuestLabel:
            ravenQuestBranchA.ravenQuestChoice2B,
          ravenQuestNext: 'a-end2',
        },
      ],
    },
    'a-end1': {
      ravenQuestAddText:
        ravenQuestBranchA.ravenQuestEndingA,
      ravenQuestEnding: true,
    },
    'a-end2': {
      ravenQuestAddText:
        ravenQuestBranchA.ravenQuestEndingB,
      ravenQuestEnding: true,
    },
    b: {
      ravenQuestAddText:
        ravenQuestBranchB.ravenQuestBridge,
      ravenQuestQuestion: 'What will you do?',
      ravenQuestChoices: [
        {
          ravenQuestLabel:
            ravenQuestBranchB.ravenQuestChoice2A,
          ravenQuestNext: 'b-end1',
        },
        {
          ravenQuestLabel:
            ravenQuestBranchB.ravenQuestChoice2B,
          ravenQuestNext: 'b-end2',
        },
      ],
    },
    'b-end1': {
      ravenQuestAddText:
        ravenQuestBranchB.ravenQuestEndingA,
      ravenQuestEnding: true,
    },
    'b-end2': {
      ravenQuestAddText:
        ravenQuestBranchB.ravenQuestEndingB,
      ravenQuestEnding: true,
    },
  },
});

const ravenQuestStoriesBase: Omit<
  RavenQuestStory,
  'ravenQuestImage'
>[] = [
  ravenQuestMakeStory(
    {
      ravenQuestId: 'greece-delphi',
      ravenQuestRegion: 'Greece',
      ravenQuestTitle: 'The Temple Beneath Delphi',
      ravenQuestDescription:
        'Discover a collapsed staircase beneath Delphi and uncover what awakens below the mountain.',
      ravenQuestIntro:
        'During a violent storm near Delphi, the explorer discovers a collapsed staircase buried beneath the ruins of an abandoned temple. Rainwater flows through cracked marble pillars while faded symbols shimmer strangely under the torchlight. Deep below the mountain, a metallic echo repeats through the darkness as if something ancient has awakened.',
    },
    'Follow the metallic sound deeper underground',
    'Examine the glowing wall symbols first',
    {
      ravenQuestChoice1: '',
      ravenQuestBridge:
        'The tunnel becomes narrower and colder as the explorer descends deeper into the ruins. At the end of the corridor stands a massive bronze mechanism shaped like a coiled serpent wrapped around a sealed stone gate. Fresh footprints in the dust suggest someone else entered recently.',
      ravenQuestChoice2A: 'Activate the serpent mechanism',
      ravenQuestChoice2B: 'Follow the mysterious footprints',
      ravenQuestEndingA:
        'The serpent mechanism slowly unlocks the buried chamber behind the gate. Inside rests a golden laurel crown once worn by a forgotten oracle, surrounded by ancient ceremonial treasures and untouched scrolls.',
      ravenQuestEndingB:
        'The footprints lead to another treasure hunter trapped inside the ruins. Together, they uncover a sealed archive buried beneath Delphi before escaping the collapsing tunnels.',
    },
    {
      ravenQuestChoice1: '',
      ravenQuestBridge:
        'The glowing markings describe an ancient warning about “the voice beneath the mountain.” As the explorer studies the symbols more carefully, part of the wall shifts aside and reveals a buried staircase descending into darkness.',
      ravenQuestChoice2A: 'Descend the buried staircase',
      ravenQuestChoice2B: 'Ignore the warning and continue forward',
      ravenQuestEndingA:
        'The staircase leads to a forgotten underground library filled with sealed scrolls, maps, and celestial charts untouched for centuries beneath the mountain.',
      ravenQuestEndingB:
        'Ignoring the warning triggers an ancient floor trap. The explorer barely escapes the collapsing chamber but manages to recover a strange bronze key covered in mysterious symbols.',
    },
  ),
  ravenQuestMakeStory(
    {
      ravenQuestId: 'egypt-falcon',
      ravenQuestRegion: 'Egypt',
      ravenQuestTitle: 'The Chamber of the Sun Falcon',
      ravenQuestDescription:
        'Uncover a buried chamber near the Valley of the Kings where falcon statues guard solar mysteries.',
      ravenQuestIntro:
        'Near the Valley of the Kings, the explorer uncovers a buried chamber buried beneath drifting desert sands. Giant falcon statues covered in golden dust stand silently beside black stone walls carved with solar markings. A single beam of sunlight passes through the ceiling and illuminates an ancient altar at the center of the room.',
    },
    'Touch the black stone altar',
    'Search the surrounding chamber walls',
    {
      ravenQuestChoice1: '',
      ravenQuestBridge:
        'The chamber begins trembling softly as buried gears move somewhere behind the walls. Slowly, sealed doors open between the giant falcon statues, revealing a passage descending deeper underground.',
      ravenQuestChoice2A: 'Enter the newly opened passage',
      ravenQuestChoice2B: 'Stay and study the altar symbols',
      ravenQuestEndingA:
        'The underground passage reveals a lost royal burial chamber filled with crystal jars, ceremonial jewelry, and treasures untouched for generations.',
      ravenQuestEndingB:
        'The symbols on the altar form an ancient solar calendar predicting rare celestial events once used by Egyptian priests and astronomers.',
    },
    {
      ravenQuestChoice1: '',
      ravenQuestBridge:
        'Behind layers of dust, the explorer discovers painted maps showing buried tunnels beneath the desert dunes. The drawings seem to point toward an underground route connecting several forgotten tombs.',
      ravenQuestChoice2A: 'Follow the underground route',
      ravenQuestChoice2B: 'Take one of the golden relics first',
      ravenQuestEndingA:
        'The underground tunnels lead to a buried library buried beneath the sands, containing preserved scrolls and astronomical records.',
      ravenQuestEndingB:
        'Removing the relic activates ancient defense mechanisms. The explorer escapes through collapsing corridors while giant stone doors crash shut behind them.',
    },
  ),
  ravenQuestMakeStory(
    {
      ravenQuestId: 'india-moon-river',
      ravenQuestRegion: 'India',
      ravenQuestTitle: 'The Palace of the Moon River',
      ravenQuestDescription:
        'Explore an abandoned riverside palace where lanterns glow and blue lights drift on the water.',
      ravenQuestIntro:
        'Deep inside the jungle, the explorer discovers an abandoned riverside palace illuminated by silver moonlight. Soft music echoes through the trees while old lanterns suddenly begin glowing along the stone pathways. Beside the palace gates, a calm river reflects thousands of floating blue lights.',
    },
    'Enter the palace courtyard',
    'Follow the glowing riverbank',
    {
      ravenQuestChoice1: '',
      ravenQuestBridge:
        'Inside the palace stands a massive mirror decorated with sapphire patterns and ancient carvings. The surface reflects the room strangely, almost as if another buried chamber exists beyond the glass.',
      ravenQuestChoice2A: 'Touch the mirror',
      ravenQuestChoice2B: 'Read the carved writings carefully',
      ravenQuestEndingA:
        'The mirror slowly reveals a buried ceremonial chamber containing royal masks, silver instruments, and forgotten treasures from the river kingdom.',
      ravenQuestEndingB:
        'The writings uncover the story of a queen who protected the sacred river and disappeared during a legendary lunar eclipse.',
    },
    {
      ravenQuestChoice1: '',
      ravenQuestBridge:
        'The explorer discovers buried wooden boats tied beneath hanging gardens filled with glowing blue flowers. Fireflies drift through the air while waterfalls echo somewhere deeper within the jungle.',
      ravenQuestChoice2A: 'Take a boat downstream',
      ravenQuestChoice2B: 'Explore the hanging gardens first',
      ravenQuestEndingA:
        'The river leads toward a submerged temple buried behind giant waterfalls, where ancient statues rise from the water beneath the moonlight.',
      ravenQuestEndingB:
        'Inside the gardens, the explorer discovers rare glowing flowers once used in royal ceremonies and sacred rituals.',
    },
  ),
  ravenQuestMakeStory(
    {
      ravenQuestId: 'aztecs-red-sky',
      ravenQuestRegion: 'Aztecs',
      ravenQuestTitle: 'The Pyramid of the Red Sky',
      ravenQuestDescription:
        'Climb an Aztec pyramid as the sky turns crimson and ancient drums echo through the ruins.',
      ravenQuestIntro:
        'As sunset covers the jungle, the explorer climbs an enormous Aztec pyramid rising above the trees. Suddenly, the sky turns deep crimson while distant drums echo across the ancient city ruins. Without warning, part of the stone staircase begins shifting slowly beneath the explorer’s feet.',
    },
    'Continue climbing toward the summit',
    'Enter a side chamber below the pyramid',
    {
      ravenQuestChoice1: '',
      ravenQuestBridge:
        'At the summit of the pyramid stands a giant calendar stone glowing with fiery symbols. Warm wind circles the peak while the symbols pulse brighter as darkness approaches.',
      ravenQuestChoice2A: 'Rotate the calendar stone',
      ravenQuestChoice2B: 'Study the glowing symbols first',
      ravenQuestEndingA:
        'Rotating the stone opens a buried observatory above the clouds, revealing ancient instruments used to study the stars.',
      ravenQuestEndingB:
        'The glowing symbols reveal a forgotten prophecy describing a celestial event feared by the ancient priests.',
    },
    {
      ravenQuestChoice1: '',
      ravenQuestBridge:
        'The underground chamber walls are covered with paintings of warriors carrying crystal masks through burning cities. Strange echoes travel through buried tunnels beneath the pyramid.',
      ravenQuestChoice2A: 'Take one of the crystal masks',
      ravenQuestChoice2B: 'Search behind the painted walls',
      ravenQuestEndingA:
        'A buried tunnel behind the paintings leads toward underground chambers buried beneath the ancient city.',
      ravenQuestEndingB:
        'The crystal mask unlocks access to a ceremonial hall guarded by enormous stone statues covered in gold markings.',
    },
  ),
  ravenQuestMakeStory(
    {
      ravenQuestId: 'greece-shipwreck',
      ravenQuestRegion: 'Greece',
      ravenQuestTitle: 'The Shipwreck of Poseidon',
      ravenQuestDescription:
        'Find an ancient shipwreck inside a sea cave after a violent storm near a rocky Greek island.',
      ravenQuestIntro:
        'After a violent storm near a rocky Greek island, the explorer discovers an ancient shipwreck buried inside a sea cave. Blue reflections shimmer across the cave walls while broken marble statues lie partially submerged beneath the water. Waves crash loudly outside as cold sea air fills the darkness.',
    },
    'Explore the captain’s cabin',
    'Dive deeper into the flooded ruins',
    {
      ravenQuestChoice1: '',
      ravenQuestBridge:
        'Inside the ruined cabin rests an old navigation map marked with symbols of Poseidon and buried sea routes. Beside it stands a locked silver chest covered in salt and coral.',
      ravenQuestChoice2A: 'Open the silver chest',
      ravenQuestChoice2B: 'Follow the map directions instead',
      ravenQuestEndingA:
        'Inside the chest lies a ceremonial trident decorated with glowing blue gems once carried by ancient sea priests.',
      ravenQuestEndingB:
        'The map leads to a forgotten harbor buried between cliffs where ancient travelers once worshipped Poseidon.',
    },
    {
      ravenQuestChoice1: '',
      ravenQuestBridge:
        'Beneath the water, the explorer discovers underwater ruins illuminated by strange glowing fish swimming through broken columns. Ancient carvings cover the submerged walls deep inside the cave.',
      ravenQuestChoice2A: 'Swim toward the glowing ruins',
      ravenQuestChoice2B: 'Return later with equipment',
      ravenQuestEndingA:
        'The underwater ruins reveal a buried shrine dedicated to sailors lost at sea centuries ago.',
      ravenQuestEndingB:
        'Returning during moonlight reveals ancient symbols visible only when the tides rise beneath the cave entrance.',
    },
  ),
  ravenQuestMakeStory(
    {
      ravenQuestId: 'egypt-obsidian-gate',
      ravenQuestRegion: 'Egypt',
      ravenQuestTitle: 'The Obsidian Gate',
      ravenQuestDescription:
        'Face a gigantic black gate buried in the desert where whispers ride the warm wind.',
      ravenQuestIntro:
        'Far beyond the pyramids, the explorer discovers a gigantic black gate buried halfway beneath the desert sands. The surface reflects sunlight like dark glass while warm wind carries strange whispers through the abandoned ruins nearby. Ancient torches surround the entrance even though no one has visited the place for centuries.',
    },
    'Push the obsidian gate open',
    'Search the nearby ruins first',
    {
      ravenQuestChoice1: '',
      ravenQuestBridge:
        'The heavy gate slowly moves aside, revealing a staircase descending into darkness beneath the desert. As the explorer walks downward, blue torches suddenly ignite along the underground walls.',
      ravenQuestChoice2A: 'Continue deeper underground',
      ravenQuestChoice2B: 'Study the glowing torch symbols',
      ravenQuestEndingA:
        'The underground halls contain enormous statues of forgotten desert kings surrounded by buried ceremonial chambers.',
      ravenQuestEndingB:
        'The torch symbols reveal an ancient map leading toward oasis temples buried beneath the sands.',
    },
    {
      ravenQuestChoice1: '',
      ravenQuestBridge:
        'Scattered among the ruins, the explorer discovers broken obsidian tablets describing a legendary “city beneath the desert.” Strange markings suggest the city may still exist underground.',
      ravenQuestChoice2A: 'Reassemble the obsidian tablets',
      ravenQuestChoice2B: 'Ignore them and enter the gate immediately',
      ravenQuestEndingA:
        'Reassembling the tablets reveals the location of a massive underground palace buried beneath the dunes.',
      ravenQuestEndingB:
        'Entering the gate too quickly activates ancient sand traps, forcing the explorer to escape collapsing corridors deep underground.',
    },
  ),
  ravenQuestMakeStory(
    {
      ravenQuestId: 'india-tiger-temple',
      ravenQuestRegion: 'India',
      ravenQuestTitle: 'The Tiger Temple of Jaipur',
      ravenQuestDescription:
        'Find an abandoned temple behind giant stone tiger statues near the deserts of Jaipur.',
      ravenQuestIntro:
        'While traveling through the deserts near Jaipur, the explorer discovers an abandoned temple buried behind giant stone tiger statues. Warm wind carries the scent of incense through the empty halls while orange lanterns flicker softly inside the ruins. Strange claw marks carved into the floor seem to lead deeper underground.',
    },
    'Follow the claw marks into the temple',
    'Climb the upper balcony overlooking the ruins',
    {
      ravenQuestChoice1: '',
      ravenQuestBridge:
        'The underground corridors are lined with golden tiger carvings and faded royal banners. Deep inside the chamber, the explorer discovers a circular room with a massive stone throne surrounded by burning candles.',
      ravenQuestChoice2A: 'Sit on the stone throne',
      ravenQuestChoice2B: 'Examine the candles and symbols first',
      ravenQuestEndingA:
        'The throne activates a buried mechanism that opens a sealed treasury filled with ancient jewels and ceremonial weapons.',
      ravenQuestEndingB:
        'The symbols reveal the story of a legendary tiger guardian believed to protect the kingdom during war.',
    },
    {
      ravenQuestChoice1: '',
      ravenQuestBridge:
        'From above, the explorer notices buried ropes connected to giant bells hanging over the courtyard. Beyond the balcony, moonlight reveals another sealed section of the temple.',
      ravenQuestChoice2A: 'Ring the ancient bells',
      ravenQuestChoice2B: 'Enter the sealed section quietly',
      ravenQuestEndingA:
        'The bells trigger buried doors throughout the temple, revealing forgotten royal chambers.',
      ravenQuestEndingB:
        'Inside the sealed wing, the explorer discovers murals describing an ancient tiger festival lost to history.',
    },
  ),
  ravenQuestMakeStory(
    {
      ravenQuestId: 'aztecs-underground-city',
      ravenQuestRegion: 'Aztecs',
      ravenQuestTitle: 'The City Beneath the Jungle',
      ravenQuestDescription:
        'Descend into a forgotten city revealed when the jungle floor collapses beneath ancient ruins.',
      ravenQuestIntro:
        'Deep within the jungle, the explorer discovers stone ruins completely covered by vines and giant trees. As thunder rolls above the forest, part of the ground collapses and reveals a staircase descending into darkness beneath the ancient city.',
    },
    'Descend into the underground city',
    'Explore the surface ruins first',
    {
      ravenQuestChoice1: '',
      ravenQuestBridge:
        'The buried city contains massive halls illuminated by glowing crystals embedded in the walls. Ancient murals depict priests carrying golden discs beneath a blood-red moon.',
      ravenQuestChoice2A: 'Follow the glowing crystal corridor',
      ravenQuestChoice2B: 'Study the murals carefully',
      ravenQuestEndingA:
        'The crystal corridor leads to a buried chamber containing a giant golden sun disc once used in sacred ceremonies.',
      ravenQuestEndingB:
        'The murals reveal the location of a forgotten ceremonial arena buried beneath the jungle.',
    },
    {
      ravenQuestChoice1: '',
      ravenQuestBridge:
        'Among the broken temples, the explorer discovers abandoned market streets filled with shattered pottery and stone statues. A faint drumbeat echoes somewhere deeper in the jungle.',
      ravenQuestChoice2A: 'Follow the mysterious drum sounds',
      ravenQuestChoice2B: 'Search inside the largest temple nearby',
      ravenQuestEndingA:
        'The drum sounds lead to an underground gathering hall buried beneath the forest floor.',
      ravenQuestEndingB:
        'Inside the temple rests a giant obsidian throne decorated with symbols of ancient rulers.',
    },
  ),
  ravenQuestMakeStory(
    {
      ravenQuestId: 'greece-silver-harp',
      ravenQuestRegion: 'Greece',
      ravenQuestTitle: 'The Cave of the Silver Harp',
      ravenQuestDescription:
        'Follow music echoing from sea cliffs to a cave where silver light dances on underground pools.',
      ravenQuestIntro:
        'While sailing near a remote Greek island, the explorer hears music echoing from sea cliffs during the night. Following the sound leads to a buried cave where silver reflections shimmer across underground water pools.',
    },
    'Follow the music deeper into the cave',
    'Explore the underground lake first',
    {
      ravenQuestChoice1: '',
      ravenQuestBridge:
        'Inside the cave stands an ancient silver harp resting beside broken marble columns. The air vibrates softly every time the explorer approaches the instrument.',
      ravenQuestChoice2A: 'Play the silver harp',
      ravenQuestChoice2B: 'Inspect the nearby ruins first',
      ravenQuestEndingA:
        'Playing the harp reveals a buried passage leading toward a sealed temple beneath the island cliffs.',
      ravenQuestEndingB:
        'The nearby ruins contain scroll fragments describing musicians who once performed for ancient kings.',
    },
    {
      ravenQuestChoice1: '',
      ravenQuestBridge:
        'The underground lake glows faintly blue beneath the cave ceiling. Half-submerged statues stand silently in the water beside a narrow stone bridge.',
      ravenQuestChoice2A: 'Cross the stone bridge',
      ravenQuestChoice2B: 'Dive beneath the water surface',
      ravenQuestEndingA:
        'Across the bridge lies a buried chamber filled with silver ceremonial masks and musical instruments.',
      ravenQuestEndingB:
        'Beneath the water, the explorer discovers underwater carvings telling the story of a forgotten sea festival.',
    },
  ),
  ravenQuestMakeStory(
    {
      ravenQuestId: 'egypt-moon-tomb',
      ravenQuestRegion: 'Egypt',
      ravenQuestTitle: 'The Moon Tomb of Alexandria',
      ravenQuestDescription:
        'Enter a tomb near Alexandria revealed only when the full moon lights the stone walls.',
      ravenQuestIntro:
        'Near the ancient ruins of Alexandria, the explorer discovers a buried tomb entrance revealed only during a full moon. Pale silver light reflects across the stone walls while cold air rises from beneath the underground staircase.',
    },
    'Enter the moonlit tomb immediately',
    'Search the outer ruins first',
    {
      ravenQuestChoice1: '',
      ravenQuestBridge:
        'The underground chambers are covered in silver-painted stars and moon symbols unlike traditional Egyptian tombs. In the center of the room stands a giant circular mirror framed with black stone.',
      ravenQuestChoice2A: 'Touch the mirror surface',
      ravenQuestChoice2B: 'Search behind the mirror',
      ravenQuestEndingA:
        'The mirror reveals a buried observatory used by ancient astronomers to study eclipses and constellations.',
      ravenQuestEndingB:
        'Behind the mirror lies a sealed chamber containing lunar maps and crystal navigation tools.',
    },
    {
      ravenQuestChoice1: '',
      ravenQuestBridge:
        'Among the collapsed columns, the explorer discovers broken statues carrying moon-shaped necklaces and ancient scroll cases.',
      ravenQuestChoice2A: 'Open the scroll cases',
      ravenQuestChoice2B:
        'Follow a buried corridor beneath the ruins',
      ravenQuestEndingA:
        'The scrolls describe a forgotten society that studied the stars beneath Alexandria centuries ago.',
      ravenQuestEndingB:
        'The buried corridor leads toward underground docks once connected to the ancient harbor.',
    },
  ),
  ravenQuestMakeStory(
    {
      ravenQuestId: 'india-emerald-palace',
      ravenQuestRegion: 'India',
      ravenQuestTitle: 'The Emerald Elephant Palace',
      ravenQuestDescription:
        'Discover an abandoned palace of emerald elephant statues deep inside tropical forests.',
      ravenQuestIntro:
        'Buried deep inside tropical forests, the explorer discovers an abandoned palace decorated with giant emerald elephant statues. Rain falls softly through broken rooftops while green reflections shimmer across flooded marble floors.',
    },
    'Enter the royal throne hall',
    'Explore the flooded lower chambers',
    {
      ravenQuestChoice1: '',
      ravenQuestBridge:
        'At the center of the hall stands a golden throne surrounded by hanging lanterns and giant silk banners. Behind the throne, a massive carved elephant door remains tightly sealed.',
      ravenQuestChoice2A: 'Attempt to open the elephant door',
      ravenQuestChoice2B: 'Examine the silk banners first',
      ravenQuestEndingA:
        'The elephant door opens into a buried treasury filled with ceremonial crowns and emerald carvings.',
      ravenQuestEndingB:
        'The banners reveal the forgotten story of a royal expedition lost in the jungle centuries ago.',
    },
    {
      ravenQuestChoice1: '',
      ravenQuestBridge:
        'The flooded corridors contain floating candles and ancient stone bridges partially submerged beneath dark water. Soft chanting echoes from somewhere below the palace.',
      ravenQuestChoice2A: 'Follow the chanting sounds',
      ravenQuestChoice2B: 'Search the flooded rooms carefully',
      ravenQuestEndingA:
        'The chanting leads toward a buried underground sanctuary illuminated by glowing green crystals.',
      ravenQuestEndingB:
        'Inside the flooded chambers, the explorer discovers ceremonial boats once used during royal festivals.',
    },
  ),
  ravenQuestMakeStory(
    {
      ravenQuestId: 'aztecs-golden-eclipse',
      ravenQuestRegion: 'Aztecs',
      ravenQuestTitle: 'The Temple of the Golden Eclipse',
      ravenQuestDescription:
        'Reach a mountain temple as a rare solar eclipse makes golden symbols glow in the darkened sky.',
      ravenQuestIntro:
        'During a rare solar eclipse, the explorer arrives at a forgotten Aztec temple buried high within the mountains. Shadows move strangely across the stone walls while giant golden symbols begin glowing beneath the darkened sky.',
    },
    'Climb toward the eclipse altar',
    'Enter the underground temple tunnels',
    {
      ravenQuestChoice1: '',
      ravenQuestBridge:
        'At the summit stands a massive golden disc reflecting the eclipse above the mountains. Ancient wind whistles through the ruins while buried mechanisms begin moving beneath the stone floor.',
      ravenQuestChoice2A: 'Rotate the golden disc',
      ravenQuestChoice2B: 'Study the surrounding carvings first',
      ravenQuestEndingA:
        'Rotating the disc reveals a buried observatory chamber filled with celestial maps and crystal instruments.',
      ravenQuestEndingB:
        'The carvings uncover an ancient prophecy connected to the return of a legendary ruler.',
    },
    {
      ravenQuestChoice1: '',
      ravenQuestBridge:
        'The underground tunnels contain glowing torches and giant warrior statues covered in obsidian armor. Strange echoes travel through the darkness beneath the mountain temple.',
      ravenQuestChoice2A: 'Follow the echoing sounds',
      ravenQuestChoice2B: 'Search behind the warrior statues',
      ravenQuestEndingA:
        'The echoes lead toward a ceremonial chamber where ancient priests once observed eclipses in silence.',
      ravenQuestEndingB:
        'Behind the statues, the explorer discovers buried passages leading toward treasure rooms beneath the mountain.',
    },
  ),
];

export const ravenQuestStories: RavenQuestStory[] =
  ravenQuestStoriesBase.map(ravenQuestStory => ({
    ...ravenQuestStory,
    ravenQuestImage:
      ravenQuestStoryImages[ravenQuestStory.ravenQuestId],
  }));

export const ravenQuestRegionOrder: RavenQuestRegion[] = [
  'Greece',
  'Egypt',
  'India',
  'Aztecs',
];

export const ravenQuestGetStoryById = (
  ravenQuestId: string,
) =>
  ravenQuestStories.find(
    s => s.ravenQuestId === ravenQuestId,
  );

export const ravenQuestStoriesByRegion =
  ravenQuestRegionOrder.map(ravenQuestRegion => ({
    ravenQuestRegion,
    ravenQuestItems: ravenQuestStories.filter(
      s => s.ravenQuestRegion === ravenQuestRegion,
    ),
  }));
