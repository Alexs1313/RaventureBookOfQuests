export const radienceffAncienttalesSeededReorder = <T>(poolItems: T[]): T[] => {
  const poolCopy = [...poolItems];
  let mixSeed = Date.now();

  const rollUnit = () => {
    mixSeed = (mixSeed * 1103515245 + 12345) & 0x7fffffff;
    return mixSeed / 0x7fffffff;
  };

  for (let cursorIndex = poolCopy.length - 1; cursorIndex > 0; cursorIndex -= 1) {
    const pickIndex = Math.floor(rollUnit() * (cursorIndex + 1));
    [poolCopy[cursorIndex], poolCopy[pickIndex]] = [
      poolCopy[pickIndex],
      poolCopy[cursorIndex],
    ];
  }

  return poolCopy;
};
