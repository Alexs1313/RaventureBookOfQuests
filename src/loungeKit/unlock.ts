import type {
  RelicProfile,
  FigureProfile,
} from '../types';

export const relicIsAccessible = (
  relicProfile: RelicProfile,
  insightBalance: number,
) =>
  insightBalance >= relicProfile.insightsThreshold;

export const figureIsAccessible = (
  figure: FigureProfile,
  chroniclesConsumed: number,
) =>
  chroniclesConsumed >=
  figure.chroniclesThreshold;
