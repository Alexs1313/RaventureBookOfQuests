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

import {Routes} from '../ExplorerMytthofNavigation/ExplorerMytthofRoutes';
import type {RootStackParamList} from '../ExplorerMytthofNavigation/ExplorerMytthofTypes';
import {
  AppLayout,
  FadeInView,
  TypewriterText,
} from '../ExplorerMytthofComponents';
import {colors, gradients, gradientAxis} from '../ExplorerMytthofPalette';

import {welcomeFrames} from './ExplorerMytthofWelcomeFrames';

const frameTotal = welcomeFrames.length;

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
        explorerMytthofLayout.explorerMytthofMarkerPip,
        markerLit && explorerMytthofLayout.explorerMytthofMarkerPipLit,
        {width: spanAnim},
      ]}
    />
  );
};

const OnboardingScreen = () => {
  const stackNav = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [explorerMytthofFrameIndex, setExplorerMytthofFrameIndex] = useState(0);

  const activeFrame = welcomeFrames[explorerMytthofFrameIndex];
  const atFinalFrame = explorerMytthofFrameIndex === frameTotal - 1;

  const enterMainHub = () => {
    stackNav.reset({
      index: 0,
      routes: [{name: Routes.MainTabs}],
    });
  };

  const advanceFrame = () => {
    if (atFinalFrame) {
      enterMainHub();
      return;
    }
    setExplorerMytthofFrameIndex(prev => prev + 1);
  };

  return (
    <AppLayout contentStyle={explorerMytthofLayout.explorerMytthofRootContent}>
      <FadeInView
        triggerKey={explorerMytthofFrameIndex}
        style={explorerMytthofLayout.explorerMytthofHeroPanel}>
        <ImageBackground
          source={activeFrame.backdropVisual}
          style={explorerMytthofLayout.explorerMytthofPanelBackdrop}
          imageStyle={explorerMytthofLayout.explorerMytthofPanelBackdropClip}>
          <LinearGradient
            colors={gradients.onboarding}
            locations={[0, 0.5, 1]}
            style={explorerMytthofLayout.explorerMytthofPanelVeil}
          />
          <View style={explorerMytthofLayout.explorerMytthofCaptionBlock}>
            <TypewriterText
              text={activeFrame.headline}
              style={explorerMytthofLayout.explorerMytthofHeadlineText}
              triggerKey={`headline-${explorerMytthofFrameIndex}`}
              charDelayMs={42}
            />
            <TypewriterText
              text={activeFrame.bodyCopy}
              style={explorerMytthofLayout.explorerMytthofBodyCopy}
              triggerKey={`body-${explorerMytthofFrameIndex}`}
              delayMs={activeFrame.headline.length * 42 + 280}
            />
          </View>
        </ImageBackground>
      </FadeInView>

      <View style={explorerMytthofLayout.explorerMytthofMarkerRow}>
        {welcomeFrames.map((_, markerIndex) => (
          <FrameMarker
            key={markerIndex}
            markerLit={markerIndex === explorerMytthofFrameIndex}
          />
        ))}
      </View>

      <View style={explorerMytthofLayout.explorerMytthofControlStack}>
        <Pressable
          onPress={advanceFrame}
          style={({pressed}) => [
            explorerMytthofLayout.explorerMytthofAdvancePressable,
            pressed && explorerMytthofLayout.explorerMytthofPressedState,
          ]}>
          <LinearGradient
            colors={gradients.primaryAlt}
            start={gradientAxis.horizontal.start}
            end={gradientAxis.horizontal.end}
            style={explorerMytthofLayout.explorerMytthofAdvanceSurface}>
            <Text style={explorerMytthofLayout.explorerMytthofAdvanceLabel}>
              {atFinalFrame ? 'Begin Adventure' : 'Next'}
            </Text>
          </LinearGradient>
        </Pressable>

        {!atFinalFrame && (
          <Pressable
            onPress={enterMainHub}
            style={({pressed}) => [
              explorerMytthofLayout.explorerMytthofBypassSurface,
              pressed && explorerMytthofLayout.explorerMytthofPressedState,
            ]}>
            <Text style={explorerMytthofLayout.explorerMytthofBypassLabel}>
              Skip
            </Text>
          </Pressable>
        )}
      </View>
    </AppLayout>
  );
};

const explorerMytthofLayout = StyleSheet.create({
  explorerMytthofHeroPanel: {
    borderRadius: 24.1,
    overflow: 'hidden',
    height: 470.2,
    width: '100%',
    marginTop: 20.3,
  },
  explorerMytthofRootContent: {
    minHeight: '100%',
  },
  explorerMytthofPanelBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  explorerMytthofPanelBackdropClip: {
    borderRadius: 24.4,
  },
  explorerMytthofPanelVeil: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24.5,
  },
  explorerMytthofCaptionBlock: {
    paddingHorizontal: 32.1,
    paddingBottom: 32.2,
    paddingTop: 32.3,
    gap: 16.4,
  },
  explorerMytthofHeadlineText: {
    color: colors.gold,
    fontSize: 36.5,
    fontWeight: '500',
    lineHeight: 40.1,
  },
  explorerMytthofBodyCopy: {
    color: 'rgba(212, 165, 116, 0.9)',
    fontSize: 18.2,
    lineHeight: 29.3,
  },
  explorerMytthofMarkerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8.4,
    marginTop: 34.5,
    marginBottom: 24.1,
  },
  explorerMytthofMarkerPip: {
    height: 8.3,
    borderRadius: 4.4,
    backgroundColor: '#5A3A24',
  },
  explorerMytthofMarkerPipLit: {
    backgroundColor: colors.accent,
  },
  explorerMytthofControlStack: {
    gap: 12.1,
  },
  explorerMytthofAdvancePressable: {
    borderRadius: 20.2,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4.3},
    shadowOpacity: 0.1,
    shadowRadius: 7.5,
    elevation: 4.3,
  },
  explorerMytthofAdvanceSurface: {
    height: 56.4,
    borderRadius: 20.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  explorerMytthofAdvanceLabel: {
    color: colors.textDark,
    fontSize: 16.1,
    fontWeight: '500',
  },
  explorerMytthofBypassSurface: {
    height: 58.2,
    borderRadius: 20.3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cardMedium,
    borderWidth: 1.4,
    borderColor: colors.border,
  },
  explorerMytthofBypassLabel: {
    color: colors.text,
    fontSize: 16.5,
    fontWeight: '500',
  },
  explorerMytthofPressedState: {
    opacity: 0.85,
  },
});

export default OnboardingScreen;
