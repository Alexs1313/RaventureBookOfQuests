import type {ImageSourcePropType} from 'react-native';

import type {BookqqestRegion} from './bookqqestStoriesData';

export type BookqqestArtifact = {
  bookqqestId: string;
  bookqqestRegion: BookqqestRegion;
  bookqqestName: string;
  bookqqestDescription: string;
  bookqqestImage: ImageSourcePropType;
  bookqqestPointsRequired: number;
};

export const bookqqestArtifacts: BookqqestArtifact[] = [
  {
    bookqqestId: 'wings-of-ra',
    bookqqestRegion: 'Egypt',
    bookqqestName: 'Wings of Ra',
    bookqqestDescription:
      'An ancient ceremonial statue symbolizing protection and solar power. Priests believed its wings guided lost travelers through sacred desert temples.',
    bookqqestImage: require('../../assets/img/bookqqestbolartfcts1.png'),
    bookqqestPointsRequired: 0,
  },
  {
    bookqqestId: 'scarab-eternal-sands',
    bookqqestRegion: 'Egypt',
    bookqqestName: 'Scarab of Eternal Sands',
    bookqqestDescription:
      'A mystical scarab amulet connected to rebirth and concealed knowledge. According to legends, it revealed secret paths beneath buried ruins.',
    bookqqestImage: require('../../assets/img/bookqqestbolartfcts2.png'),
    bookqqestPointsRequired: 10,
  },
  {
    bookqqestId: 'circle-of-shiva',
    bookqqestRegion: 'India',
    bookqqestName: 'Circle of Shiva',
    bookqqestDescription:
      'A sacred artifact representing cosmic balance and eternal movement. Ancient dancers once performed rituals around this symbol during lunar celebrations.',
    bookqqestImage: require('../../assets/img/bookqqestbolartfcts3.png'),
    bookqqestPointsRequired: 0,
  },
  {
    bookqqestId: 'guardian-ganesha',
    bookqqestRegion: 'India',
    bookqqestName: 'Guardian Ganesha',
    bookqqestDescription:
      'A stone figure believed to remove obstacles from dangerous journeys. Travelers carried similar statues for wisdom and protection during long expeditions.',
    bookqqestImage: require('../../assets/img/bookqqestbolartfcts4.png'),
    bookqqestPointsRequired: 20,
  },
  {
    bookqqestId: 'owl-of-athena',
    bookqqestRegion: 'Greece',
    bookqqestName: 'Owl of Athena',
    bookqqestDescription:
      'A symbol of wisdom and strategy connected to the goddess Athena. Scholars believed the owl protected forgotten libraries and concealed scrolls.',
    bookqqestImage: require('../../assets/img/bookqqestbolartfcts5.png'),
    bookqqestPointsRequired: 0,
  },
  {
    bookqqestId: 'spartan-war-helm',
    bookqqestRegion: 'Greece',
    bookqqestName: 'Spartan War Helm',
    bookqqestDescription:
      'An ancient battle helmet inspired by legendary Greek warriors. It became a symbol of courage, discipline, and survival during great battles.',
    bookqqestImage: require('../../assets/img/bookqqestbolartfcts6.png'),
    bookqqestPointsRequired: 10,
  },
  {
    bookqqestId: 'sun-calendar-disc',
    bookqqestRegion: 'Aztecs',
    bookqqestName: 'Sun Calendar Disc',
    bookqqestDescription:
      'A ceremonial stone disc used to track celestial cycles and sacred rituals. Priests studied its symbols to predict important seasonal events.',
    bookqqestImage: require('../../assets/img/bookqqestbolartfcts7.png'),
    bookqqestPointsRequired: 0,
  },
  {
    bookqqestId: 'serpent-of-eclipse',
    bookqqestRegion: 'Aztecs',
    bookqqestName: 'Serpent of the Eclipse',
    bookqqestDescription:
      'A powerful serpent artifact connected to eclipses and divine transformation. Ancient legends described it as a guardian between the worlds of gods and mortals.',
    bookqqestImage: require('../../assets/img/bookqqestbolartfcts8.png'),
    bookqqestPointsRequired: 20,
  },
];

export const bookqqestIsArtifactUnlocked = (
  bookqqestArtifact: BookqqestArtifact,
  bookqqestPoints: number,
) =>
  bookqqestPoints >= bookqqestArtifact.bookqqestPointsRequired;
