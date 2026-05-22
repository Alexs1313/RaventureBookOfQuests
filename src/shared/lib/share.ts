import type {RavenQuestCharacter} from '../types';

const ravenQuestAppName = 'Raventure: Book of Quests';

export const ravenQuestPreviewText = (
  ravenQuestHistory: string[],
  ravenQuestMax = 120,
) => {
  const ravenQuestText =
    ravenQuestHistory[ravenQuestHistory.length - 1] ?? '';
  if (ravenQuestText.length <= ravenQuestMax) {
    return ravenQuestText;
  }
  return `${ravenQuestText.slice(0, ravenQuestMax).trim()}...`;
};

export const ravenQuestShareMessage = (
  ravenQuestTitle: string,
  ravenQuestHistory: string[],
) =>
  `${ravenQuestTitle}\n\n${ravenQuestHistory.join('\n\n')}\n\n— ${ravenQuestAppName}`;

export const ravenQuestCharacterShareMessage = (
  ravenQuestCharacter: RavenQuestCharacter,
) =>
  `${ravenQuestCharacter.ravenQuestName} (${ravenQuestCharacter.ravenQuestRegion})\n\n${ravenQuestCharacter.ravenQuestDescription}\n\n— ${ravenQuestAppName}`;
