import type {ImageSourcePropType} from 'react-native';

import type {RaventreBookquesttsRegion} from './raventreBookquesttsStoriesData';

export type RaventreBookquesttsArtifact = {
  raventreBookquesttsId: string;
  raventreBookquesttsRegion: RaventreBookquesttsRegion;
  raventreBookquesttsName: string;
  raventreBookquesttsDescription: string;
  raventreBookquesttsImage: ImageSourcePropType;
  raventreBookquesttsPointsRequired: number;
};

export const raventreBookquesttsArtifacts: RaventreBookquesttsArtifact[] = [
  {
    raventreBookquesttsId: 'wings-of-ra',
    raventreBookquesttsRegion: 'Egypt',
    raventreBookquesttsName: 'Wings of Ra',
    raventreBookquesttsDescription:
      'An ancient ceremonial statue symbolizing protection and solar power. Priests believed its wings guided lost travelers through sacred desert temples.',
    raventreBookquesttsImage: require('../../assets/img/raventrebolartfcts1.png'),
    raventreBookquesttsPointsRequired: 0,
  },
  {
    raventreBookquesttsId: 'scarab-eternal-sands',
    raventreBookquesttsRegion: 'Egypt',
    raventreBookquesttsName: 'Scarab of Eternal Sands',
    raventreBookquesttsDescription:
      'A mystical scarab amulet connected to rebirth and concealed knowledge. According to legends, it revealed secret paths beneath buried ruins.',
    raventreBookquesttsImage: require('../../assets/img/raventrebolartfcts2.png'),
    raventreBookquesttsPointsRequired: 10,
  },
  {
    raventreBookquesttsId: 'circle-of-shiva',
    raventreBookquesttsRegion: 'India',
    raventreBookquesttsName: 'Circle of Shiva',
    raventreBookquesttsDescription:
      'A sacred artifact representing cosmic balance and eternal movement. Ancient dancers once performed rituals around this symbol during lunar celebrations.',
    raventreBookquesttsImage: require('../../assets/img/raventrebolartfcts3.png'),
    raventreBookquesttsPointsRequired: 0,
  },
  {
    raventreBookquesttsId: 'guardian-ganesha',
    raventreBookquesttsRegion: 'India',
    raventreBookquesttsName: 'Guardian Ganesha',
    raventreBookquesttsDescription:
      'A stone figure believed to remove obstacles from dangerous journeys. Travelers carried similar statues for wisdom and protection during long expeditions.',
    raventreBookquesttsImage: require('../../assets/img/raventrebolartfcts4.png'),
    raventreBookquesttsPointsRequired: 20,
  },
  {
    raventreBookquesttsId: 'owl-of-athena',
    raventreBookquesttsRegion: 'Greece',
    raventreBookquesttsName: 'Owl of Athena',
    raventreBookquesttsDescription:
      'A symbol of wisdom and strategy connected to the goddess Athena. Scholars believed the owl protected forgotten libraries and concealed scrolls.',
    raventreBookquesttsImage: require('../../assets/img/raventrebolartfcts5.png'),
    raventreBookquesttsPointsRequired: 0,
  },
  {
    raventreBookquesttsId: 'spartan-war-helm',
    raventreBookquesttsRegion: 'Greece',
    raventreBookquesttsName: 'Spartan War Helm',
    raventreBookquesttsDescription:
      'An ancient battle helmet inspired by legendary Greek warriors. It became a symbol of courage, discipline, and survival during great battles.',
    raventreBookquesttsImage: require('../../assets/img/raventrebolartfcts6.png'),
    raventreBookquesttsPointsRequired: 10,
  },
  {
    raventreBookquesttsId: 'sun-calendar-disc',
    raventreBookquesttsRegion: 'Aztecs',
    raventreBookquesttsName: 'Sun Calendar Disc',
    raventreBookquesttsDescription:
      'A ceremonial stone disc used to track celestial cycles and sacred rituals. Priests studied its symbols to predict important seasonal events.',
    raventreBookquesttsImage: require('../../assets/img/raventrebolartfcts7.png'),
    raventreBookquesttsPointsRequired: 0,
  },
  {
    raventreBookquesttsId: 'serpent-of-eclipse',
    raventreBookquesttsRegion: 'Aztecs',
    raventreBookquesttsName: 'Serpent of the Eclipse',
    raventreBookquesttsDescription:
      'A powerful serpent artifact connected to eclipses and divine transformation. Ancient legends described it as a guardian between the worlds of gods and mortals.',
    raventreBookquesttsImage: require('../../assets/img/raventrebolartfcts8.png'),
    raventreBookquesttsPointsRequired: 20,
  },
];

export const raventreBookquesttsIsArtifactUnlocked = (
  raventreBookquesttsArtifact: RaventreBookquesttsArtifact,
  raventreBookquesttsPoints: number,
) =>
  raventreBookquesttsPoints >= raventreBookquesttsArtifact.raventreBookquesttsPointsRequired;
