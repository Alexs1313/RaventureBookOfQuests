import type {
  RavenQuestArtifact,
  RavenQuestCharacter,
} from '../types';

export const ravenQuestIsArtifactUnlocked = (
  ravenQuestArtifact: RavenQuestArtifact,
  ravenQuestPoints: number,
) =>
  ravenQuestPoints >=
  ravenQuestArtifact.ravenQuestPointsRequired;

export const ravenQuestIsCharacterUnlocked = (
  ravenQuestCharacter: RavenQuestCharacter,
  ravenQuestTalesRead: number,
) =>
  ravenQuestTalesRead >=
  ravenQuestCharacter.ravenQuestTalesRequired;
