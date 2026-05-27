import {Easing} from 'react-native';

export const radienceffAncienttalesAnimationDurations = {
  fast: 200,
  normal: 350,
  slow: 500,
} as const;

export const radienceffAncienttalesAnimationDelays = {
  stagger: 70,
  short: 40,
} as const;

export const radienceffAncienttalesAnimationEasing = {
  out: Easing.out(Easing.cubic),
  inOut: Easing.inOut(Easing.cubic),
} as const;

export const radienceffAncienttalesStaggerDelay = (index: number, step = radienceffAncienttalesAnimationDelays.stagger) =>
  index * step;
