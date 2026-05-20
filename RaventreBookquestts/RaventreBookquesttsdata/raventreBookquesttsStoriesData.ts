import type {ImageSourcePropType} from 'react-native';

export type RaventreBookquesttsRegion = 'Greece' | 'Egypt' | 'India' | 'Aztecs';

export type RaventreBookquesttsStoryChoice = {
  raventreBookquesttsLabel: string;
  raventreBookquesttsNext: string;
};

export type RaventreBookquesttsStoryNode = {
  raventreBookquesttsAddText?: string;
  raventreBookquesttsQuestion?: string;
  raventreBookquesttsChoices?: RaventreBookquesttsStoryChoice[];
  raventreBookquesttsEnding?: boolean;
};

export type RaventreBookquesttsStory = {
  raventreBookquesttsId: string;
  raventreBookquesttsRegion: RaventreBookquesttsRegion;
  raventreBookquesttsTitle: string;
  raventreBookquesttsDescription: string;
  raventreBookquesttsIntro: string;
  raventreBookquesttsImage: ImageSourcePropType;
  raventreBookquesttsNodes: Record<string, RaventreBookquesttsStoryNode>;
};

const raventreBookquesttsStoryImages: Record<string, ImageSourcePropType> = {
  'greece-delphi': require('../../assets/img/raventreboloc1.png'),
  'egypt-falcon': require('../../assets/img/raventreboloc2.png'),
  'india-moon-river': require('../../assets/img/raventreboloc3.png'),
  'aztecs-red-sky': require('../../assets/img/raventreboloc4.png'),
  'greece-shipwreck': require('../../assets/img/raventreboloc5.png'),
  'egypt-obsidian-gate': require('../../assets/img/raventreboloc6.png'),
  'india-tiger-temple': require('../../assets/img/raventreboloc7.png'),
  'aztecs-underground-city': require('../../assets/img/raventreboloc8.png'),
  'greece-silver-harp': require('../../assets/img/raventreboloc9.png'),
  'egypt-moon-tomb': require('../../assets/img/raventreboloc10.png'),
  'india-emerald-palace': require('../../assets/img/raventreboloc11.png'),
  'aztecs-golden-eclipse': require('../../assets/img/raventreboloc12.png'),
};

type RaventreBookquesttsBranch = {
  raventreBookquesttsChoice1: string;
  raventreBookquesttsBridge: string;
  raventreBookquesttsChoice2A: string;
  raventreBookquesttsChoice2B: string;
  raventreBookquesttsEndingA: string;
  raventreBookquesttsEndingB: string;
};

const raventreBookquesttsMakeStory = (
  meta: {
    raventreBookquesttsId: string;
    raventreBookquesttsRegion: RaventreBookquesttsRegion;
    raventreBookquesttsTitle: string;
    raventreBookquesttsDescription: string;
    raventreBookquesttsIntro: string;
  },
  raventreBookquesttsChoice1A: string,
  raventreBookquesttsChoice1B: string,
  raventreBookquesttsBranchA: RaventreBookquesttsBranch,
  raventreBookquesttsBranchB: RaventreBookquesttsBranch,
): Omit<RaventreBookquesttsStory, 'raventreBookquesttsImage'> => ({
  ...meta,
  raventreBookquesttsNodes: {
    start: {
      raventreBookquesttsQuestion: 'What will you do?',
      raventreBookquesttsChoices: [
        {
          raventreBookquesttsLabel: raventreBookquesttsChoice1A,
          raventreBookquesttsNext: 'a',
        },
        {
          raventreBookquesttsLabel: raventreBookquesttsChoice1B,
          raventreBookquesttsNext: 'b',
        },
      ],
    },
    a: {
      raventreBookquesttsAddText:
        raventreBookquesttsBranchA.raventreBookquesttsBridge,
      raventreBookquesttsQuestion: 'What will you do?',
      raventreBookquesttsChoices: [
        {
          raventreBookquesttsLabel:
            raventreBookquesttsBranchA.raventreBookquesttsChoice2A,
          raventreBookquesttsNext: 'a-end1',
        },
        {
          raventreBookquesttsLabel:
            raventreBookquesttsBranchA.raventreBookquesttsChoice2B,
          raventreBookquesttsNext: 'a-end2',
        },
      ],
    },
    'a-end1': {
      raventreBookquesttsAddText:
        raventreBookquesttsBranchA.raventreBookquesttsEndingA,
      raventreBookquesttsEnding: true,
    },
    'a-end2': {
      raventreBookquesttsAddText:
        raventreBookquesttsBranchA.raventreBookquesttsEndingB,
      raventreBookquesttsEnding: true,
    },
    b: {
      raventreBookquesttsAddText:
        raventreBookquesttsBranchB.raventreBookquesttsBridge,
      raventreBookquesttsQuestion: 'What will you do?',
      raventreBookquesttsChoices: [
        {
          raventreBookquesttsLabel:
            raventreBookquesttsBranchB.raventreBookquesttsChoice2A,
          raventreBookquesttsNext: 'b-end1',
        },
        {
          raventreBookquesttsLabel:
            raventreBookquesttsBranchB.raventreBookquesttsChoice2B,
          raventreBookquesttsNext: 'b-end2',
        },
      ],
    },
    'b-end1': {
      raventreBookquesttsAddText:
        raventreBookquesttsBranchB.raventreBookquesttsEndingA,
      raventreBookquesttsEnding: true,
    },
    'b-end2': {
      raventreBookquesttsAddText:
        raventreBookquesttsBranchB.raventreBookquesttsEndingB,
      raventreBookquesttsEnding: true,
    },
  },
});

