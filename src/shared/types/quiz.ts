import type {ImageSourcePropType} from 'react-native';

export type RavenQuestQuizQuestion = {
  ravenQuestId: string;
  ravenQuestQuestion: string;
  ravenQuestOptions: string[];
  ravenQuestCorrect: string;
  ravenQuestImage: ImageSourcePropType;
};
