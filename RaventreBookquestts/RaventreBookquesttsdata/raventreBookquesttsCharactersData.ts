import type {ImageSourcePropType} from 'react-native';

import type {RaventreBookquesttsRegion} from './raventreBookquesttsStoriesData';

export type RaventreBookquesttsCharacter = {
  raventreBookquesttsId: string;
  raventreBookquesttsRegion: RaventreBookquesttsRegion;
  raventreBookquesttsName: string;
  raventreBookquesttsDescription: string;
  raventreBookquesttsImage: ImageSourcePropType;
  raventreBookquesttsTalesRequired: number;
};

export const raventreBookquesttsCharacters: RaventreBookquesttsCharacter[] = [
  {
    raventreBookquesttsId: 'athena',
    raventreBookquesttsRegion: 'Greece',
    raventreBookquesttsName: 'Athena',
    raventreBookquesttsDescription:
      'Greek goddess of wisdom, strategy, and heroic thinking. Ancient warriors and explorers believed Athena guided them during dangerous journeys and important decisions.',
    raventreBookquesttsImage: require('../../assets/img/raventrebolcchar1.png'),
    raventreBookquesttsTalesRequired: 0,
  },
  {
    raventreBookquesttsId: 'poseidon',
    raventreBookquesttsRegion: 'Greece',
    raventreBookquesttsName: 'Poseidon',
    raventreBookquesttsDescription:
      'Ruler of the seas and storms in Greek mythology. Sailors feared and respected Poseidon, believing he controlled the oceans and powerful waves.',
    raventreBookquesttsImage: require('../../assets/img/raventrebolcchar2.png'),
    raventreBookquesttsTalesRequired: 3,
  },
  {
    raventreBookquesttsId: 'anubis',
    raventreBookquesttsRegion: 'Egypt',
    raventreBookquesttsName: 'Anubis',
    raventreBookquesttsDescription:
      'Guardian of tombs and guide of lost souls in ancient Egyptian mythology. Anubis was believed to protect sacred chambers and safely lead spirits through the afterlife.',
    raventreBookquesttsImage: require('../../assets/img/raventrebolcchar3.png'),
    raventreBookquesttsTalesRequired: 0,
  },
  {
    raventreBookquesttsId: 'isis',
    raventreBookquesttsRegion: 'Egypt',
    raventreBookquesttsName: 'Isis',
    raventreBookquesttsDescription:
      'A powerful goddess connected to healing, wisdom, and protection. Legends describe Isis as a guardian of ancient knowledge and magical secrets.',
    raventreBookquesttsImage: require('../../assets/img/raventrebolcchar4.png'),
    raventreBookquesttsTalesRequired: 5,
  },
  {
    raventreBookquesttsId: 'shiva',
    raventreBookquesttsRegion: 'India',
    raventreBookquesttsName: 'Shiva',
    raventreBookquesttsDescription:
      'One of the most important figures in Indian mythology, symbolizing transformation and balance. Shiva is often associated with cosmic energy, meditation, and spiritual power.',
    raventreBookquesttsImage: require('../../assets/img/raventrebolcchar5.png'),
    raventreBookquesttsTalesRequired: 7,
  },
  {
    raventreBookquesttsId: 'hanuman',
    raventreBookquesttsRegion: 'India',
    raventreBookquesttsName: 'Hanuman',
    raventreBookquesttsDescription:
      'A legendary warrior known for loyalty, courage, and incredible strength. Stories describe Hanuman traveling across kingdoms to protect allies and overcome impossible challenges.',
    raventreBookquesttsImage: require('../../assets/img/raventrebolcchar6.png'),
    raventreBookquesttsTalesRequired: 0,
  },
  {
    raventreBookquesttsId: 'quetzalcoatl',
    raventreBookquesttsRegion: 'Aztecs',
    raventreBookquesttsName: 'Quetzalcoatl',
    raventreBookquesttsDescription:
      'The feathered serpent deity connected to wisdom, creation, and knowledge. Ancient stories describe Quetzalcoatl as a bringer of learning and civilization.',
    raventreBookquesttsImage: require('../../assets/img/raventrebolcchar7.png'),
    raventreBookquesttsTalesRequired: 0,
  },
  {
    raventreBookquesttsId: 'tezcatlipoca',
    raventreBookquesttsRegion: 'Aztecs',
    raventreBookquesttsName: 'Tezcatlipoca',
    raventreBookquesttsDescription:
      'A mysterious and powerful figure associated with destiny, night, and concealed truths. Legends say he could see into the hearts of warriors and rulers alike.',
    raventreBookquesttsImage: require('../../assets/img/raventrebolcchar8.png'),
    raventreBookquesttsTalesRequired: 9,
  },
];

export const raventreBookquesttsIsCharacterUnlocked = (
  raventreBookquesttsCharacter: RaventreBookquesttsCharacter,
  raventreBookquesttsTalesRead: number,
) =>
  raventreBookquesttsTalesRead >=
  raventreBookquesttsCharacter.raventreBookquesttsTalesRequired;

export const raventreBookquesttsCharacterShareMessage = (
  raventreBookquesttsCharacter: RaventreBookquesttsCharacter,
) =>
  `${raventreBookquesttsCharacter.raventreBookquesttsName} (${raventreBookquesttsCharacter.raventreBookquesttsRegion})\n\n${raventreBookquesttsCharacter.raventreBookquesttsDescription}\n\n— Raventure: Book of Quests`;
