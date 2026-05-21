export const legendsaventurebkkShuffle = <T>(
  legendsaventurebkkItems: T[],
): T[] => {
  const legendsaventurebkkCopy = [...legendsaventurebkkItems];
  let legendsaventurebkkSeed = Date.now();

  const legendsaventurebkkNext = () => {
    legendsaventurebkkSeed =
      (legendsaventurebkkSeed * 1103515245 + 12345) & 0x7fffffff;
    return legendsaventurebkkSeed / 0x7fffffff;
  };

  for (
    let legendsaventurebkkIndex = legendsaventurebkkCopy.length - 1;
    legendsaventurebkkIndex > 0;
    legendsaventurebkkIndex -= 1
  ) {
    const legendsaventurebkkSwapIndex = Math.floor(
      legendsaventurebkkNext() * (legendsaventurebkkIndex + 1),
    );
    [
      legendsaventurebkkCopy[legendsaventurebkkIndex],
      legendsaventurebkkCopy[legendsaventurebkkSwapIndex],
    ] = [
      legendsaventurebkkCopy[legendsaventurebkkSwapIndex],
      legendsaventurebkkCopy[legendsaventurebkkIndex],
    ];
  }

  return legendsaventurebkkCopy;
};
