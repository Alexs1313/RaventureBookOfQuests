import type {FigureProfile} from '../../annccTyppes';

export const figureCatalog: FigureProfile[] = [
  {
    entryKey: 'athena',
    localeTag: 'Greece',
    displayName: 'Athena',
    synopsis:
      'Greek goddess of wisdom, strategy, and heroic thinking. Ancient warriors and explorers believed Athena guided them during dangerous journeys and important decisions.',
    coverVisual: require('../../../elements/images/characters/athena.png'),
    chroniclesThreshold: 0,
  },
  {
    entryKey: 'poseidon',
    localeTag: 'Greece',
    displayName: 'Poseidon',
    synopsis:
      'Ruler of the seas and storms in Greek mythology. Sailors feared and respected Poseidon, believing he controlled the oceans and powerful waves.',
    coverVisual: require('../../../elements/images/characters/poseidon.png'),
    chroniclesThreshold: 3,
  },
  {
    entryKey: 'anubis',
    localeTag: 'Egypt',
    displayName: 'Anubis',
    synopsis:
      'Guardian of tombs and guide of lost souls in ancient Egyptian mythology. Anubis was believed to protect sacred chambers and safely lead spirits through the afterlife.',
    coverVisual: require('../../../elements/images/characters/anubis.png'),
    chroniclesThreshold: 0,
  },
  {
    entryKey: 'isis',
    localeTag: 'Egypt',
    displayName: 'Isis',
    synopsis:
      'A powerful goddess connected to healing, wisdom, and protection. Legends describe Isis as a guardian of ancient knowledge and sacred lore.',
    coverVisual: require('../../../elements/images/characters/isis.png'),
    chroniclesThreshold: 5,
  },
  {
    entryKey: 'shiva',
    localeTag: 'India',
    displayName: 'Shiva',
    synopsis:
      'One of the most important figures in Indian mythology, symbolizing transformation and balance. Shiva is often associated with cosmic energy, meditation, and spiritual power.',
    coverVisual: require('../../../elements/images/characters/shiva.png'),
    chroniclesThreshold: 7,
  },
  {
    entryKey: 'hanuman',
    localeTag: 'India',
    displayName: 'Hanuman',
    synopsis:
      'A legendary warrior known for loyalty, courage, and incredible strength. Stories describe Hanuman traveling across kingdoms to protect allies and overcome impossible challenges.',
    coverVisual: require('../../../elements/images/characters/hanuman.png'),
    chroniclesThreshold: 0,
  },
  {
    entryKey: 'quetzalcoatl',
    localeTag: 'Aztecs',
    displayName: 'Quetzalcoatl',
    synopsis:
      'The feathered serpent deity connected to wisdom, creation, and knowledge. Ancient stories describe Quetzalcoatl as a bringer of learning and civilization.',
    coverVisual: require('../../../elements/images/characters/quetzalcoatl.png'),
    chroniclesThreshold: 0,
  },
  {
    entryKey: 'tezcatlipoca',
    localeTag: 'Aztecs',
    displayName: 'Tezcatlipoca',
    synopsis:
      'A mysterious and powerful figure associated with destiny, night, and unspoken truths. Legends say he could see into the hearts of warriors and rulers alike.',
    coverVisual: require('../../../elements/images/characters/tezcatlipoca.png'),
    chroniclesThreshold: 9,
  },
];
