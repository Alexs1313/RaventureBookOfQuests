export const ravenQuestCountLabel = (
  ravenQuestCount: number,
  ravenQuestSingular: string,
  ravenQuestPlural: string,
) =>
  ravenQuestCount === 1
    ? `1 ${ravenQuestSingular}`
    : `${ravenQuestCount} ${ravenQuestPlural}`;
