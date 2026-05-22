import type {RavenQuestCharacter} from '../../src/shared/types';

export const ravenQuestCharacters: RavenQuestCharacter[] = [
  {
    ravenQuestId: 'athena',
    ravenQuestRegion: 'Greece',
    ravenQuestName: 'Athena',
    ravenQuestDescription:
      'Greek goddess of wisdom, strategy, and heroic thinking. Ancient warriors and explorers believed Athena guided them during dangerous journeys and important decisions.',
    ravenQuestImage: require('../../assets/imgs/characters/athena.png'),
    ravenQuestTalesRequired: 0,
  },
  {
    ravenQuestId: 'poseidon',
    ravenQuestRegion: 'Greece',
    ravenQuestName: 'Poseidon',
    ravenQuestDescription:
      'Ruler of the seas and storms in Greek mythology. Sailors feared and respected Poseidon, believing he controlled the oceans and powerful waves.',
    ravenQuestImage: require('../../assets/imgs/characters/poseidon.png'),
    ravenQuestTalesRequired: 3,
  },
  {
    ravenQuestId: 'anubis',
    ravenQuestRegion: 'Egypt',
    ravenQuestName: 'Anubis',
    ravenQuestDescription:
      'Guardian of tombs and guide of lost souls in ancient Egyptian mythology. Anubis was believed to protect sacred chambers and safely lead spirits through the afterlife.',
    ravenQuestImage: require('../../assets/imgs/characters/anubis.png'),
    ravenQuestTalesRequired: 0,
  },
  {
    ravenQuestId: 'isis',
    ravenQuestRegion: 'Egypt',
    ravenQuestName: 'Isis',
    ravenQuestDescription:
      'A powerful goddess connected to healing, wisdom, and protection. Legends describe Isis as a guardian of ancient knowledge and sacred lore.',
    ravenQuestImage: require('../../assets/imgs/characters/isis.png'),
    ravenQuestTalesRequired: 5,
  },
  {
    ravenQuestId: 'shiva',
    ravenQuestRegion: 'India',
    ravenQuestName: 'Shiva',
    ravenQuestDescription:
      'One of the most important figures in Indian mythology, symbolizing transformation and balance. Shiva is often associated with cosmic energy, meditation, and spiritual power.',
    ravenQuestImage: require('../../assets/imgs/characters/shiva.png'),
    ravenQuestTalesRequired: 7,
  },
  {
    ravenQuestId: 'hanuman',
    ravenQuestRegion: 'India',
    ravenQuestName: 'Hanuman',
    ravenQuestDescription:
      'A legendary warrior known for loyalty, courage, and incredible strength. Stories describe Hanuman traveling across kingdoms to protect allies and overcome impossible challenges.',
    ravenQuestImage: require('../../assets/imgs/characters/hanuman.png'),
    ravenQuestTalesRequired: 0,
  },
  {
    ravenQuestId: 'quetzalcoatl',
    ravenQuestRegion: 'Aztecs',
    ravenQuestName: 'Quetzalcoatl',
    ravenQuestDescription:
      'The feathered serpent deity connected to wisdom, creation, and knowledge. Ancient stories describe Quetzalcoatl as a bringer of learning and civilization.',
    ravenQuestImage: require('../../assets/imgs/characters/quetzalcoatl.png'),
    ravenQuestTalesRequired: 0,
  },
  {
    ravenQuestId: 'tezcatlipoca',
    ravenQuestRegion: 'Aztecs',
    ravenQuestName: 'Tezcatlipoca',
    ravenQuestDescription:
      'A mysterious and powerful figure associated with destiny, night, and unspoken truths. Legends say he could see into the hearts of warriors and rulers alike.',
    ravenQuestImage: require('../../assets/imgs/characters/tezcatlipoca.png'),
    ravenQuestTalesRequired: 9,
  },
];
