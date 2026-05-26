import type {RelicProfile} from '../../ExplorerMytthofTypes';

export const relicCatalog: RelicProfile[] = [
  {
    entryKey: 'relic-01',
    localeTag: 'Egypt',
    displayName: 'Solar Guardian Wings',
    synopsis:
      'An ancient ceremonial statue symbolizing protection and solar power. Priests believed its wings guided lost travelers through sacred desert temples.',
    coverVisual: require('../../../elements/images/artifacts/solarGuardianWings.png'),
    insightsThreshold: 0,
  },
  {
    entryKey: 'relic-02',
    localeTag: 'Egypt',
    displayName: 'Scarab of Eternal Sands',
    synopsis:
      'A mystical scarab amulet connected to rebirth and ancient knowledge. According to legends, it revealed forgotten paths beneath buried ruins.',
    coverVisual: require('../../../elements/images/artifacts/scarabEternalSands.png'),
    insightsThreshold: 10,
  },
  {
    entryKey: 'relic-03',
    localeTag: 'India',
    displayName: 'Circle of Shiva',
    synopsis:
      'A sacred artifact representing cosmic balance and eternal movement. Ancient dancers once performed rituals around this symbol during lunar celebrations.',
    coverVisual: require('../../../elements/images/artifacts/circleOfShiva.png'),
    insightsThreshold: 0,
  },
  {
    entryKey: 'relic-04',
    localeTag: 'India',
    displayName: 'Guardian Ganesha',
    synopsis:
      'A stone figure believed to remove obstacles from dangerous journeys. Travelers carried similar statues for wisdom and protection during long expeditions.',
    coverVisual: require('../../../elements/images/artifacts/guardianGanesha.png'),
    insightsThreshold: 20,
  },
  {
    entryKey: 'relic-05',
    localeTag: 'Greece',
    displayName: 'Owl of Athena',
    synopsis:
      'A symbol of wisdom and strategy connected to the goddess Athena. Scholars believed the owl protected forgotten libraries and buried scrolls.',
    coverVisual: require('../../../elements/images/artifacts/owlOfAthena.png'),
    insightsThreshold: 0,
  },
  {
    entryKey: 'relic-06',
    localeTag: 'Greece',
    displayName: 'Spartan War Helm',
    synopsis:
      'An ancient battle helmet inspired by legendary Greek warriors. It became a symbol of courage, discipline, and survival during great battles.',
    coverVisual: require('../../../elements/images/artifacts/spartanWarHelm.png'),
    insightsThreshold: 10,
  },
  {
    entryKey: 'relic-07',
    localeTag: 'Aztecs',
    displayName: 'Sun Calendar Disc',
    synopsis:
      'A ceremonial stone disc used to track celestial cycles and sacred rituals. Priests studied its symbols to predict important seasonal events.',
    coverVisual: require('../../../elements/images/artifacts/sunCalendarDisc.png'),
    insightsThreshold: 0,
  },
  {
    entryKey: 'relic-08',
    localeTag: 'Aztecs',
    displayName: 'Serpent of the Eclipse',
    synopsis:
      'A powerful serpent artifact connected to eclipses and divine transformation. Ancient legends described it as a guardian between the worlds of gods and mortals.',
    coverVisual: require('../../../elements/images/artifacts/serpentOfEclipse.png'),
    insightsThreshold: 20,
  },
];
