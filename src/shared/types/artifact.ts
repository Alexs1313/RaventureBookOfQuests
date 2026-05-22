import type {ImageSourcePropType} from 'react-native';

import type {RavenQuestRegion} from './story';

export type RavenQuestArtifact = {
  ravenQuestId: string;
  ravenQuestRegion: RavenQuestRegion;
  ravenQuestName: string;
  ravenQuestDescription: string;
  ravenQuestImage: ImageSourcePropType;
  ravenQuestPointsRequired: number;
};
