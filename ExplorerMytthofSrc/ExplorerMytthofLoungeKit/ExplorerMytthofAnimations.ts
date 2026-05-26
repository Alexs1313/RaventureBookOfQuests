import {Easing} from 'react-native';

export const animationDurations = {
  fast: 200,
  normal: 350,
  slow: 500,
} as const;

export const animationDelays = {
  stagger: 70,
  short: 40,
} as const;

export const animationEasing = {
  out: Easing.out(Easing.cubic),
  inOut: Easing.inOut(Easing.cubic),
} as const;

export const staggerDelay = (index: number, step = animationDelays.stagger) =>
  index * step;
