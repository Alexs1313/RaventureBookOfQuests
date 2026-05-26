import type {ImageSourcePropType} from 'react-native';

export type MythLocale =
  | 'Greece'
  | 'Egypt'
  | 'India'
  | 'Aztecs';

export type BranchOption = {
  optionCaption: string;
  onwardKey: string;
};

export type PassageNode = {
  insertedPassage?: string;
  promptStem?: string;
  branchOptions?: BranchOption[];
  closesPassage?: boolean;
};

export type ChronicleEntry = {
  entryKey: string;
  localeTag: MythLocale;
  headline: string;
  synopsis: string;
  openingPassage: string;
  coverVisual: ImageSourcePropType;
  passageMap: Record<string, PassageNode>;
};

export type BranchScript = {
  forkCaption: string;
  interludePassage: string;
  secondForkA: string;
  secondForkB: string;
  finalePassageA: string;
  finalePassageB: string;
};
