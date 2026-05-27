import type {ImageSourcePropType} from 'react-native';

export type RadienceffAncienttalesMythLocale =
  | 'Greece'
  | 'Egypt'
  | 'India'
  | 'Aztecs';

export type RadienceffAncienttalesBranchOption = {
  optionCaption: string;
  onwardKey: string;
};

export type RadienceffAncienttalesPassageNode = {
  insertedPassage?: string;
  promptStem?: string;
  branchOptions?: RadienceffAncienttalesBranchOption[];
  closesPassage?: boolean;
};

export type RadienceffAncienttalesChronicleEntry = {
  entryKey: string;
  localeTag: RadienceffAncienttalesMythLocale;
  headline: string;
  synopsis: string;
  openingPassage: string;
  coverVisual: ImageSourcePropType;
  passageMap: Record<string, RadienceffAncienttalesPassageNode>;
};

export type RadienceffAncienttalesBranchScript = {
  forkCaption: string;
  interludePassage: string;
  secondForkA: string;
  secondForkB: string;
  finalePassageA: string;
  finalePassageB: string;
};
