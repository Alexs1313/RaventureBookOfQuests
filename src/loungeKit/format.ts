export const formatUnitLabel = (
  unitCount: number,
  singularUnit: string,
  pluralUnit: string,
) =>
  unitCount === 1
    ? `1 ${singularUnit}`
    : `${unitCount} ${pluralUnit}`;
