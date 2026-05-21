import type {ImageSourcePropType} from 'react-native';

export type BookqqestRegion = 'Greece' | 'Egypt' | 'India' | 'Aztecs';

export type BookqqestStoryChoice = {
  bookqqestLabel: string;
  bookqqestNext: string;
};

export type BookqqestStoryNode = {
  bookqqestAddText?: string;
  bookqqestQuestion?: string;
  bookqqestChoices?: BookqqestStoryChoice[];
  bookqqestEnding?: boolean;
};

export type BookqqestStory = {
  bookqqestId: string;
  bookqqestRegion: BookqqestRegion;
  bookqqestTitle: string;
  bookqqestDescription: string;
  bookqqestIntro: string;
  bookqqestImage: ImageSourcePropType;
  bookqqestNodes: Record<string, BookqqestStoryNode>;
};

const bookqqestStoryImages: Record<string, ImageSourcePropType> = {
  'greece-delphi': require('../../assets/img/bookqqestboloc1.png'),
  'egypt-falcon': require('../../assets/img/bookqqestboloc2.png'),
  'india-moon-river': require('../../assets/img/bookqqestboloc3.png'),
  'aztecs-red-sky': require('../../assets/img/bookqqestboloc4.png'),
  'greece-shipwreck': require('../../assets/img/bookqqestboloc5.png'),
  'egypt-obsidian-gate': require('../../assets/img/bookqqestboloc6.png'),
  'india-tiger-temple': require('../../assets/img/bookqqestboloc7.png'),
  'aztecs-underground-city': require('../../assets/img/bookqqestboloc8.png'),
  'greece-silver-harp': require('../../assets/img/bookqqestboloc9.png'),
  'egypt-moon-tomb': require('../../assets/img/bookqqestboloc10.png'),
  'india-emerald-palace': require('../../assets/img/bookqqestboloc11.png'),
  'aztecs-golden-eclipse': require('../../assets/img/bookqqestboloc12.png'),
};

type BookqqestBranch = {
  bookqqestChoice1: string;
  bookqqestBridge: string;
  bookqqestChoice2A: string;
  bookqqestChoice2B: string;
  bookqqestEndingA: string;
  bookqqestEndingB: string;
};

const bookqqestMakeStory = (
  meta: {
    bookqqestId: string;
    bookqqestRegion: BookqqestRegion;
    bookqqestTitle: string;
    bookqqestDescription: string;
    bookqqestIntro: string;
  },
  bookqqestChoice1A: string,
  bookqqestChoice1B: string,
  bookqqestBranchA: BookqqestBranch,
  bookqqestBranchB: BookqqestBranch,
): Omit<BookqqestStory, 'bookqqestImage'> => ({
  ...meta,
  bookqqestNodes: {
    start: {
      bookqqestQuestion: 'What will you do?',
      bookqqestChoices: [
        {
          bookqqestLabel: bookqqestChoice1A,
          bookqqestNext: 'a',
        },
        {
          bookqqestLabel: bookqqestChoice1B,
          bookqqestNext: 'b',
        },
      ],
    },
    a: {
      bookqqestAddText:
        bookqqestBranchA.bookqqestBridge,
      bookqqestQuestion: 'What will you do?',
      bookqqestChoices: [
        {
          bookqqestLabel:
            bookqqestBranchA.bookqqestChoice2A,
          bookqqestNext: 'a-end1',
        },
        {
          bookqqestLabel:
            bookqqestBranchA.bookqqestChoice2B,
          bookqqestNext: 'a-end2',
        },
      ],
    },
    'a-end1': {
      bookqqestAddText:
        bookqqestBranchA.bookqqestEndingA,
      bookqqestEnding: true,
    },
    'a-end2': {
      bookqqestAddText:
        bookqqestBranchA.bookqqestEndingB,
      bookqqestEnding: true,
    },
    b: {
      bookqqestAddText:
        bookqqestBranchB.bookqqestBridge,
      bookqqestQuestion: 'What will you do?',
      bookqqestChoices: [
        {
          bookqqestLabel:
            bookqqestBranchB.bookqqestChoice2A,
          bookqqestNext: 'b-end1',
        },
        {
          bookqqestLabel:
            bookqqestBranchB.bookqqestChoice2B,
          bookqqestNext: 'b-end2',
        },
      ],
    },
    'b-end1': {
      bookqqestAddText:
        bookqqestBranchB.bookqqestEndingA,
      bookqqestEnding: true,
    },
    'b-end2': {
      bookqqestAddText:
        bookqqestBranchB.bookqqestEndingB,
      bookqqestEnding: true,
    },
  },
});

