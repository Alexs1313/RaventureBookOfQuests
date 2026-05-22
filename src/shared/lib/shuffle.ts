export const ravenQuestShuffle = <T>(
  ravenQuestItems: T[],
): T[] => {
  const ravenQuestCopy = [...ravenQuestItems];
  let ravenQuestSeed = Date.now();

  const ravenQuestNext = () => {
    ravenQuestSeed =
      (ravenQuestSeed * 1103515245 + 12345) & 0x7fffffff;
    return ravenQuestSeed / 0x7fffffff;
  };

  for (
    let ravenQuestIndex = ravenQuestCopy.length - 1;
    ravenQuestIndex > 0;
    ravenQuestIndex -= 1
  ) {
    const ravenQuestSwapIndex = Math.floor(
      ravenQuestNext() * (ravenQuestIndex + 1),
    );
    [
      ravenQuestCopy[ravenQuestIndex],
      ravenQuestCopy[ravenQuestSwapIndex],
    ] = [
      ravenQuestCopy[ravenQuestSwapIndex],
      ravenQuestCopy[ravenQuestIndex],
    ];
  }

  return ravenQuestCopy;
};
