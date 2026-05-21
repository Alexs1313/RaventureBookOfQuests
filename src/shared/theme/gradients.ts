import {colors} from './colors';

export const gradients = {
  primary: [colors.accent, colors.accentLight],
  primaryAlt: [colors.accent, colors.accentAlt],
  danger: [colors.danger, 'rgba(139,26,26,0.8)'],
  storyCard: ['rgba(0,0,0,0)', 'rgba(23,11,6,0.71)', 'rgba(42,24,16,1)'],
  storyHero: ['rgba(0,0,0,0)', 'rgba(32,17,11,0.86)', 'rgba(42,24,16,1)'],
  savedCard: ['rgba(0,0,0,0)', 'rgba(32,17,11,0.86)', 'rgba(42,24,16,1)'],
  onboarding: ['rgba(0, 0, 0, 0)', 'rgba(42, 24, 16, 0.6)', '#1A0F0A'],
};

export const gradientAxis = {
  horizontal: {start: {x: 0, y: 0.5}, end: {x: 1, y: 0.5}},
} as const;
