import type {ImageSourcePropType} from 'react-native';

import type {
  LegendsaventurebkkRegion,
  LegendsaventurebkkStory,
  LegendsaventurebkkStoryBranch,
} from '../types';

const legendsaventurebkkStoryImages: Record<string, ImageSourcePropType> = {
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

const legendsaventurebkkMakeStory = (
  meta: {
    legendsaventurebkkId: string;
    legendsaventurebkkRegion: LegendsaventurebkkRegion;
    legendsaventurebkkTitle: string;
    legendsaventurebkkDescription: string;
    legendsaventurebkkIntro: string;
  },
  legendsaventurebkkChoice1A: string,
  legendsaventurebkkChoice1B: string,
  legendsaventurebkkBranchA: LegendsaventurebkkStoryBranch,
  legendsaventurebkkBranchB: LegendsaventurebkkStoryBranch,
): Omit<LegendsaventurebkkStory, 'legendsaventurebkkImage'> => ({
  ...meta,
  legendsaventurebkkNodes: {
    start: {
      legendsaventurebkkQuestion: 'What will you do?',
      legendsaventurebkkChoices: [
        {
          legendsaventurebkkLabel: legendsaventurebkkChoice1A,
          legendsaventurebkkNext: 'a',
        },
        {
          legendsaventurebkkLabel: legendsaventurebkkChoice1B,
          legendsaventurebkkNext: 'b',
        },
      ],
    },
    a: {
      legendsaventurebkkAddText:
        legendsaventurebkkBranchA.legendsaventurebkkBridge,
      legendsaventurebkkQuestion: 'What will you do?',
      legendsaventurebkkChoices: [
        {
          legendsaventurebkkLabel:
            legendsaventurebkkBranchA.legendsaventurebkkChoice2A,
          legendsaventurebkkNext: 'a-end1',
        },
        {
          legendsaventurebkkLabel:
            legendsaventurebkkBranchA.legendsaventurebkkChoice2B,
          legendsaventurebkkNext: 'a-end2',
        },
      ],
    },
    'a-end1': {
      legendsaventurebkkAddText:
        legendsaventurebkkBranchA.legendsaventurebkkEndingA,
      legendsaventurebkkEnding: true,
    },
    'a-end2': {
      legendsaventurebkkAddText:
        legendsaventurebkkBranchA.legendsaventurebkkEndingB,
      legendsaventurebkkEnding: true,
    },
    b: {
      legendsaventurebkkAddText:
        legendsaventurebkkBranchB.legendsaventurebkkBridge,
      legendsaventurebkkQuestion: 'What will you do?',
      legendsaventurebkkChoices: [
        {
          legendsaventurebkkLabel:
            legendsaventurebkkBranchB.legendsaventurebkkChoice2A,
          legendsaventurebkkNext: 'b-end1',
        },
        {
          legendsaventurebkkLabel:
            legendsaventurebkkBranchB.legendsaventurebkkChoice2B,
          legendsaventurebkkNext: 'b-end2',
        },
      ],
    },
    'b-end1': {
      legendsaventurebkkAddText:
        legendsaventurebkkBranchB.legendsaventurebkkEndingA,
      legendsaventurebkkEnding: true,
    },
    'b-end2': {
      legendsaventurebkkAddText:
        legendsaventurebkkBranchB.legendsaventurebkkEndingB,
      legendsaventurebkkEnding: true,
    },
  },
});

const legendsaventurebkkStoriesBase: Omit<
  LegendsaventurebkkStory,
  'legendsaventurebkkImage'
>[] = [
  legendsaventurebkkMakeStory(
    {
      legendsaventurebkkId: 'greece-delphi',
      legendsaventurebkkRegion: 'Greece',
      legendsaventurebkkTitle: 'The Temple Beneath Delphi',
      legendsaventurebkkDescription:
        'Discover a collapsed staircase beneath Delphi and uncover what awakens below the mountain.',
      legendsaventurebkkIntro:
        'During a violent storm near Delphi, the explorer discovers a collapsed staircase concealed beneath the ruins of an abandoned temple. Rainwater flows through cracked marble pillars while faded symbols shimmer strangely under the torchlight. Deep below the mountain, a metallic echo repeats through the darkness as if something ancient has awakened.',
    },
    'Follow the metallic sound deeper underground',
    'Examine the glowing wall symbols first',
    {
      legendsaventurebkkChoice1: '',
      legendsaventurebkkBridge:
        'The tunnel becomes narrower and colder as the explorer descends deeper into the ruins. At the end of the corridor stands a massive bronze mechanism shaped like a coiled serpent wrapped around a sealed stone gate. Fresh footprints in the dust suggest someone else entered recently.',
      legendsaventurebkkChoice2A: 'Activate the serpent mechanism',
      legendsaventurebkkChoice2B: 'Follow the mysterious footprints',
      legendsaventurebkkEndingA:
        'The serpent mechanism slowly unlocks the concealed chamber behind the gate. Inside rests a golden laurel crown once worn by a forgotten oracle, surrounded by ancient ceremonial treasures and untouched scrolls.',
      legendsaventurebkkEndingB:
        'The footprints lead to another treasure hunter trapped inside the ruins. Together, they uncover a secret archive concealed beneath Delphi before escaping the collapsing tunnels.',
    },
    {
      legendsaventurebkkChoice1: '',
      legendsaventurebkkBridge:
        'The glowing markings describe an ancient warning about “the voice beneath the mountain.” As the explorer studies the symbols more carefully, part of the wall shifts aside and reveals a concealed staircase descending into darkness.',
      legendsaventurebkkChoice2A: 'Descend the concealed staircase',
      legendsaventurebkkChoice2B: 'Ignore the warning and continue forward',
      legendsaventurebkkEndingA:
        'The staircase leads to a forgotten underground library filled with sealed scrolls, maps, and celestial charts untouched for centuries beneath the mountain.',
      legendsaventurebkkEndingB:
        'Ignoring the warning triggers an ancient floor trap. The explorer barely escapes the collapsing chamber but manages to recover a strange bronze key covered in mysterious symbols.',
    },
  ),
  legendsaventurebkkMakeStory(
    {
      legendsaventurebkkId: 'egypt-falcon',
      legendsaventurebkkRegion: 'Egypt',
      legendsaventurebkkTitle: 'The Chamber of the Sun Falcon',
      legendsaventurebkkDescription:
        'Uncover a buried chamber near the Valley of the Kings where falcon statues guard solar secrets.',
      legendsaventurebkkIntro:
        'Near the Valley of the Kings, the explorer uncovers a buried chamber concealed beneath drifting desert sands. Giant falcon statues covered in golden dust stand silently beside black stone walls carved with solar markings. A single beam of sunlight passes through the ceiling and illuminates an ancient altar at the center of the room.',
    },
    'Touch the black stone altar',
    'Search the surrounding chamber walls',
    {
      legendsaventurebkkChoice1: '',
      legendsaventurebkkBridge:
        'The chamber begins trembling softly as concealed gears move somewhere behind the walls. Slowly, secret doors open between the giant falcon statues, revealing a passage descending deeper underground.',
      legendsaventurebkkChoice2A: 'Enter the newly opened passage',
      legendsaventurebkkChoice2B: 'Stay and study the altar symbols',
      legendsaventurebkkEndingA:
        'The underground passage reveals a lost royal burial chamber filled with crystal jars, ceremonial jewelry, and treasures untouched for generations.',
      legendsaventurebkkEndingB:
        'The symbols on the altar form an ancient solar calendar predicting rare celestial events once used by Egyptian priests and astronomers.',
    },
    {
      legendsaventurebkkChoice1: '',
      legendsaventurebkkBridge:
        'Behind layers of dust, the explorer discovers painted maps showing concealed tunnels beneath the desert dunes. The drawings seem to point toward an underground route connecting several forgotten tombs.',
      legendsaventurebkkChoice2A: 'Follow the underground route',
      legendsaventurebkkChoice2B: 'Take one of the golden relics first',
      legendsaventurebkkEndingA:
        'The underground tunnels lead to a concealed library buried beneath the sands, containing preserved scrolls and astronomical records.',
      legendsaventurebkkEndingB:
        'Removing the relic activates ancient defense mechanisms. The explorer escapes through collapsing corridors while giant stone doors crash shut behind them.',
    },
  ),
  legendsaventurebkkMakeStory(
    {
      legendsaventurebkkId: 'india-moon-river',
      legendsaventurebkkRegion: 'India',
      legendsaventurebkkTitle: 'The Palace of the Moon River',
      legendsaventurebkkDescription:
        'Explore an abandoned riverside palace where lanterns glow and blue lights drift on the water.',
      legendsaventurebkkIntro:
        'Deep inside the jungle, the explorer discovers an abandoned riverside palace illuminated by silver moonlight. Soft music echoes through the trees while old lanterns suddenly begin glowing along the stone pathways. Beside the palace gates, a calm river reflects thousands of floating blue lights.',
    },
    'Enter the palace courtyard',
    'Follow the glowing riverbank',
    {
      legendsaventurebkkChoice1: '',
      legendsaventurebkkBridge:
        'Inside the palace stands a massive mirror decorated with sapphire patterns and ancient carvings. The surface reflects the room strangely, almost as if another concealed chamber exists beyond the glass.',
      legendsaventurebkkChoice2A: 'Touch the mirror',
      legendsaventurebkkChoice2B: 'Read the carved writings carefully',
      legendsaventurebkkEndingA:
        'The mirror slowly reveals a concealed ceremonial chamber containing royal masks, silver instruments, and forgotten treasures from the river kingdom.',
      legendsaventurebkkEndingB:
        'The writings uncover the story of a queen who protected the sacred river and disappeared during a legendary lunar eclipse.',
    },
    {
      legendsaventurebkkChoice1: '',
      legendsaventurebkkBridge:
        'The explorer discovers concealed wooden boats tied beneath hanging gardens filled with glowing blue flowers. Fireflies drift through the air while waterfalls echo somewhere deeper within the jungle.',
      legendsaventurebkkChoice2A: 'Take a boat downstream',
      legendsaventurebkkChoice2B: 'Explore the hanging gardens first',
      legendsaventurebkkEndingA:
        'The river leads toward a submerged temple concealed behind giant waterfalls, where ancient statues rise from the water beneath the moonlight.',
      legendsaventurebkkEndingB:
        'Inside the gardens, the explorer discovers rare glowing flowers once used in royal ceremonies and sacred rituals.',
    },
  ),
  legendsaventurebkkMakeStory(
    {
      legendsaventurebkkId: 'aztecs-red-sky',
      legendsaventurebkkRegion: 'Aztecs',
      legendsaventurebkkTitle: 'The Pyramid of the Red Sky',
      legendsaventurebkkDescription:
        'Climb an Aztec pyramid as the sky turns crimson and ancient drums echo through the ruins.',
      legendsaventurebkkIntro:
        'As sunset covers the jungle, the explorer climbs an enormous Aztec pyramid rising above the trees. Suddenly, the sky turns deep crimson while distant drums echo across the ancient city ruins. Without warning, part of the stone staircase begins shifting slowly beneath the explorer’s feet.',
    },
    'Continue climbing toward the summit',
    'Enter a side chamber below the pyramid',
    {
      legendsaventurebkkChoice1: '',
      legendsaventurebkkBridge:
        'At the top of the pyramid stands a giant calendar stone glowing with fiery symbols. Warm wind circles the summit while the symbols pulse brighter as darkness approaches.',
      legendsaventurebkkChoice2A: 'Rotate the calendar stone',
      legendsaventurebkkChoice2B: 'Study the glowing symbols first',
      legendsaventurebkkEndingA:
        'Rotating the stone opens a concealed observatory above the clouds, revealing ancient instruments used to study the stars.',
      legendsaventurebkkEndingB:
        'The glowing symbols reveal a forgotten prophecy describing a celestial event feared by the ancient priests.',
    },
    {
      legendsaventurebkkChoice1: '',
      legendsaventurebkkBridge:
        'The underground chamber walls are covered with paintings of warriors carrying crystal masks through burning cities. Strange echoes travel through concealed tunnels beneath the pyramid.',
      legendsaventurebkkChoice2A: 'Take one of the crystal masks',
      legendsaventurebkkChoice2B: 'Search behind the painted walls',
      legendsaventurebkkEndingA:
        'A concealed tunnel behind the paintings leads toward underground chambers buried beneath the ancient city.',
      legendsaventurebkkEndingB:
        'The crystal mask unlocks access to a ceremonial hall guarded by enormous stone statues covered in gold markings.',
    },
  ),
  legendsaventurebkkMakeStory(
    {
      legendsaventurebkkId: 'greece-shipwreck',
      legendsaventurebkkRegion: 'Greece',
      legendsaventurebkkTitle: 'The Shipwreck of Poseidon',
      legendsaventurebkkDescription:
        'Find an ancient shipwreck inside a sea cave after a violent storm near a rocky Greek island.',
      legendsaventurebkkIntro:
        'After a violent storm near a rocky Greek island, the explorer discovers an ancient shipwreck concealed inside a sea cave. Blue reflections shimmer across the cave walls while broken marble statues lie partially submerged beneath the water. Waves crash loudly outside as cold sea air fills the darkness.',
    },
    'Explore the captain’s cabin',
    'Dive deeper into the flooded ruins',
    {
      legendsaventurebkkChoice1: '',
      legendsaventurebkkBridge:
        'Inside the ruined cabin rests an old navigation map marked with symbols of Poseidon and concealed sea routes. Beside it stands a locked silver chest covered in salt and coral.',
      legendsaventurebkkChoice2A: 'Open the silver chest',
      legendsaventurebkkChoice2B: 'Follow the map directions instead',
      legendsaventurebkkEndingA:
        'Inside the chest lies a ceremonial trident decorated with glowing blue gems once carried by ancient sea priests.',
      legendsaventurebkkEndingB:
        'The map leads to a forgotten harbor concealed between cliffs where ancient travelers once worshipped Poseidon.',
    },
    {
      legendsaventurebkkChoice1: '',
      legendsaventurebkkBridge:
        'Beneath the water, the explorer discovers underwater ruins illuminated by strange glowing fish swimming through broken columns. Ancient carvings cover the submerged walls deep inside the cave.',
      legendsaventurebkkChoice2A: 'Swim toward the glowing ruins',
      legendsaventurebkkChoice2B: 'Return later with equipment',
      legendsaventurebkkEndingA:
        'The underwater ruins reveal a concealed shrine dedicated to sailors lost at sea centuries ago.',
      legendsaventurebkkEndingB:
        'Returning during moonlight reveals secret symbols visible only when the tides rise beneath the cave entrance.',
    },
  ),
  legendsaventurebkkMakeStory(
    {
      legendsaventurebkkId: 'egypt-obsidian-gate',
      legendsaventurebkkRegion: 'Egypt',
      legendsaventurebkkTitle: 'The Obsidian Gate',
      legendsaventurebkkDescription:
        'Face a gigantic black gate buried in the desert where whispers ride the warm wind.',
      legendsaventurebkkIntro:
        'Far beyond the pyramids, the explorer discovers a gigantic black gate buried halfway beneath the desert sands. The surface reflects sunlight like dark glass while warm wind carries strange whispers through the abandoned ruins nearby. Ancient torches surround the entrance even though no one has visited the place for centuries.',
    },
    'Push the obsidian gate open',
    'Search the nearby ruins first',
    {
      legendsaventurebkkChoice1: '',
      legendsaventurebkkBridge:
        'The heavy gate slowly moves aside, revealing a staircase descending into darkness beneath the desert. As the explorer walks downward, blue torches suddenly ignite along the underground walls.',
      legendsaventurebkkChoice2A: 'Continue deeper underground',
      legendsaventurebkkChoice2B: 'Study the glowing torch symbols',
      legendsaventurebkkEndingA:
        'The underground halls contain enormous statues of forgotten desert kings surrounded by concealed ceremonial chambers.',
      legendsaventurebkkEndingB:
        'The torch symbols reveal an ancient map leading toward oasis temples buried beneath the sands.',
    },
    {
      legendsaventurebkkChoice1: '',
      legendsaventurebkkBridge:
        'Scattered among the ruins, the explorer discovers broken obsidian tablets describing a legendary “city beneath the desert.” Strange markings suggest the city may still exist underground.',
      legendsaventurebkkChoice2A: 'Reassemble the obsidian tablets',
      legendsaventurebkkChoice2B: 'Ignore them and enter the gate immediately',
      legendsaventurebkkEndingA:
        'Reassembling the tablets reveals the location of a massive underground palace concealed beneath the dunes.',
      legendsaventurebkkEndingB:
        'Entering the gate too quickly activates ancient sand traps, forcing the explorer to escape collapsing corridors deep underground.',
    },
  ),
  legendsaventurebkkMakeStory(
    {
      legendsaventurebkkId: 'india-tiger-temple',
      legendsaventurebkkRegion: 'India',
      legendsaventurebkkTitle: 'The Tiger Temple of Jaipur',
      legendsaventurebkkDescription:
        'Find an abandoned temple behind giant stone tiger statues near the deserts of Jaipur.',
      legendsaventurebkkIntro:
        'While traveling through the deserts near Jaipur, the explorer discovers an abandoned temple concealed behind giant stone tiger statues. Warm wind carries the scent of incense through the empty halls while orange lanterns flicker softly inside the ruins. Strange claw marks carved into the floor seem to lead deeper underground.',
    },
    'Follow the claw marks into the temple',
    'Climb the upper balcony overlooking the ruins',
    {
      legendsaventurebkkChoice1: '',
      legendsaventurebkkBridge:
        'The underground corridors are lined with golden tiger carvings and faded royal banners. Deep inside the chamber, the explorer discovers a circular room with a massive stone throne surrounded by burning candles.',
      legendsaventurebkkChoice2A: 'Sit on the stone throne',
      legendsaventurebkkChoice2B: 'Examine the candles and symbols first',
      legendsaventurebkkEndingA:
        'The throne activates a concealed mechanism that opens a secret treasury filled with ancient jewels and ceremonial weapons.',
      legendsaventurebkkEndingB:
        'The symbols reveal the story of a legendary tiger guardian believed to protect the kingdom during war.',
    },
    {
      legendsaventurebkkChoice1: '',
      legendsaventurebkkBridge:
        'From above, the explorer notices concealed ropes connected to giant bells hanging over the courtyard. Beyond the balcony, moonlight reveals another sealed section of the temple.',
      legendsaventurebkkChoice2A: 'Ring the ancient bells',
      legendsaventurebkkChoice2B: 'Enter the sealed section quietly',
      legendsaventurebkkEndingA:
        'The bells trigger concealed doors throughout the temple, revealing forgotten royal chambers.',
      legendsaventurebkkEndingB:
        'Inside the sealed wing, the explorer discovers murals describing an ancient tiger festival lost to history.',
    },
  ),
  legendsaventurebkkMakeStory(
    {
      legendsaventurebkkId: 'aztecs-underground-city',
      legendsaventurebkkRegion: 'Aztecs',
      legendsaventurebkkTitle: 'The City Beneath the Jungle',
      legendsaventurebkkDescription:
        'Descend into a forgotten city revealed when the jungle floor collapses beneath ancient ruins.',
      legendsaventurebkkIntro:
        'Deep within the jungle, the explorer discovers stone ruins completely covered by vines and giant trees. As thunder rolls above the forest, part of the ground collapses and reveals a staircase descending into darkness beneath the ancient city.',
    },
    'Descend into the underground city',
    'Explore the surface ruins first',
    {
      legendsaventurebkkChoice1: '',
      legendsaventurebkkBridge:
        'The concealed city contains massive halls illuminated by glowing crystals embedded in the walls. Ancient murals depict priests carrying golden discs beneath a blood-red moon.',
      legendsaventurebkkChoice2A: 'Follow the glowing crystal corridor',
      legendsaventurebkkChoice2B: 'Study the murals carefully',
      legendsaventurebkkEndingA:
        'The crystal corridor leads to a concealed chamber containing a giant golden sun disc once used in sacred ceremonies.',
      legendsaventurebkkEndingB:
        'The murals reveal the location of a forgotten ceremonial arena buried beneath the jungle.',
    },
    {
      legendsaventurebkkChoice1: '',
      legendsaventurebkkBridge:
        'Among the broken temples, the explorer discovers abandoned market streets filled with shattered pottery and stone statues. A faint drumbeat echoes somewhere deeper in the jungle.',
      legendsaventurebkkChoice2A: 'Follow the mysterious drum sounds',
      legendsaventurebkkChoice2B: 'Search inside the largest temple nearby',
      legendsaventurebkkEndingA:
        'The drum sounds lead to an underground gathering hall concealed beneath the forest floor.',
      legendsaventurebkkEndingB:
        'Inside the temple rests a giant obsidian throne decorated with symbols of ancient rulers.',
    },
  ),
  legendsaventurebkkMakeStory(
    {
      legendsaventurebkkId: 'greece-silver-harp',
      legendsaventurebkkRegion: 'Greece',
      legendsaventurebkkTitle: 'The Cave of the Silver Harp',
      legendsaventurebkkDescription:
        'Follow music echoing from sea cliffs to a cave where silver light dances on underground pools.',
      legendsaventurebkkIntro:
        'While sailing near a remote Greek island, the explorer hears music echoing from sea cliffs during the night. Following the sound leads to a concealed cave where silver reflections shimmer across underground water pools.',
    },
    'Follow the music deeper into the cave',
    'Explore the underground lake first',
    {
      legendsaventurebkkChoice1: '',
      legendsaventurebkkBridge:
        'Inside the cave stands an ancient silver harp resting beside broken marble columns. The air vibrates softly every time the explorer approaches the instrument.',
      legendsaventurebkkChoice2A: 'Play the silver harp',
      legendsaventurebkkChoice2B: 'Inspect the nearby ruins first',
      legendsaventurebkkEndingA:
        'Playing the harp reveals a concealed passage leading toward a secret temple beneath the island cliffs.',
      legendsaventurebkkEndingB:
        'The nearby ruins contain scroll fragments describing musicians who once performed for ancient kings.',
    },
    {
      legendsaventurebkkChoice1: '',
      legendsaventurebkkBridge:
        'The underground lake glows faintly blue beneath the cave ceiling. Half-submerged statues stand silently in the water beside a narrow stone bridge.',
      legendsaventurebkkChoice2A: 'Cross the stone bridge',
      legendsaventurebkkChoice2B: 'Dive beneath the water surface',
      legendsaventurebkkEndingA:
        'Across the bridge lies a concealed chamber filled with silver ceremonial masks and musical instruments.',
      legendsaventurebkkEndingB:
        'Beneath the water, the explorer discovers underwater carvings telling the story of a forgotten sea festival.',
    },
  ),
  legendsaventurebkkMakeStory(
    {
      legendsaventurebkkId: 'egypt-moon-tomb',
      legendsaventurebkkRegion: 'Egypt',
      legendsaventurebkkTitle: 'The Moon Tomb of Alexandria',
      legendsaventurebkkDescription:
        'Enter a tomb near Alexandria revealed only when the full moon lights the stone walls.',
      legendsaventurebkkIntro:
        'Near the ancient ruins of Alexandria, the explorer discovers a concealed tomb entrance revealed only during a full moon. Pale silver light reflects across the stone walls while cold air rises from beneath the underground staircase.',
    },
    'Enter the moonlit tomb immediately',
    'Search the outer ruins first',
    {
      legendsaventurebkkChoice1: '',
      legendsaventurebkkBridge:
        'The underground chambers are covered in silver-painted stars and moon symbols unlike traditional Egyptian tombs. In the center of the room stands a giant circular mirror framed with black stone.',
      legendsaventurebkkChoice2A: 'Touch the mirror surface',
      legendsaventurebkkChoice2B: 'Search behind the mirror',
      legendsaventurebkkEndingA:
        'The mirror reveals a concealed observatory used by ancient astronomers to study eclipses and constellations.',
      legendsaventurebkkEndingB:
        'Behind the mirror lies a secret chamber containing lunar maps and crystal navigation tools.',
    },
    {
      legendsaventurebkkChoice1: '',
      legendsaventurebkkBridge:
        'Among the collapsed columns, the explorer discovers broken statues carrying moon-shaped necklaces and ancient scroll cases.',
      legendsaventurebkkChoice2A: 'Open the scroll cases',
      legendsaventurebkkChoice2B:
        'Follow a concealed corridor beneath the ruins',
      legendsaventurebkkEndingA:
        'The scrolls describe a forgotten society that studied the stars beneath Alexandria centuries ago.',
      legendsaventurebkkEndingB:
        'The concealed corridor leads toward underground docks once connected to the ancient harbor.',
    },
  ),
  legendsaventurebkkMakeStory(
    {
      legendsaventurebkkId: 'india-emerald-palace',
      legendsaventurebkkRegion: 'India',
      legendsaventurebkkTitle: 'The Emerald Elephant Palace',
      legendsaventurebkkDescription:
        'Discover an abandoned palace of emerald elephant statues deep inside tropical forests.',
      legendsaventurebkkIntro:
        'Concealed deep inside tropical forests, the explorer discovers an abandoned palace decorated with giant emerald elephant statues. Rain falls softly through broken rooftops while green reflections shimmer across flooded marble floors.',
    },
    'Enter the royal throne hall',
    'Explore the flooded lower chambers',
    {
      legendsaventurebkkChoice1: '',
      legendsaventurebkkBridge:
        'At the center of the hall stands a golden throne surrounded by hanging lanterns and giant silk banners. Behind the throne, a massive carved elephant door remains tightly sealed.',
      legendsaventurebkkChoice2A: 'Attempt to open the elephant door',
      legendsaventurebkkChoice2B: 'Examine the silk banners first',
      legendsaventurebkkEndingA:
        'The elephant door opens into a concealed treasury filled with ceremonial crowns and emerald carvings.',
      legendsaventurebkkEndingB:
        'The banners reveal the forgotten story of a royal expedition lost in the jungle centuries ago.',
    },
    {
      legendsaventurebkkChoice1: '',
      legendsaventurebkkBridge:
        'The flooded corridors contain floating candles and ancient stone bridges partially submerged beneath dark water. Soft chanting echoes from somewhere below the palace.',
      legendsaventurebkkChoice2A: 'Follow the chanting sounds',
      legendsaventurebkkChoice2B: 'Search the flooded rooms carefully',
      legendsaventurebkkEndingA:
        'The chanting leads toward a concealed underground sanctuary illuminated by glowing green crystals.',
      legendsaventurebkkEndingB:
        'Inside the flooded chambers, the explorer discovers ceremonial boats once used during royal festivals.',
    },
  ),
  legendsaventurebkkMakeStory(
    {
      legendsaventurebkkId: 'aztecs-golden-eclipse',
      legendsaventurebkkRegion: 'Aztecs',
      legendsaventurebkkTitle: 'The Temple of the Golden Eclipse',
      legendsaventurebkkDescription:
        'Reach a mountain temple as a rare solar eclipse makes golden symbols glow in the darkened sky.',
      legendsaventurebkkIntro:
        'During a rare solar eclipse, the explorer arrives at a forgotten Aztec temple concealed high within the mountains. Shadows move strangely across the stone walls while giant golden symbols begin glowing beneath the darkened sky.',
    },
    'Climb toward the eclipse altar',
    'Enter the underground temple tunnels',
    {
      legendsaventurebkkChoice1: '',
      legendsaventurebkkBridge:
        'At the summit stands a massive golden disc reflecting the eclipse above the mountains. Ancient wind whistles through the ruins while concealed mechanisms begin moving beneath the stone floor.',
      legendsaventurebkkChoice2A: 'Rotate the golden disc',
      legendsaventurebkkChoice2B: 'Study the surrounding carvings first',
      legendsaventurebkkEndingA:
        'Rotating the disc reveals a concealed observatory chamber filled with celestial maps and crystal instruments.',
      legendsaventurebkkEndingB:
        'The carvings uncover an ancient prophecy connected to the return of a legendary ruler.',
    },
    {
      legendsaventurebkkChoice1: '',
      legendsaventurebkkBridge:
        'The underground tunnels contain glowing torches and giant warrior statues covered in obsidian armor. Strange echoes travel through the darkness beneath the mountain temple.',
      legendsaventurebkkChoice2A: 'Follow the echoing sounds',
      legendsaventurebkkChoice2B: 'Search behind the warrior statues',
      legendsaventurebkkEndingA:
        'The echoes lead toward a ceremonial chamber where ancient priests once observed eclipses in secret.',
      legendsaventurebkkEndingB:
        'Behind the statues, the explorer discovers concealed passages leading toward treasure rooms beneath the mountain.',
    },
  ),
];

export const legendsaventurebkkStories: LegendsaventurebkkStory[] =
  legendsaventurebkkStoriesBase.map(legendsaventurebkkStory => ({
    ...legendsaventurebkkStory,
    legendsaventurebkkImage:
      legendsaventurebkkStoryImages[legendsaventurebkkStory.legendsaventurebkkId],
  }));

export const legendsaventurebkkRegionOrder: LegendsaventurebkkRegion[] = [
  'Greece',
  'Egypt',
  'India',
  'Aztecs',
];

export const legendsaventurebkkGetStoryById = (
  legendsaventurebkkId: string,
) =>
  legendsaventurebkkStories.find(
    s => s.legendsaventurebkkId === legendsaventurebkkId,
  );

export const legendsaventurebkkStoriesByRegion =
  legendsaventurebkkRegionOrder.map(legendsaventurebkkRegion => ({
    legendsaventurebkkRegion,
    legendsaventurebkkItems: legendsaventurebkkStories.filter(
      s => s.legendsaventurebkkRegion === legendsaventurebkkRegion,
    ),
  }));
