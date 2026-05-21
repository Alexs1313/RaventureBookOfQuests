export const legendsaventurebkkCountLabel = (
  legendsaventurebkkCount: number,
  legendsaventurebkkSingular: string,
  legendsaventurebkkPlural: string,
) =>
  legendsaventurebkkCount === 1
    ? `1 ${legendsaventurebkkSingular}`
    : `${legendsaventurebkkCount} ${legendsaventurebkkPlural}`;