const bookqqestStoriesBase: Omit<
  BookqqestStory,
  'bookqqestImage'
>[] = [
  bookqqestMakeStory(
    {
      bookqqestId: 'greece-delphi',
      bookqqestRegion: 'Greece',
      bookqqestTitle: 'The Temple Beneath Delphi',
      bookqqestDescription:
        'Discover a collapsed staircase beneath Delphi and uncover what awakens below the mountain.',
      bookqqestIntro:
        'During a violent storm near Delphi, the explorer discovers a collapsed staircase concealed beneath the ruins of an abandoned temple. Rainwater flows through cracked marble pillars while faded symbols shimmer strangely under the torchlight. Deep below the mountain, a metallic echo repeats through the darkness as if something ancient has awakened.',
    },
    'Follow the metallic sound deeper underground',
    'Examine the glowing wall symbols first',
    {
      bookqqestChoice1: '',
      bookqqestBridge:
        'The tunnel becomes narrower and colder as the explorer descends deeper into the ruins. At the end of the corridor stands a massive bronze mechanism shaped like a coiled serpent wrapped around a sealed stone gate. Fresh footprints in the dust suggest someone else entered recently.',
      bookqqestChoice2A: 'Activate the serpent mechanism',
      bookqqestChoice2B: 'Follow the mysterious footprints',
      bookqqestEndingA:
        'The serpent mechanism slowly unlocks the concealed chamber behind the gate. Inside rests a golden laurel crown once worn by a forgotten oracle, surrounded by ancient ceremonial treasures and untouched scrolls.',
      bookqqestEndingB:
        'The footprints lead to another treasure hunter trapped inside the ruins. Together, they uncover a secret archive concealed beneath Delphi before escaping the collapsing tunnels.',
    },
    {
      bookqqestChoice1: '',
      bookqqestBridge:
        'The glowing markings describe an ancient warning about “the voice beneath the mountain.” As the explorer studies the symbols more carefully, part of the wall shifts aside and reveals a concealed staircase descending into darkness.',
      bookqqestChoice2A: 'Descend the concealed staircase',
      bookqqestChoice2B: 'Ignore the warning and continue forward',
      bookqqestEndingA:
        'The staircase leads to a forgotten underground library filled with sealed scrolls, maps, and celestial charts untouched for centuries beneath the mountain.',
      bookqqestEndingB:
        'Ignoring the warning triggers an ancient floor trap. The explorer barely escapes the collapsing chamber but manages to recover a strange bronze key covered in mysterious symbols.',
    },
  ),
  bookqqestMakeStory(
    {
      bookqqestId: 'egypt-falcon',
      bookqqestRegion: 'Egypt',
      bookqqestTitle: 'The Chamber of the Sun Falcon',
      bookqqestDescription:
        'Uncover a buried chamber near the Valley of the Kings where falcon statues guard solar secrets.',
      bookqqestIntro:
        'Near the Valley of the Kings, the explorer uncovers a buried chamber concealed beneath drifting desert sands. Giant falcon statues covered in golden dust stand silently beside black stone walls carved with solar markings. A single beam of sunlight passes through the ceiling and illuminates an ancient altar at the center of the room.',
    },
    'Touch the black stone altar',
    'Search the surrounding chamber walls',
    {
      bookqqestChoice1: '',
      bookqqestBridge:
        'The chamber begins trembling softly as concealed gears move somewhere behind the walls. Slowly, secret doors open between the giant falcon statues, revealing a passage descending deeper underground.',
      bookqqestChoice2A: 'Enter the newly opened passage',
      bookqqestChoice2B: 'Stay and study the altar symbols',
      bookqqestEndingA:
        'The underground passage reveals a lost royal burial chamber filled with crystal jars, ceremonial jewelry, and treasures untouched for generations.',
      bookqqestEndingB:
        'The symbols on the altar form an ancient solar calendar predicting rare celestial events once used by Egyptian priests and astronomers.',
    },
    {
      bookqqestChoice1: '',
      bookqqestBridge:
        'Behind layers of dust, the explorer discovers painted maps showing concealed tunnels beneath the desert dunes. The drawings seem to point toward an underground route connecting several forgotten tombs.',
      bookqqestChoice2A: 'Follow the underground route',
      bookqqestChoice2B: 'Take one of the golden relics first',
      bookqqestEndingA:
        'The underground tunnels lead to a concealed library buried beneath the sands, containing preserved scrolls and astronomical records.',
      bookqqestEndingB:
        'Removing the relic activates ancient defense mechanisms. The explorer escapes through collapsing corridors while giant stone doors crash shut behind them.',
    },
  ),
  bookqqestMakeStory(
    {
      bookqqestId: 'india-moon-river',
      bookqqestRegion: 'India',
      bookqqestTitle: 'The Palace of the Moon River',
      bookqqestDescription:
        'Explore an abandoned riverside palace where lanterns glow and blue lights drift on the water.',
      bookqqestIntro:
        'Deep inside the jungle, the explorer discovers an abandoned riverside palace illuminated by silver moonlight. Soft music echoes through the trees while old lanterns suddenly begin glowing along the stone pathways. Beside the palace gates, a calm river reflects thousands of floating blue lights.',
    },
    'Enter the palace courtyard',
    'Follow the glowing riverbank',
    {
      bookqqestChoice1: '',
      bookqqestBridge:
        'Inside the palace stands a massive mirror decorated with sapphire patterns and ancient carvings. The surface reflects the room strangely, almost as if another concealed chamber exists beyond the glass.',
      bookqqestChoice2A: 'Touch the mirror',
      bookqqestChoice2B: 'Read the carved writings carefully',
      bookqqestEndingA:
        'The mirror slowly reveals a concealed ceremonial chamber containing royal masks, silver instruments, and forgotten treasures from the river kingdom.',
      bookqqestEndingB:
        'The writings uncover the story of a queen who protected the sacred river and disappeared during a legendary lunar eclipse.',
    },
    {
      bookqqestChoice1: '',
      bookqqestBridge:
        'The explorer discovers concealed wooden boats tied beneath hanging gardens filled with glowing blue flowers. Fireflies drift through the air while waterfalls echo somewhere deeper within the jungle.',
      bookqqestChoice2A: 'Take a boat downstream',
      bookqqestChoice2B: 'Explore the hanging gardens first',
      bookqqestEndingA:
        'The river leads toward a submerged temple concealed behind giant waterfalls, where ancient statues rise from the water beneath the moonlight.',
      bookqqestEndingB:
        'Inside the gardens, the explorer discovers rare glowing flowers once used in royal ceremonies and sacred rituals.',
    },
  ),
  bookqqestMakeStory(
    {
      bookqqestId: 'aztecs-red-sky',
      bookqqestRegion: 'Aztecs',
      bookqqestTitle: 'The Pyramid of the Red Sky',
      bookqqestDescription:
        'Climb an Aztec pyramid as the sky turns crimson and ancient drums echo through the ruins.',
      bookqqestIntro:
        'As sunset covers the jungle, the explorer climbs an enormous Aztec pyramid rising above the trees. Suddenly, the sky turns deep crimson while distant drums echo across the ancient city ruins. Without warning, part of the stone staircase begins shifting slowly beneath the explorer’s feet.',
    },
    'Continue climbing toward the summit',
    'Enter a side chamber below the pyramid',
    {
      bookqqestChoice1: '',
      bookqqestBridge:
        'At the top of the pyramid stands a giant calendar stone glowing with fiery symbols. Warm wind circles the summit while the symbols pulse brighter as darkness approaches.',
      bookqqestChoice2A: 'Rotate the calendar stone',
      bookqqestChoice2B: 'Study the glowing symbols first',
      bookqqestEndingA:
        'Rotating the stone opens a concealed observatory above the clouds, revealing ancient instruments used to study the stars.',
      bookqqestEndingB:
        'The glowing symbols reveal a forgotten prophecy describing a celestial event feared by the ancient priests.',
    },
    {
      bookqqestChoice1: '',
      bookqqestBridge:
        'The underground chamber walls are covered with paintings of warriors carrying crystal masks through burning cities. Strange echoes travel through concealed tunnels beneath the pyramid.',
      bookqqestChoice2A: 'Take one of the crystal masks',
      bookqqestChoice2B: 'Search behind the painted walls',
      bookqqestEndingA:
        'A concealed tunnel behind the paintings leads toward underground chambers buried beneath the ancient city.',
      bookqqestEndingB:
        'The crystal mask unlocks access to a ceremonial hall guarded by enormous stone statues covered in gold markings.',
    },
  ),
  bookqqestMakeStory(
    {
      bookqqestId: 'greece-shipwreck',
      bookqqestRegion: 'Greece',
      bookqqestTitle: 'The Shipwreck of Poseidon',
      bookqqestDescription:
        'Find an ancient shipwreck inside a sea cave after a violent storm near a rocky Greek island.',
      bookqqestIntro:
        'After a violent storm near a rocky Greek island, the explorer discovers an ancient shipwreck concealed inside a sea cave. Blue reflections shimmer across the cave walls while broken marble statues lie partially submerged beneath the water. Waves crash loudly outside as cold sea air fills the darkness.',
    },
    'Explore the captain’s cabin',
    'Dive deeper into the flooded ruins',
    {
      bookqqestChoice1: '',
      bookqqestBridge:
        'Inside the ruined cabin rests an old navigation map marked with symbols of Poseidon and concealed sea routes. Beside it stands a locked silver chest covered in salt and coral.',
      bookqqestChoice2A: 'Open the silver chest',
      bookqqestChoice2B: 'Follow the map directions instead',
      bookqqestEndingA:
        'Inside the chest lies a ceremonial trident decorated with glowing blue gems once carried by ancient sea priests.',
      bookqqestEndingB:
        'The map leads to a forgotten harbor concealed between cliffs where ancient travelers once worshipped Poseidon.',
    },
    {
      bookqqestChoice1: '',
      bookqqestBridge:
        'Beneath the water, the explorer discovers underwater ruins illuminated by strange glowing fish swimming through broken columns. Ancient carvings cover the submerged walls deep inside the cave.',
      bookqqestChoice2A: 'Swim toward the glowing ruins',
      bookqqestChoice2B: 'Return later with equipment',
      bookqqestEndingA:
        'The underwater ruins reveal a concealed shrine dedicated to sailors lost at sea centuries ago.',
      bookqqestEndingB:
        'Returning during moonlight reveals secret symbols visible only when the tides rise beneath the cave entrance.',
    },
  ),
  bookqqestMakeStory(
    {
      bookqqestId: 'egypt-obsidian-gate',
      bookqqestRegion: 'Egypt',
      bookqqestTitle: 'The Obsidian Gate',
      bookqqestDescription:
        'Face a gigantic black gate buried in the desert where whispers ride the warm wind.',
      bookqqestIntro:
        'Far beyond the pyramids, the explorer discovers a gigantic black gate buried halfway beneath the desert sands. The surface reflects sunlight like dark glass while warm wind carries strange whispers through the abandoned ruins nearby. Ancient torches surround the entrance even though no one has visited the place for centuries.',
    },
    'Push the obsidian gate open',
    'Search the nearby ruins first',
    {
      bookqqestChoice1: '',
      bookqqestBridge:
        'The heavy gate slowly moves aside, revealing a staircase descending into darkness beneath the desert. As the explorer walks downward, blue torches suddenly ignite along the underground walls.',
      bookqqestChoice2A: 'Continue deeper underground',
      bookqqestChoice2B: 'Study the glowing torch symbols',
      bookqqestEndingA:
        'The underground halls contain enormous statues of forgotten desert kings surrounded by concealed ceremonial chambers.',
      bookqqestEndingB:
        'The torch symbols reveal an ancient map leading toward oasis temples buried beneath the sands.',
    },
    {
      bookqqestChoice1: '',
      bookqqestBridge:
        'Scattered among the ruins, the explorer discovers broken obsidian tablets describing a legendary “city beneath the desert.” Strange markings suggest the city may still exist underground.',
      bookqqestChoice2A: 'Reassemble the obsidian tablets',
      bookqqestChoice2B: 'Ignore them and enter the gate immediately',
      bookqqestEndingA:
        'Reassembling the tablets reveals the location of a massive underground palace concealed beneath the dunes.',
      bookqqestEndingB:
        'Entering the gate too quickly activates ancient sand traps, forcing the explorer to escape collapsing corridors deep underground.',
    },
  ),
  bookqqestMakeStory(
    {
      bookqqestId: 'india-tiger-temple',
      bookqqestRegion: 'India',
      bookqqestTitle: 'The Tiger Temple of Jaipur',
      bookqqestDescription:
        'Find an abandoned temple behind giant stone tiger statues near the deserts of Jaipur.',
      bookqqestIntro:
        'While traveling through the deserts near Jaipur, the explorer discovers an abandoned temple concealed behind giant stone tiger statues. Warm wind carries the scent of incense through the empty halls while orange lanterns flicker softly inside the ruins. Strange claw marks carved into the floor seem to lead deeper underground.',
    },
    'Follow the claw marks into the temple',
    'Climb the upper balcony overlooking the ruins',
    {
      bookqqestChoice1: '',
      bookqqestBridge:
        'The underground corridors are lined with golden tiger carvings and faded royal banners. Deep inside the chamber, the explorer discovers a circular room with a massive stone throne surrounded by burning candles.',
      bookqqestChoice2A: 'Sit on the stone throne',
      bookqqestChoice2B: 'Examine the candles and symbols first',
      bookqqestEndingA:
        'The throne activates a concealed mechanism that opens a secret treasury filled with ancient jewels and ceremonial weapons.',
      bookqqestEndingB:
        'The symbols reveal the story of a legendary tiger guardian believed to protect the kingdom during war.',
    },
    {
      bookqqestChoice1: '',
      bookqqestBridge:
        'From above, the explorer notices concealed ropes connected to giant bells hanging over the courtyard. Beyond the balcony, moonlight reveals another sealed section of the temple.',
      bookqqestChoice2A: 'Ring the ancient bells',
      bookqqestChoice2B: 'Enter the sealed section quietly',
      bookqqestEndingA:
        'The bells trigger concealed doors throughout the temple, revealing forgotten royal chambers.',
      bookqqestEndingB:
        'Inside the sealed wing, the explorer discovers murals describing an ancient tiger festival lost to history.',
    },
  ),
  bookqqestMakeStory(
    {
      bookqqestId: 'aztecs-underground-city',
      bookqqestRegion: 'Aztecs',
      bookqqestTitle: 'The City Beneath the Jungle',
      bookqqestDescription:
        'Descend into a forgotten city revealed when the jungle floor collapses beneath ancient ruins.',
      bookqqestIntro:
        'Deep within the jungle, the explorer discovers stone ruins completely covered by vines and giant trees. As thunder rolls above the forest, part of the ground collapses and reveals a staircase descending into darkness beneath the ancient city.',
    },
    'Descend into the underground city',
    'Explore the surface ruins first',
    {
      bookqqestChoice1: '',
      bookqqestBridge:
        'The concealed city contains massive halls illuminated by glowing crystals embedded in the walls. Ancient murals depict priests carrying golden discs beneath a blood-red moon.',
      bookqqestChoice2A: 'Follow the glowing crystal corridor',
      bookqqestChoice2B: 'Study the murals carefully',
      bookqqestEndingA:
        'The crystal corridor leads to a concealed chamber containing a giant golden sun disc once used in sacred ceremonies.',
      bookqqestEndingB:
        'The murals reveal the location of a forgotten ceremonial arena buried beneath the jungle.',
    },
    {
      bookqqestChoice1: '',
      bookqqestBridge:
        'Among the broken temples, the explorer discovers abandoned market streets filled with shattered pottery and stone statues. A faint drumbeat echoes somewhere deeper in the jungle.',
      bookqqestChoice2A: 'Follow the mysterious drum sounds',
      bookqqestChoice2B: 'Search inside the largest temple nearby',
      bookqqestEndingA:
        'The drum sounds lead to an underground gathering hall concealed beneath the forest floor.',
      bookqqestEndingB:
        'Inside the temple rests a giant obsidian throne decorated with symbols of ancient rulers.',
    },
  ),
  bookqqestMakeStory(
    {
      bookqqestId: 'greece-silver-harp',
      bookqqestRegion: 'Greece',
      bookqqestTitle: 'The Cave of the Silver Harp',
      bookqqestDescription:
        'Follow music echoing from sea cliffs to a cave where silver light dances on underground pools.',
      bookqqestIntro:
        'While sailing near a remote Greek island, the explorer hears music echoing from sea cliffs during the night. Following the sound leads to a concealed cave where silver reflections shimmer across underground water pools.',
    },
    'Follow the music deeper into the cave',
    'Explore the underground lake first',
    {
      bookqqestChoice1: '',
      bookqqestBridge:
        'Inside the cave stands an ancient silver harp resting beside broken marble columns. The air vibrates softly every time the explorer approaches the instrument.',
      bookqqestChoice2A: 'Play the silver harp',
      bookqqestChoice2B: 'Inspect the nearby ruins first',
      bookqqestEndingA:
        'Playing the harp reveals a concealed passage leading toward a secret temple beneath the island cliffs.',
      bookqqestEndingB:
        'The nearby ruins contain scroll fragments describing musicians who once performed for ancient kings.',
    },
    {
      bookqqestChoice1: '',
      bookqqestBridge:
        'The underground lake glows faintly blue beneath the cave ceiling. Half-submerged statues stand silently in the water beside a narrow stone bridge.',
      bookqqestChoice2A: 'Cross the stone bridge',
      bookqqestChoice2B: 'Dive beneath the water surface',
      bookqqestEndingA:
        'Across the bridge lies a concealed chamber filled with silver ceremonial masks and musical instruments.',
      bookqqestEndingB:
        'Beneath the water, the explorer discovers underwater carvings telling the story of a forgotten sea festival.',
    },
  ),
  bookqqestMakeStory(
    {
      bookqqestId: 'egypt-moon-tomb',
      bookqqestRegion: 'Egypt',
      bookqqestTitle: 'The Moon Tomb of Alexandria',
      bookqqestDescription:
        'Enter a tomb near Alexandria revealed only when the full moon lights the stone walls.',
      bookqqestIntro:
        'Near the ancient ruins of Alexandria, the explorer discovers a concealed tomb entrance revealed only during a full moon. Pale silver light reflects across the stone walls while cold air rises from beneath the underground staircase.',
    },
    'Enter the moonlit tomb immediately',
    'Search the outer ruins first',
    {
      bookqqestChoice1: '',
      bookqqestBridge:
        'The underground chambers are covered in silver-painted stars and moon symbols unlike traditional Egyptian tombs. In the center of the room stands a giant circular mirror framed with black stone.',
      bookqqestChoice2A: 'Touch the mirror surface',
      bookqqestChoice2B: 'Search behind the mirror',
      bookqqestEndingA:
        'The mirror reveals a concealed observatory used by ancient astronomers to study eclipses and constellations.',
      bookqqestEndingB:
        'Behind the mirror lies a secret chamber containing lunar maps and crystal navigation tools.',
    },
    {
      bookqqestChoice1: '',
      bookqqestBridge:
        'Among the collapsed columns, the explorer discovers broken statues carrying moon-shaped necklaces and ancient scroll cases.',
      bookqqestChoice2A: 'Open the scroll cases',
      bookqqestChoice2B:
        'Follow a concealed corridor beneath the ruins',
      bookqqestEndingA:
        'The scrolls describe a forgotten society that studied the stars beneath Alexandria centuries ago.',
      bookqqestEndingB:
        'The concealed corridor leads toward underground docks once connected to the ancient harbor.',
    },
  ),
  bookqqestMakeStory(
    {
      bookqqestId: 'india-emerald-palace',
      bookqqestRegion: 'India',
      bookqqestTitle: 'The Emerald Elephant Palace',
      bookqqestDescription:
        'Discover an abandoned palace of emerald elephant statues deep inside tropical forests.',
      bookqqestIntro:
        'Concealed deep inside tropical forests, the explorer discovers an abandoned palace decorated with giant emerald elephant statues. Rain falls softly through broken rooftops while green reflections shimmer across flooded marble floors.',
    },
    'Enter the royal throne hall',
    'Explore the flooded lower chambers',
    {
      bookqqestChoice1: '',
      bookqqestBridge:
        'At the center of the hall stands a golden throne surrounded by hanging lanterns and giant silk banners. Behind the throne, a massive carved elephant door remains tightly sealed.',
      bookqqestChoice2A: 'Attempt to open the elephant door',
      bookqqestChoice2B: 'Examine the silk banners first',
      bookqqestEndingA:
        'The elephant door opens into a concealed treasury filled with ceremonial crowns and emerald carvings.',
      bookqqestEndingB:
        'The banners reveal the forgotten story of a royal expedition lost in the jungle centuries ago.',
    },
    {
      bookqqestChoice1: '',
      bookqqestBridge:
        'The flooded corridors contain floating candles and ancient stone bridges partially submerged beneath dark water. Soft chanting echoes from somewhere below the palace.',
      bookqqestChoice2A: 'Follow the chanting sounds',
      bookqqestChoice2B: 'Search the flooded rooms carefully',
      bookqqestEndingA:
        'The chanting leads toward a concealed underground sanctuary illuminated by glowing green crystals.',
      bookqqestEndingB:
        'Inside the flooded chambers, the explorer discovers ceremonial boats once used during royal festivals.',
    },
  ),
  bookqqestMakeStory(
    {
      bookqqestId: 'aztecs-golden-eclipse',
      bookqqestRegion: 'Aztecs',
      bookqqestTitle: 'The Temple of the Golden Eclipse',
      bookqqestDescription:
        'Reach a mountain temple as a rare solar eclipse makes golden symbols glow in the darkened sky.',
      bookqqestIntro:
        'During a rare solar eclipse, the explorer arrives at a forgotten Aztec temple concealed high within the mountains. Shadows move strangely across the stone walls while giant golden symbols begin glowing beneath the darkened sky.',
    },
    'Climb toward the eclipse altar',
    'Enter the underground temple tunnels',
    {
      bookqqestChoice1: '',
      bookqqestBridge:
        'At the summit stands a massive golden disc reflecting the eclipse above the mountains. Ancient wind whistles through the ruins while concealed mechanisms begin moving beneath the stone floor.',
      bookqqestChoice2A: 'Rotate the golden disc',
      bookqqestChoice2B: 'Study the surrounding carvings first',
      bookqqestEndingA:
        'Rotating the disc reveals a concealed observatory chamber filled with celestial maps and crystal instruments.',
      bookqqestEndingB:
        'The carvings uncover an ancient prophecy connected to the return of a legendary ruler.',
    },
    {
      bookqqestChoice1: '',
      bookqqestBridge:
        'The underground tunnels contain glowing torches and giant warrior statues covered in obsidian armor. Strange echoes travel through the darkness beneath the mountain temple.',
      bookqqestChoice2A: 'Follow the echoing sounds',
      bookqqestChoice2B: 'Search behind the warrior statues',
      bookqqestEndingA:
        'The echoes lead toward a ceremonial chamber where ancient priests once observed eclipses in secret.',
      bookqqestEndingB:
        'Behind the statues, the explorer discovers concealed passages leading toward treasure rooms beneath the mountain.',
    },
  ),
];

export const bookqqestStories: BookqqestStory[] =
  bookqqestStoriesBase.map(bookqqestStory => ({
    ...bookqqestStory,
    bookqqestImage:
      bookqqestStoryImages[bookqqestStory.bookqqestId],
  }));

export const bookqqestRegionOrder: BookqqestRegion[] = [
  'Greece',
  'Egypt',
  'India',
  'Aztecs',
];

export const bookqqestGetStoryById = (
  bookqqestId: string,
) =>
  bookqqestStories.find(
    s => s.bookqqestId === bookqqestId,
  );

export const bookqqestStoriesByRegion =
  bookqqestRegionOrder.map(bookqqestRegion => ({
    bookqqestRegion,
    bookqqestItems: bookqqestStories.filter(
      s => s.bookqqestRegion === bookqqestRegion,
    ),
  }));
