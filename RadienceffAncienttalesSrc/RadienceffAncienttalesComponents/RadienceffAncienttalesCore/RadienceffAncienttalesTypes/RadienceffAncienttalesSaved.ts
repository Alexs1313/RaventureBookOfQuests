export type RadienceffAncienttalesBookmarkPayload = {
  entryKey: string;
  passageTrail: string[];
  storedAt: number;
};

export type RadienceffAncienttalesBookmarkDisplay = RadienceffAncienttalesBookmarkPayload & {
  headline: string;
  localeTag: string;
  coverVisual: import('react-native').ImageSourcePropType;
};
