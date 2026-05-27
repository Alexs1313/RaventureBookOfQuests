import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {AnncintTlllsmythhhsRoutes} from './routes/AnncintTlllsmythhhsRoutes';
import type {AnncintTlllsmythhhsRootStackParamList} from './routes/AnncintTlllsmythhhsRoutes';
import {
  AnncintTlllsmythhhsAppLayout,
  AnncintTlllsmythhhsFadeInView,
  AnncintTlllsmythhhsTypewriterText,
} from './AnncintTlllsmythhhsUi';
import {anncintTlllsmythhhsGradients, anncintTlllsmythhhsGradientAxis} from './AnncintTlllsmythhhsCore';

import {anncintTlllsmythhhsWelcomeFrames} from './AnncintTlllsmythhhsCore';

const frameTotal = anncintTlllsmythhhsWelcomeFrames.length;

const FrameMarker = ({markerLit}: {markerLit: boolean}) => {
  const spanAnim = useRef(new Animated.Value(markerLit ? 32.5 : 8.2)).current;

  useEffect(() => {
    Animated.spring(spanAnim, {
      toValue: markerLit ? 32.5 : 8.2,
      useNativeDriver: false,
      speed: 16,
      bounciness: 6,
    }).start();
  }, [markerLit, spanAnim]);

  return (
    <Animated.View
      style={[
        anncintTlllsmythhhsLayout.anncintTlllsmythhhsMarkerPip,
        markerLit && anncintTlllsmythhhsLayout.anncintTlllsmythhhsMarkerPipLit,
        {width: spanAnim},
      ]}
    />
  );
};

const AnncintTlllsmythhhsOnboardingScreen = () => {
  const stackNav = useNavigation<StackNavigationProp<AnncintTlllsmythhhsRootStackParamList>>();
  const [anncintTlllsmythhhsFrameIndex, setAnncintTlllsmythhhsFrameIndex] = useState(0);

  const activeFrame = anncintTlllsmythhhsWelcomeFrames[anncintTlllsmythhhsFrameIndex];
  const atFinalFrame = anncintTlllsmythhhsFrameIndex === frameTotal - 1;

  const enterMainHub = () => {
    stackNav.reset({
      index: 0,
      routes: [{name: AnncintTlllsmythhhsRoutes.MainTabs}],
    });
  };

  const advanceFrame = () => {
    if (atFinalFrame) {
      enterMainHub();
      return;
    }
    setAnncintTlllsmythhhsFrameIndex(prev => prev + 1);
  };

  return (
    <AnncintTlllsmythhhsAppLayout contentStyle={anncintTlllsmythhhsLayout.anncintTlllsmythhhsRootContent}>
      <AnncintTlllsmythhhsFadeInView
        triggerKey={anncintTlllsmythhhsFrameIndex}
        style={anncintTlllsmythhhsLayout.anncintTlllsmythhhsHeroPanel}>
        <ImageBackground
          source={activeFrame.backdropVisual}
          style={anncintTlllsmythhhsLayout.anncintTlllsmythhhsPanelBackdrop}
          imageStyle={anncintTlllsmythhhsLayout.anncintTlllsmythhhsPanelBackdropClip}>
          <LinearGradient
            colors={anncintTlllsmythhhsGradients.onboarding}
            locations={[0, 0.5, 1]}
            style={anncintTlllsmythhhsLayout.anncintTlllsmythhhsPanelVeil}
          />
          <View style={anncintTlllsmythhhsLayout.anncintTlllsmythhhsCaptionBlock}>
            <AnncintTlllsmythhhsTypewriterText
              text={activeFrame.headline}
              style={anncintTlllsmythhhsLayout.anncintTlllsmythhhsHeadlineText}
              triggerKey={`headline-${anncintTlllsmythhhsFrameIndex}`}
              charDelayMs={42}
            />
            <AnncintTlllsmythhhsTypewriterText
              text={activeFrame.bodyCopy}
              style={anncintTlllsmythhhsLayout.anncintTlllsmythhhsBodyCopy}
              triggerKey={`body-${anncintTlllsmythhhsFrameIndex}`}
              delayMs={activeFrame.headline.length * 42 + 280}
            />
          </View>
        </ImageBackground>
      </AnncintTlllsmythhhsFadeInView>

      <View style={anncintTlllsmythhhsLayout.anncintTlllsmythhhsMarkerRow}>
        {anncintTlllsmythhhsWelcomeFrames.map((_, markerIndex) => (
          <FrameMarker
            key={markerIndex}
            markerLit={markerIndex === anncintTlllsmythhhsFrameIndex}
          />
        ))}
      </View>

      <View style={anncintTlllsmythhhsLayout.anncintTlllsmythhhsControlStack}>
        <Pressable
          onPress={advanceFrame}
          style={({pressed}) => [
            anncintTlllsmythhhsLayout.anncintTlllsmythhhsAdvancePressable,
            pressed && anncintTlllsmythhhsLayout.anncintTlllsmythhhsPressedState,
          ]}>
          <LinearGradient
            colors={anncintTlllsmythhhsGradients.primaryAlt}
            start={anncintTlllsmythhhsGradientAxis.horizontal.start}
            end={anncintTlllsmythhhsGradientAxis.horizontal.end}
            style={anncintTlllsmythhhsLayout.anncintTlllsmythhhsAdvanceSurface}>
            <Text style={anncintTlllsmythhhsLayout.anncintTlllsmythhhsAdvanceLabel}>
              {atFinalFrame ? 'Continue' : 'Next'}
            </Text>
          </LinearGradient>
        </Pressable>

        {!atFinalFrame && (
          <Pressable
            onPress={enterMainHub}
            style={({pressed}) => [
              anncintTlllsmythhhsLayout.anncintTlllsmythhhsBypassSurface,
              pressed && anncintTlllsmythhhsLayout.anncintTlllsmythhhsPressedState,
            ]}>
            <Text style={anncintTlllsmythhhsLayout.anncintTlllsmythhhsBypassLabel}>
              Skip
            </Text>
          </Pressable>
        )}
      </View>
    </AnncintTlllsmythhhsAppLayout>
  );
};