const raventreBookquesttsStoriesBase: Omit<
  RaventreBookquesttsStory,
  'raventreBookquesttsImage'
>[] = [
  raventreBookquesttsMakeStory(
    {
      raventreBookquesttsId: 'greece-delphi',
      raventreBookquesttsRegion: 'Greece',
      raventreBookquesttsTitle: 'The Temple Beneath Delphi',
      raventreBookquesttsDescription:
        'Discover a collapsed staircase beneath Delphi and uncover what awakens below the mountain.',
      raventreBookquesttsIntro:
        'During a violent storm near Delphi, the explorer discovers a collapsed staircase concealed beneath the ruins of an abandoned temple. Rainwater flows through cracked marble pillars while faded symbols shimmer strangely under the torchlight. Deep below the mountain, a metallic echo repeats through the darkness as if something ancient has awakened.',
    },
    'Follow the metallic sound deeper underground',
    'Examine the glowing wall symbols first',
    {
      raventreBookquesttsChoice1: '',
      raventreBookquesttsBridge:
        'The tunnel becomes narrower and colder as the explorer descends deeper into the ruins. At the end of the corridor stands a massive bronze mechanism shaped like a coiled serpent wrapped around a sealed stone gate. Fresh footprints in the dust suggest someone else entered recently.',
      raventreBookquesttsChoice2A: 'Activate the serpent mechanism',
      raventreBookquesttsChoice2B: 'Follow the mysterious footprints',
      raventreBookquesttsEndingA:
        'The serpent mechanism slowly unlocks the concealed chamber behind the gate. Inside rests a golden laurel crown once worn by a forgotten oracle, surrounded by ancient ceremonial treasures and untouched scrolls.',
      raventreBookquesttsEndingB:
        'The footprints lead to another treasure hunter trapped inside the ruins. Together, they uncover a secret archive concealed beneath Delphi before escaping the collapsing tunnels.',
    },
    {
      raventreBookquesttsChoice1: '',
      raventreBookquesttsBridge:
        'The glowing markings describe an ancient warning about “the voice beneath the mountain.” As the explorer studies the symbols more carefully, part of the wall shifts aside and reveals a concealed staircase descending into darkness.',
      raventreBookquesttsChoice2A: 'Descend the concealed staircase',
      raventreBookquesttsChoice2B: 'Ignore the warning and continue forward',
      raventreBookquesttsEndingA:
        'The staircase leads to a forgotten underground library filled with sealed scrolls, maps, and celestial charts untouched for centuries beneath the mountain.',
      raventreBookquesttsEndingB:
        'Ignoring the warning triggers an ancient floor trap. The explorer barely escapes the collapsing chamber but manages to recover a strange bronze key covered in mysterious symbols.',
    },
  ),
  raventreBookquesttsMakeStory(
    {
      raventreBookquesttsId: 'egypt-falcon',
      raventreBookquesttsRegion: 'Egypt',
      raventreBookquesttsTitle: 'The Chamber of the Sun Falcon',
      raventreBookquesttsDescription:
        'Uncover a buried chamber near the Valley of the Kings where falcon statues guard solar secrets.',
      raventreBookquesttsIntro:
        'Near the Valley of the Kings, the explorer uncovers a buried chamber concealed beneath drifting desert sands. Giant falcon statues covered in golden dust stand silently beside black stone walls carved with solar markings. A single beam of sunlight passes through the ceiling and illuminates an ancient altar at the center of the room.',
    },
    'Touch the black stone altar',
    'Search the surrounding chamber walls',
    {
      raventreBookquesttsChoice1: '',
      raventreBookquesttsBridge:
        'The chamber begins trembling softly as concealed gears move somewhere behind the walls. Slowly, secret doors open between the giant falcon statues, revealing a passage descending deeper underground.',
      raventreBookquesttsChoice2A: 'Enter the newly opened passage',
      raventreBookquesttsChoice2B: 'Stay and study the altar symbols',
      raventreBookquesttsEndingA:
        'The underground passage reveals a lost royal burial chamber filled with crystal jars, ceremonial jewelry, and treasures untouched for generations.',
      raventreBookquesttsEndingB:
        'The symbols on the altar form an ancient solar calendar predicting rare celestial events once used by Egyptian priests and astronomers.',
    },
    {
      raventreBookquesttsChoice1: '',
      raventreBookquesttsBridge:
        'Behind layers of dust, the explorer discovers painted maps showing concealed tunnels beneath the desert dunes. The drawings seem to point toward an underground route connecting several forgotten tombs.',
      raventreBookquesttsChoice2A: 'Follow the underground route',
      raventreBookquesttsChoice2B: 'Take one of the golden relics first',
      raventreBookquesttsEndingA:
        'The underground tunnels lead to a concealed library buried beneath the sands, containing preserved scrolls and astronomical records.',
      raventreBookquesttsEndingB:
        'Removing the relic activates ancient defense mechanisms. The explorer escapes through collapsing corridors while giant stone doors crash shut behind them.',
    },
  ),
  raventreBookquesttsMakeStory(
    {
      raventreBookquesttsId: 'india-moon-river',
      raventreBookquesttsRegion: 'India',
      raventreBookquesttsTitle: 'The Palace of the Moon River',
      raventreBookquesttsDescription:
        'Explore an abandoned riverside palace where lanterns glow and blue lights drift on the water.',
      raventreBookquesttsIntro:
        'Deep inside the jungle, the explorer discovers an abandoned riverside palace illuminated by silver moonlight. Soft music echoes through the trees while old lanterns suddenly begin glowing along the stone pathways. Beside the palace gates, a calm river reflects thousands of floating blue lights.',
    },
    'Enter the palace courtyard',
    'Follow the glowing riverbank',
    {
      raventreBookquesttsChoice1: '',
      raventreBookquesttsBridge:
        'Inside the palace stands a massive mirror decorated with sapphire patterns and ancient carvings. The surface reflects the room strangely, almost as if another concealed chamber exists beyond the glass.',
      raventreBookquesttsChoice2A: 'Touch the mirror',
      raventreBookquesttsChoice2B: 'Read the carved writings carefully',
      raventreBookquesttsEndingA:
        'The mirror slowly reveals a concealed ceremonial chamber containing royal masks, silver instruments, and forgotten treasures from the river kingdom.',
      raventreBookquesttsEndingB:
        'The writings uncover the story of a queen who protected the sacred river and disappeared during a legendary lunar eclipse.',
    },
    {
      raventreBookquesttsChoice1: '',
      raventreBookquesttsBridge:
        'The explorer discovers concealed wooden boats tied beneath hanging gardens filled with glowing blue flowers. Fireflies drift through the air while waterfalls echo somewhere deeper within the jungle.',
      raventreBookquesttsChoice2A: 'Take a boat downstream',
      raventreBookquesttsChoice2B: 'Explore the hanging gardens first',
      raventreBookquesttsEndingA:
        'The river leads toward a submerged temple concealed behind giant waterfalls, where ancient statues rise from the water beneath the moonlight.',
      raventreBookquesttsEndingB:
        'Inside the gardens, the explorer discovers rare glowing flowers once used in royal ceremonies and sacred rituals.',
    },
  ),
  raventreBookquesttsMakeStory(
    {
      raventreBookquesttsId: 'aztecs-red-sky',
      raventreBookquesttsRegion: 'Aztecs',
      raventreBookquesttsTitle: 'The Pyramid of the Red Sky',
      raventreBookquesttsDescription:
        'Climb an Aztec pyramid as the sky turns crimson and ancient drums echo through the ruins.',
      raventreBookquesttsIntro:
        'As sunset covers the jungle, the explorer climbs an enormous Aztec pyramid rising above the trees. Suddenly, the sky turns deep crimson while distant drums echo across the ancient city ruins. Without warning, part of the stone staircase begins shifting slowly beneath the explorer’s feet.',
    },
    'Continue climbing toward the summit',
    'Enter a side chamber below the pyramid',
    {
      raventreBookquesttsChoice1: '',
      raventreBookquesttsBridge:
        'At the top of the pyramid stands a giant calendar stone glowing with fiery symbols. Warm wind circles the summit while the symbols pulse brighter as darkness approaches.',
      raventreBookquesttsChoice2A: 'Rotate the calendar stone',
      raventreBookquesttsChoice2B: 'Study the glowing symbols first',
      raventreBookquesttsEndingA:
        'Rotating the stone opens a concealed observatory above the clouds, revealing ancient instruments used to study the stars.',
      raventreBookquesttsEndingB:
        'The glowing symbols reveal a forgotten prophecy describing a celestial event feared by the ancient priests.',
    },
    {
      raventreBookquesttsChoice1: '',
      raventreBookquesttsBridge:
        'The underground chamber walls are covered with paintings of warriors carrying crystal masks through burning cities. Strange echoes travel through concealed tunnels beneath the pyramid.',
      raventreBookquesttsChoice2A: 'Take one of the crystal masks',
      raventreBookquesttsChoice2B: 'Search behind the painted walls',
      raventreBookquesttsEndingA:
        'A concealed tunnel behind the paintings leads toward underground chambers buried beneath the ancient city.',
      raventreBookquesttsEndingB:
        'The crystal mask unlocks access to a ceremonial hall guarded by enormous stone statues covered in gold markings.',
    },
  ),
  raventreBookquesttsMakeStory(
    {
      raventreBookquesttsId: 'greece-shipwreck',
      raventreBookquesttsRegion: 'Greece',
      raventreBookquesttsTitle: 'The Shipwreck of Poseidon',
      raventreBookquesttsDescription:
        'Find an ancient shipwreck inside a sea cave after a violent storm near a rocky Greek island.',
      raventreBookquesttsIntro:
        'After a violent storm near a rocky Greek island, the explorer discovers an ancient shipwreck concealed inside a sea cave. Blue reflections shimmer across the cave walls while broken marble statues lie partially submerged beneath the water. Waves crash loudly outside as cold sea air fills the darkness.',
    },
    'Explore the captain’s cabin',
    'Dive deeper into the flooded ruins',
    {
      raventreBookquesttsChoice1: '',
      raventreBookquesttsBridge:
        'Inside the ruined cabin rests an old navigation map marked with symbols of Poseidon and concealed sea routes. Beside it stands a locked silver chest covered in salt and coral.',
      raventreBookquesttsChoice2A: 'Open the silver chest',
      raventreBookquesttsChoice2B: 'Follow the map directions instead',
      raventreBookquesttsEndingA:
        'Inside the chest lies a ceremonial trident decorated with glowing blue gems once carried by ancient sea priests.',
      raventreBookquesttsEndingB:
        'The map leads to a forgotten harbor concealed between cliffs where ancient travelers once worshipped Poseidon.',
    },
    {
      raventreBookquesttsChoice1: '',
      raventreBookquesttsBridge:
        'Beneath the water, the explorer discovers underwater ruins illuminated by strange glowing fish swimming through broken columns. Ancient carvings cover the submerged walls deep inside the cave.',
      raventreBookquesttsChoice2A: 'Swim toward the glowing ruins',
      raventreBookquesttsChoice2B: 'Return later with equipment',
      raventreBookquesttsEndingA:
        'The underwater ruins reveal a concealed shrine dedicated to sailors lost at sea centuries ago.',
      raventreBookquesttsEndingB:
        'Returning during moonlight reveals secret symbols visible only when the tides rise beneath the cave entrance.',
    },
  ),
  raventreBookquesttsMakeStory(
    {
      raventreBookquesttsId: 'egypt-obsidian-gate',
      raventreBookquesttsRegion: 'Egypt',
      raventreBookquesttsTitle: 'The Obsidian Gate',
      raventreBookquesttsDescription:
        'Face a gigantic black gate buried in the desert where whispers ride the warm wind.',
      raventreBookquesttsIntro:
        'Far beyond the pyramids, the explorer discovers a gigantic black gate buried halfway beneath the desert sands. The surface reflects sunlight like dark glass while warm wind carries strange whispers through the abandoned ruins nearby. Ancient torches surround the entrance even though no one has visited the place for centuries.',
    },
    'Push the obsidian gate open',
    'Search the nearby ruins first',
    {
      raventreBookquesttsChoice1: '',
      raventreBookquesttsBridge:
        'The heavy gate slowly moves aside, revealing a staircase descending into darkness beneath the desert. As the explorer walks downward, blue torches suddenly ignite along the underground walls.',
      raventreBookquesttsChoice2A: 'Continue deeper underground',
      raventreBookquesttsChoice2B: 'Study the glowing torch symbols',
      raventreBookquesttsEndingA:
        'The underground halls contain enormous statues of forgotten desert kings surrounded by concealed ceremonial chambers.',
      raventreBookquesttsEndingB:
        'The torch symbols reveal an ancient map leading toward oasis temples buried beneath the sands.',
    },
    {
      raventreBookquesttsChoice1: '',
      raventreBookquesttsBridge:
        'Scattered among the ruins, the explorer discovers broken obsidian tablets describing a legendary “city beneath the desert.” Strange markings suggest the city may still exist underground.',
      raventreBookquesttsChoice2A: 'Reassemble the obsidian tablets',
      raventreBookquesttsChoice2B: 'Ignore them and enter the gate immediately',
      raventreBookquesttsEndingA:
        'Reassembling the tablets reveals the location of a massive underground palace concealed beneath the dunes.',
      raventreBookquesttsEndingB:
        'Entering the gate too quickly activates ancient sand traps, forcing the explorer to escape collapsing corridors deep underground.',
    },
  ),
  raventreBookquesttsMakeStory(
    {
      raventreBookquesttsId: 'india-tiger-temple',
      raventreBookquesttsRegion: 'India',
      raventreBookquesttsTitle: 'The Tiger Temple of Jaipur',
      raventreBookquesttsDescription:
        'Find an abandoned temple behind giant stone tiger statues near the deserts of Jaipur.',
      raventreBookquesttsIntro:
        'While traveling through the deserts near Jaipur, the explorer discovers an abandoned temple concealed behind giant stone tiger statues. Warm wind carries the scent of incense through the empty halls while orange lanterns flicker softly inside the ruins. Strange claw marks carved into the floor seem to lead deeper underground.',
    },
    'Follow the claw marks into the temple',
    'Climb the upper balcony overlooking the ruins',
    {
      raventreBookquesttsChoice1: '',
      raventreBookquesttsBridge:
        'The underground corridors are lined with golden tiger carvings and faded royal banners. Deep inside the chamber, the explorer discovers a circular room with a massive stone throne surrounded by burning candles.',
      raventreBookquesttsChoice2A: 'Sit on the stone throne',
      raventreBookquesttsChoice2B: 'Examine the candles and symbols first',
      raventreBookquesttsEndingA:
        'The throne activates a concealed mechanism that opens a secret treasury filled with ancient jewels and ceremonial weapons.',
      raventreBookquesttsEndingB:
        'The symbols reveal the story of a legendary tiger guardian believed to protect the kingdom during war.',
    },
    {
      raventreBookquesttsChoice1: '',
      raventreBookquesttsBridge:
        'From above, the explorer notices concealed ropes connected to giant bells hanging over the courtyard. Beyond the balcony, moonlight reveals another sealed section of the temple.',
      raventreBookquesttsChoice2A: 'Ring the ancient bells',
      raventreBookquesttsChoice2B: 'Enter the sealed section quietly',
      raventreBookquesttsEndingA:
        'The bells trigger concealed doors throughout the temple, revealing forgotten royal chambers.',
      raventreBookquesttsEndingB:
        'Inside the sealed wing, the explorer discovers murals describing an ancient tiger festival lost to history.',
    },
  ),
  raventreBookquesttsMakeStory(
    {
      raventreBookquesttsId: 'aztecs-underground-city',
      raventreBookquesttsRegion: 'Aztecs',
      raventreBookquesttsTitle: 'The City Beneath the Jungle',
      raventreBookquesttsDescription:
        'Descend into a forgotten city revealed when the jungle floor collapses beneath ancient ruins.',
      raventreBookquesttsIntro:
        'Deep within the jungle, the explorer discovers stone ruins completely covered by vines and giant trees. As thunder rolls above the forest, part of the ground collapses and reveals a staircase descending into darkness beneath the ancient city.',
    },
    'Descend into the underground city',
    'Explore the surface ruins first',
    {
      raventreBookquesttsChoice1: '',
      raventreBookquesttsBridge:
        'The concealed city contains massive halls illuminated by glowing crystals embedded in the walls. Ancient murals depict priests carrying golden discs beneath a blood-red moon.',
      raventreBookquesttsChoice2A: 'Follow the glowing crystal corridor',
      raventreBookquesttsChoice2B: 'Study the murals carefully',
      raventreBookquesttsEndingA:
        'The crystal corridor leads to a concealed chamber containing a giant golden sun disc once used in sacred ceremonies.',
      raventreBookquesttsEndingB:
        'The murals reveal the location of a forgotten ceremonial arena buried beneath the jungle.',
    },
    {
      raventreBookquesttsChoice1: '',
      raventreBookquesttsBridge:
        'Among the broken temples, the explorer discovers abandoned market streets filled with shattered pottery and stone statues. A faint drumbeat echoes somewhere deeper in the jungle.',
      raventreBookquesttsChoice2A: 'Follow the mysterious drum sounds',
      raventreBookquesttsChoice2B: 'Search inside the largest temple nearby',
      raventreBookquesttsEndingA:
        'The drum sounds lead to an underground gathering hall concealed beneath the forest floor.',
      raventreBookquesttsEndingB:
        'Inside the temple rests a giant obsidian throne decorated with symbols of ancient rulers.',
    },
  ),
  raventreBookquesttsMakeStory(
    {
      raventreBookquesttsId: 'greece-silver-harp',
      raventreBookquesttsRegion: 'Greece',
      raventreBookquesttsTitle: 'The Cave of the Silver Harp',
      raventreBookquesttsDescription:
        'Follow music echoing from sea cliffs to a cave where silver light dances on underground pools.',
      raventreBookquesttsIntro:
        'While sailing near a remote Greek island, the explorer hears music echoing from sea cliffs during the night. Following the sound leads to a concealed cave where silver reflections shimmer across underground water pools.',
    },
    'Follow the music deeper into the cave',
    'Explore the underground lake first',
    {
      raventreBookquesttsChoice1: '',
      raventreBookquesttsBridge:
        'Inside the cave stands an ancient silver harp resting beside broken marble columns. The air vibrates softly every time the explorer approaches the instrument.',
      raventreBookquesttsChoice2A: 'Play the silver harp',
      raventreBookquesttsChoice2B: 'Inspect the nearby ruins first',
      raventreBookquesttsEndingA:
        'Playing the harp reveals a concealed passage leading toward a secret temple beneath the island cliffs.',
      raventreBookquesttsEndingB:
        'The nearby ruins contain scroll fragments describing musicians who once performed for ancient kings.',
    },
    {
      raventreBookquesttsChoice1: '',
      raventreBookquesttsBridge:
        'The underground lake glows faintly blue beneath the cave ceiling. Half-submerged statues stand silently in the water beside a narrow stone bridge.',
      raventreBookquesttsChoice2A: 'Cross the stone bridge',
      raventreBookquesttsChoice2B: 'Dive beneath the water surface',
      raventreBookquesttsEndingA:
        'Across the bridge lies a concealed chamber filled with silver ceremonial masks and musical instruments.',
      raventreBookquesttsEndingB:
        'Beneath the water, the explorer discovers underwater carvings telling the story of a forgotten sea festival.',
    },
  ),
  raventreBookquesttsMakeStory(
    {
      raventreBookquesttsId: 'egypt-moon-tomb',
      raventreBookquesttsRegion: 'Egypt',
      raventreBookquesttsTitle: 'The Moon Tomb of Alexandria',
      raventreBookquesttsDescription:
        'Enter a tomb near Alexandria revealed only when the full moon lights the stone walls.',
      raventreBookquesttsIntro:
        'Near the ancient ruins of Alexandria, the explorer discovers a concealed tomb entrance revealed only during a full moon. Pale silver light reflects across the stone walls while cold air rises from beneath the underground staircase.',
    },
    'Enter the moonlit tomb immediately',
    'Search the outer ruins first',
    {
      raventreBookquesttsChoice1: '',
      raventreBookquesttsBridge:
        'The underground chambers are covered in silver-painted stars and moon symbols unlike traditional Egyptian tombs. In the center of the room stands a giant circular mirror framed with black stone.',
      raventreBookquesttsChoice2A: 'Touch the mirror surface',
      raventreBookquesttsChoice2B: 'Search behind the mirror',
      raventreBookquesttsEndingA:
        'The mirror reveals a concealed observatory used by ancient astronomers to study eclipses and constellations.',
      raventreBookquesttsEndingB:
        'Behind the mirror lies a secret chamber containing lunar maps and crystal navigation tools.',
    },
    {
      raventreBookquesttsChoice1: '',
      raventreBookquesttsBridge:
        'Among the collapsed columns, the explorer discovers broken statues carrying moon-shaped necklaces and ancient scroll cases.',
      raventreBookquesttsChoice2A: 'Open the scroll cases',
      raventreBookquesttsChoice2B:
        'Follow a concealed corridor beneath the ruins',
      raventreBookquesttsEndingA:
        'The scrolls describe a forgotten society that studied the stars beneath Alexandria centuries ago.',
      raventreBookquesttsEndingB:
        'The concealed corridor leads toward underground docks once connected to the ancient harbor.',
    },
  ),
  raventreBookquesttsMakeStory(
    {
      raventreBookquesttsId: 'india-emerald-palace',
      raventreBookquesttsRegion: 'India',
      raventreBookquesttsTitle: 'The Emerald Elephant Palace',
      raventreBookquesttsDescription:
        'Discover an abandoned palace of emerald elephant statues deep inside tropical forests.',
      raventreBookquesttsIntro:
        'Concealed deep inside tropical forests, the explorer discovers an abandoned palace decorated with giant emerald elephant statues. Rain falls softly through broken rooftops while green reflections shimmer across flooded marble floors.',
    },
    'Enter the royal throne hall',
    'Explore the flooded lower chambers',
    {
      raventreBookquesttsChoice1: '',
      raventreBookquesttsBridge:
        'At the center of the hall stands a golden throne surrounded by hanging lanterns and giant silk banners. Behind the throne, a massive carved elephant door remains tightly sealed.',
      raventreBookquesttsChoice2A: 'Attempt to open the elephant door',
      raventreBookquesttsChoice2B: 'Examine the silk banners first',
      raventreBookquesttsEndingA:
        'The elephant door opens into a concealed treasury filled with ceremonial crowns and emerald carvings.',
      raventreBookquesttsEndingB:
        'The banners reveal the forgotten story of a royal expedition lost in the jungle centuries ago.',
    },
    {
      raventreBookquesttsChoice1: '',
      raventreBookquesttsBridge:
        'The flooded corridors contain floating candles and ancient stone bridges partially submerged beneath dark water. Soft chanting echoes from somewhere below the palace.',
      raventreBookquesttsChoice2A: 'Follow the chanting sounds',
      raventreBookquesttsChoice2B: 'Search the flooded rooms carefully',
      raventreBookquesttsEndingA:
        'The chanting leads toward a concealed underground sanctuary illuminated by glowing green crystals.',
      raventreBookquesttsEndingB:
        'Inside the flooded chambers, the explorer discovers ceremonial boats once used during royal festivals.',
    },
  ),
  raventreBookquesttsMakeStory(
    {
      raventreBookquesttsId: 'aztecs-golden-eclipse',
      raventreBookquesttsRegion: 'Aztecs',
      raventreBookquesttsTitle: 'The Temple of the Golden Eclipse',
      raventreBookquesttsDescription:
        'Reach a mountain temple as a rare solar eclipse makes golden symbols glow in the darkened sky.',
      raventreBookquesttsIntro:
        'During a rare solar eclipse, the explorer arrives at a forgotten Aztec temple concealed high within the mountains. Shadows move strangely across the stone walls while giant golden symbols begin glowing beneath the darkened sky.',
    },
    'Climb toward the eclipse altar',
    'Enter the underground temple tunnels',
    {
      raventreBookquesttsChoice1: '',
      raventreBookquesttsBridge:
        'At the summit stands a massive golden disc reflecting the eclipse above the mountains. Ancient wind whistles through the ruins while concealed mechanisms begin moving beneath the stone floor.',
      raventreBookquesttsChoice2A: 'Rotate the golden disc',
      raventreBookquesttsChoice2B: 'Study the surrounding carvings first',
      raventreBookquesttsEndingA:
        'Rotating the disc reveals a concealed observatory chamber filled with celestial maps and crystal instruments.',
      raventreBookquesttsEndingB:
        'The carvings uncover an ancient prophecy connected to the return of a legendary ruler.',
    },
    {
      raventreBookquesttsChoice1: '',
      raventreBookquesttsBridge:
        'The underground tunnels contain glowing torches and giant warrior statues covered in obsidian armor. Strange echoes travel through the darkness beneath the mountain temple.',
      raventreBookquesttsChoice2A: 'Follow the echoing sounds',
      raventreBookquesttsChoice2B: 'Search behind the warrior statues',
      raventreBookquesttsEndingA:
        'The echoes lead toward a ceremonial chamber where ancient priests once observed eclipses in secret.',
      raventreBookquesttsEndingB:
        'Behind the statues, the explorer discovers concealed passages leading toward treasure rooms beneath the mountain.',
    },
  ),
];

export const raventreBookquesttsStories: RaventreBookquesttsStory[] =
  raventreBookquesttsStoriesBase.map(raventreBookquesttsStory => ({
    ...raventreBookquesttsStory,
    raventreBookquesttsImage:
      raventreBookquesttsStoryImages[raventreBookquesttsStory.raventreBookquesttsId],
  }));

export const raventreBookquesttsRegionOrder: RaventreBookquesttsRegion[] = [
  'Greece',
  'Egypt',
  'India',
  'Aztecs',
];

export const raventreBookquesttsGetStoryById = (
  raventreBookquesttsId: string,
) =>
  raventreBookquesttsStories.find(
    s => s.raventreBookquesttsId === raventreBookquesttsId,
  );

export const raventreBookquesttsStoriesByRegion =
  raventreBookquesttsRegionOrder.map(raventreBookquesttsRegion => ({
    raventreBookquesttsRegion,
    raventreBookquesttsItems: raventreBookquesttsStories.filter(
      s => s.raventreBookquesttsRegion === raventreBookquesttsRegion,
    ),
  }));
