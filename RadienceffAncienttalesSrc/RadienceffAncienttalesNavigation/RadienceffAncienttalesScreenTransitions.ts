import {CardStyleInterpolators, TransitionSpecs} from '@react-navigation/stack';

export const radienceffAncienttalesStackScreenOptions = {
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
} as const;
