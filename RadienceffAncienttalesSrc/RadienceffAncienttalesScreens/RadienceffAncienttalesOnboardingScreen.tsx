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

import {RadienceffAncienttalesRoutes} from '../RadienceffAncienttalesNavigation/RadienceffAncienttalesRoutes';
import type {RadienceffAncienttalesRootStackParamList} from '../RadienceffAncienttalesNavigation/RadienceffAncienttalesTypes';
import {
  RadienceffAncienttalesAppLayout,
  RadienceffAncienttalesFadeInView,
  RadienceffAncienttalesTypewriterText,
} from '../RadienceffAncienttalesComponents';
import {radienceffAncienttalesColors, radienceffAncienttalesGradients, radienceffAncienttalesGradientAxis} from '../RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesPalette';

import {radienceffAncienttalesWelcomeFrames} from './RadienceffAncienttalesWelcomeFrames';

const frameTotal = radienceffAncienttalesWelcomeFrames.length;

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
        radienceffAncienttalesLayout.radienceffAncienttalesMarkerPip,
        markerLit && radienceffAncienttalesLayout.radienceffAncienttalesMarkerPipLit,
        {width: spanAnim},
      ]}
    />
  );
};

const RadienceffAncienttalesOnboardingScreen = () => {
  const stackNav = useNavigation<StackNavigationProp<RadienceffAncienttalesRootStackParamList>>();
  const [radienceffAncienttalesFrameIndex, setRadienceffAncienttalesFrameIndex] = useState(0);

  const activeFrame = radienceffAncienttalesWelcomeFrames[radienceffAncienttalesFrameIndex];
  const atFinalFrame = radienceffAncienttalesFrameIndex === frameTotal - 1;

  const enterMainHub = () => {
    stackNav.reset({
      index: 0,
      routes: [{name: RadienceffAncienttalesRoutes.MainTabs}],
    });
  };

  const advanceFrame = () => {
    if (atFinalFrame) {
      enterMainHub();
      return;
    }
    setRadienceffAncienttalesFrameIndex(prev => prev + 1);
  };

  return (
    <RadienceffAncienttalesAppLayout contentStyle={radienceffAncienttalesLayout.radienceffAncienttalesRootContent}>
      <RadienceffAncienttalesFadeInView
        triggerKey={radienceffAncienttalesFrameIndex}
        style={radienceffAncienttalesLayout.radienceffAncienttalesHeroPanel}>
        <ImageBackground
          source={activeFrame.backdropVisual}
          style={radienceffAncienttalesLayout.radienceffAncienttalesPanelBackdrop}
          imageStyle={radienceffAncienttalesLayout.radienceffAncienttalesPanelBackdropClip}>
          <LinearGradient
            colors={radienceffAncienttalesGradients.onboarding}
            locations={[0, 0.5, 1]}
            style={radienceffAncienttalesLayout.radienceffAncienttalesPanelVeil}
          />
          <View style={radienceffAncienttalesLayout.radienceffAncienttalesCaptionBlock}>
            <RadienceffAncienttalesTypewriterText
              text={activeFrame.headline}
              style={radienceffAncienttalesLayout.radienceffAncienttalesHeadlineText}
              triggerKey={`headline-${radienceffAncienttalesFrameIndex}`}
              charDelayMs={42}
            />
            <RadienceffAncienttalesTypewriterText
              text={activeFrame.bodyCopy}
              style={radienceffAncienttalesLayout.radienceffAncienttalesBodyCopy}
              triggerKey={`body-${radienceffAncienttalesFrameIndex}`}
              delayMs={activeFrame.headline.length * 42 + 280}
            />
          </View>
        </ImageBackground>
      </RadienceffAncienttalesFadeInView>

      <View style={radienceffAncienttalesLayout.radienceffAncienttalesMarkerRow}>
        {radienceffAncienttalesWelcomeFrames.map((_, markerIndex) => (
          <FrameMarker
            key={markerIndex}
            markerLit={markerIndex === radienceffAncienttalesFrameIndex}
          />
        ))}
      </View>

      <View style={radienceffAncienttalesLayout.radienceffAncienttalesControlStack}>
        <Pressable
          onPress={advanceFrame}
          style={({pressed}) => [
            radienceffAncienttalesLayout.radienceffAncienttalesAdvancePressable,
            pressed && radienceffAncienttalesLayout.radienceffAncienttalesPressedState,
          ]}>
          <LinearGradient
            colors={radienceffAncienttalesGradients.primaryAlt}
            start={radienceffAncienttalesGradientAxis.horizontal.start}
            end={radienceffAncienttalesGradientAxis.horizontal.end}
            style={radienceffAncienttalesLayout.radienceffAncienttalesAdvanceSurface}>
            <Text style={radienceffAncienttalesLayout.radienceffAncienttalesAdvanceLabel}>
              {atFinalFrame ? 'Continue' : 'Next'}
            </Text>
          </LinearGradient>
        </Pressable>

        {!atFinalFrame && (
          <Pressable
            onPress={enterMainHub}
            style={({pressed}) => [
              radienceffAncienttalesLayout.radienceffAncienttalesBypassSurface,
              pressed && radienceffAncienttalesLayout.radienceffAncienttalesPressedState,
            ]}>
            <Text style={radienceffAncienttalesLayout.radienceffAncienttalesBypassLabel}>
              Skip
            </Text>
          </Pressable>
        )}
      </View>
    </RadienceffAncienttalesAppLayout>
  );
};

