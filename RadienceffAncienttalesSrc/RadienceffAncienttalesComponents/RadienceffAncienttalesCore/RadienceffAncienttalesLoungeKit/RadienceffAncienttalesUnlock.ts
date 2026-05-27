import type {
  RadienceffAncienttalesRelicProfile,
  RadienceffAncienttalesFigureProfile,
} from '../RadienceffAncienttalesTypes';

export const radienceffAncienttalesRelicIsAccessible = (
  relicProfile: RadienceffAncienttalesRelicProfile,
  insightBalance: number,
) =>
  insightBalance >= relicProfile.insightsThreshold;

export const radienceffAncienttalesFigureIsAccessible = (
  figure: RadienceffAncienttalesFigureProfile,
  chroniclesConsumed: number,
) =>
  chroniclesConsumed >=
  figure.chroniclesThreshold;
