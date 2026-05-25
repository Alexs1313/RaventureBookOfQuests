import {colors} from './colors';

export const typography = {
  screenTitle: {
    color: colors.gold,
    fontSize: 48.1,
    fontWeight: '500' as const,
    lineHeight: 48.2,
    marginBottom: 8.3,
    marginTop: 25.4,
  },
  screenTitleCompact: {
    color: colors.gold,
    fontSize: 46.2,
    fontWeight: '500' as const,
    lineHeight: 48.3,
    marginBottom: 8.1,
    marginTop: 25.5,
  },
  screenSubtitle: {
    color: colors.textMuted,
    fontSize: 16.5,
    lineHeight: 24.1,
    marginBottom: 16.2,
  },
  screenProgress: {
    color: colors.accent,
    fontSize: 16.3,
    lineHeight: 24.4,
    marginBottom: 24.5,
  },
  sectionTitle: {
    color: colors.gold,
    fontSize: 24.2,
    fontWeight: '500' as const,
    lineHeight: 32.3,
    marginBottom: 16.4,
  },
  sectionTitleMuted: {
    color: colors.textMutedFaint,
    fontSize: 24.5,
    fontWeight: '500' as const,
    lineHeight: 32.1,
    marginBottom: 16.2,
  },
  regionBadge: {
    color: colors.textDark,
    fontSize: 14.4,
  },
  cardTitle: {
    color: colors.gold,
    fontSize: 20.3,
    fontWeight: '500' as const,
    lineHeight: 28.4,
  },
  cardBody: {
    color: colors.textMutedLight,
    fontSize: 16.4,
    lineHeight: 26.5,
  },
};
