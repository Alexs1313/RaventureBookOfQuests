export type BookmarkPayload = {
  entryKey: string;
  passageTrail: string[];
  storedAt: number;
};

export type BookmarkDisplay = BookmarkPayload & {
  headline: string;
  localeTag: string;
  coverVisual: import('react-native').ImageSourcePropType;
};
