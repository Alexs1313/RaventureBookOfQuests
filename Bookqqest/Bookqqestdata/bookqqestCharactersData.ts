import type {ImageSourcePropType} from 'react-native';

import type {BookqqestRegion} from './bookqqestStoriesData';

export type BookqqestCharacter = {
  bookqqestId: string;
  bookqqestRegion: BookqqestRegion;
  bookqqestName: string;
  bookqqestDescription: string;
  bookqqestImage: ImageSourcePropType;
  bookqqestTalesRequired: number;
};

export const bookqqestCharacters: BookqqestCharacter[] = [
  {
    bookqqestId: 'athena',
    bookqqestRegion: 'Greece',
    bookqqestName: 'Athena',
    bookqqestDescription:
      'Greek goddess of wisdom, strategy, and heroic thinking. Ancient warriors and explorers believed Athena guided them during dangerous journeys and important decisions.',
    bookqqestImage: require('../../assets/img/bookqqestbolcchar1.png'),
    bookqqestTalesRequired: 0,
  },
  {
    bookqqestId: 'poseidon',
    bookqqestRegion: 'Greece',
    bookqqestName: 'Poseidon',
    bookqqestDescription:
      'Ruler of the seas and storms in Greek mythology. Sailors feared and respected Poseidon, believing he controlled the oceans and powerful waves.',
    bookqqestImage: require('../../assets/img/bookqqestbolcchar2.png'),
    bookqqestTalesRequired: 3,
  },
  {
    bookqqestId: 'anubis',
    bookqqestRegion: 'Egypt',
    bookqqestName: 'Anubis',
    bookqqestDescription:
      'Guardian of tombs and guide of lost souls in ancient Egyptian mythology. Anubis was believed to protect sacred chambers and safely lead spirits through the afterlife.',
    bookqqestImage: require('../../assets/img/bookqqestbolcchar3.png'),
    bookqqestTalesRequired: 0,
  },
  {
    bookqqestId: 'isis',
    bookqqestRegion: 'Egypt',
    bookqqestName: 'Isis',
    bookqqestDescription:
      'A powerful goddess connected to healing, wisdom, and protection. Legends describe Isis as a guardian of ancient knowledge and magical secrets.',
    bookqqestImage: require('../../assets/img/bookqqestbolcchar4.png'),
    bookqqestTalesRequired: 5,
  },
  {
    bookqqestId: 'shiva',
    bookqqestRegion: 'India',
    bookqqestName: 'Shiva',
    bookqqestDescription:
      'One of the most important figures in Indian mythology, symbolizing transformation and balance. Shiva is often associated with cosmic energy, meditation, and spiritual power.',
    bookqqestImage: require('../../assets/img/bookqqestbolcchar5.png'),
    bookqqestTalesRequired: 7,
  },
  {
    bookqqestId: 'hanuman',
    bookqqestRegion: 'India',
    bookqqestName: 'Hanuman',
    bookqqestDescription:
      'A legendary warrior known for loyalty, courage, and incredible strength. Stories describe Hanuman traveling across kingdoms to protect allies and overcome impossible challenges.',
    bookqqestImage: require('../../assets/img/bookqqestbolcchar6.png'),
    bookqqestTalesRequired: 0,
  },
  {
    bookqqestId: 'quetzalcoatl',
    bookqqestRegion: 'Aztecs',
    bookqqestName: 'Quetzalcoatl',
    bookqqestDescription:
      'The feathered serpent deity connected to wisdom, creation, and knowledge. Ancient stories describe Quetzalcoatl as a bringer of learning and civilization.',
    bookqqestImage: require('../../assets/img/bookqqestbolcchar7.png'),
    bookqqestTalesRequired: 0,
  },
  {
    bookqqestId: 'tezcatlipoca',
    bookqqestRegion: 'Aztecs',
    bookqqestName: 'Tezcatlipoca',
    bookqqestDescription:
      'A mysterious and powerful figure associated with destiny, night, and concealed truths. Legends say he could see into the hearts of warriors and rulers alike.',
    bookqqestImage: require('../../assets/img/bookqqestbolcchar8.png'),
    bookqqestTalesRequired: 9,
  },
];

export const bookqqestIsCharacterUnlocked = (
  bookqqestCharacter: BookqqestCharacter,
  bookqqestTalesRead: number,
) =>
  bookqqestTalesRead >=
  bookqqestCharacter.bookqqestTalesRequired;

export const bookqqestCharacterShareMessage = (
  bookqqestCharacter: BookqqestCharacter,
) =>
  `${bookqqestCharacter.bookqqestName} (${bookqqestCharacter.bookqqestRegion})\n\n${bookqqestCharacter.bookqqestDescription}\n\n— Raventure: Book of Quests`;