const anncintTlllsmythhhsLayout = StyleSheet.create({
  anncintTlllsmythhhsHeroPanel: {
    borderRadius: 24,
    overflow: 'hidden',
    height: 470,
    width: '100%',
    marginTop: 20,
  },
  anncintTlllsmythhhsRootContent: {
    minHeight: '100%',
  },
  anncintTlllsmythhhsPanelBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  anncintTlllsmythhhsPanelBackdropClip: {
    borderRadius: 24,
  },
  anncintTlllsmythhhsPanelVeil: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24,
  },
  anncintTlllsmythhhsCaptionBlock: {
    paddingHorizontal: 32,
    paddingBottom: 32,
    paddingTop: 32,
    gap: 16,
  },
  anncintTlllsmythhhsHeadlineText: {
    color: '#DAA520',
    fontSize: 36,
    fontWeight: '500',
    lineHeight: 40,
  },
  anncintTlllsmythhhsBodyCopy: {
    color: 'rgba(212, 165, 116, 0.9)',
    fontSize: 18,
    lineHeight: 29,
  },
  anncintTlllsmythhhsMarkerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 34,
    marginBottom: 24,
  },
  anncintTlllsmythhhsMarkerPip: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#5A3A24',
  },
  anncintTlllsmythhhsMarkerPipLit: {
    backgroundColor: '#D4763E',
  },
  anncintTlllsmythhhsControlStack: {
    gap: 12,
  },
  anncintTlllsmythhhsAdvancePressable: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 7.5,
    elevation: 4.3,
  },
  anncintTlllsmythhhsAdvanceSurface: {
    height: 56,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  anncintTlllsmythhhsAdvanceLabel: {
    color: '#0F0804',
    fontSize: 16,
    fontWeight: '500',
  },
  anncintTlllsmythhhsBypassSurface: {
    height: 58,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(90, 58, 36, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.2)',
  },
  anncintTlllsmythhhsBypassLabel: {
    color: '#D4A574',
    fontSize: 16,
    fontWeight: '500',
  },
  anncintTlllsmythhhsPressedState: {
    opacity: 0.85,
  },
});

export default AnncintTlllsmythhhsOnboardingScreen;