const radienceffAncienttalesLayout = StyleSheet.create({
  radienceffAncienttalesHeroPanel: {
    borderRadius: 24.1,
    overflow: 'hidden',
    height: 470.2,
    width: '100%',
    marginTop: 20.3,
  },
  radienceffAncienttalesRootContent: {
    minHeight: '100%',
  },
  radienceffAncienttalesPanelBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  radienceffAncienttalesPanelBackdropClip: {
    borderRadius: 24.4,
  },
  radienceffAncienttalesPanelVeil: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24.5,
  },
  radienceffAncienttalesCaptionBlock: {
    paddingHorizontal: 32.1,
    paddingBottom: 32.2,
    paddingTop: 32.3,
    gap: 16.4,
  },
  radienceffAncienttalesHeadlineText: {
    color: radienceffAncienttalesColors.gold,
    fontSize: 36.5,
    fontWeight: '500',
    lineHeight: 40.1,
  },
  radienceffAncienttalesBodyCopy: {
    color: 'rgba(212, 165, 116, 0.9)',
    fontSize: 18.2,
    lineHeight: 29.3,
  },
  radienceffAncienttalesMarkerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8.4,
    marginTop: 34.5,
    marginBottom: 24.1,
  },
  radienceffAncienttalesMarkerPip: {
    height: 8.3,
    borderRadius: 4.4,
    backgroundColor: '#5A3A24',
  },
  radienceffAncienttalesMarkerPipLit: {
    backgroundColor: radienceffAncienttalesColors.accent,
  },
  radienceffAncienttalesControlStack: {
    gap: 12.1,
  },
  radienceffAncienttalesAdvancePressable: {
    borderRadius: 20.2,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4.3},
    shadowOpacity: 0.1,
    shadowRadius: 7.5,
    elevation: 4.3,
  },
  radienceffAncienttalesAdvanceSurface: {
    height: 56.4,
    borderRadius: 20.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radienceffAncienttalesAdvanceLabel: {
    color: radienceffAncienttalesColors.textDark,
    fontSize: 16.1,
    fontWeight: '500',
  },
  radienceffAncienttalesBypassSurface: {
    height: 58.2,
    borderRadius: 20.3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: radienceffAncienttalesColors.cardMedium,
    borderWidth: 1.4,
    borderColor: radienceffAncienttalesColors.border,
  },
  radienceffAncienttalesBypassLabel: {
    color: radienceffAncienttalesColors.text,
    fontSize: 16.5,
    fontWeight: '500',
  },
  radienceffAncienttalesPressedState: {
    opacity: 0.85,
  },
});

export default RadienceffAncienttalesOnboardingScreen;
