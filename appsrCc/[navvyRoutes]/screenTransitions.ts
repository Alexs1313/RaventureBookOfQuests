import {CardStyleInterpolators, TransitionSpecs} from '@react-navigation/stack';

export const stackScreenOptions = {
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
} as const;
