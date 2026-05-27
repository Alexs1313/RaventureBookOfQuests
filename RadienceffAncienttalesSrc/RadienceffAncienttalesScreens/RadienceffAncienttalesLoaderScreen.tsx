import React, {useEffect} from 'react';
import {ImageBackground, ScrollView, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import WebView from 'react-native-webview';

import {RadienceffAncienttalesRoutes} from '../RadienceffAncienttalesNavigation/RadienceffAncienttalesRoutes';
import type {RadienceffAncienttalesRootStackParamList} from '../RadienceffAncienttalesNavigation/RadienceffAncienttalesTypes';
import {RadienceffAncienttalesFadeInView} from '../RadienceffAncienttalesComponents';
import {radienceffAncienttalesMediaRegistry} from '../RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesAssets';
import {radienceffAncienttalesColors} from '../RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesPalette';

const bootLoaderHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    overflow: hidden;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dots-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dot {
    height: 20px;
    width: 20px;
    margin-right: 10px;
    border-radius: 50%;
    background-color: #b3d4fc;
    animation: pulse 1.5s infinite ease-in-out;
  }

  .dot:last-child {
    margin-right: 0;
  }

  .dot:nth-child(1) {
    animation-delay: -0.3s;
  }

  .dot:nth-child(2) {
    animation-delay: -0.1s;
  }

  .dot:nth-child(3) {
    animation-delay: 0.1s;
  }

  .dot:nth-child(4) {
    animation-delay: 0.3s;
  }

  .dot:nth-child(5) {
    animation-delay: 0.5s;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.8);
      background-color: #b3d4fc;
      box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
    }

    50% {
      transform: scale(1.2);
      background-color: #6793fb;
      box-shadow: 0 0 0 10px rgba(178, 212, 252, 0);
    }

    100% {
      transform: scale(0.8);
      background-color: #b3d4fc;
      box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
    }
  }
</style>
</head>

<body>
  <section class="dots-container">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </section>
</body>
</html>`;

const RadienceffAncienttalesLoaderScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RadienceffAncienttalesRootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate(RadienceffAncienttalesRoutes.Onboarding);
    }, 5999);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={radienceffAncienttalesMediaRegistry.backgrounds.loader}
      style={radienceffAncienttalesStyles.radienceffAncienttalesBg}>
      <ScrollView
        contentContainerStyle={radienceffAncienttalesStyles.radienceffAncienttalesScroll}
        showsVerticalScrollIndicator={false}>
        <RadienceffAncienttalesFadeInView
          style={radienceffAncienttalesStyles.radienceffAncienttalesLoaderWrap}
          delay={200}>
          <WebView
            source={{html: bootLoaderHtml}}
            scrollEnabled={false}
            originWhitelist={['*']}
            webviewDebuggingEnabled={false}
            style={radienceffAncienttalesStyles.radienceffAncienttalesWebview}
          />
        </RadienceffAncienttalesFadeInView>
      </ScrollView>
    </ImageBackground>
  );
};

const radienceffAncienttalesStyles = StyleSheet.create({
  radienceffAncienttalesBg: {
    flex: 1,
    backgroundColor: radienceffAncienttalesColors.background,
  },
  radienceffAncienttalesScroll: {
    flexGrow: 1,
  },
  radienceffAncienttalesLoaderWrap: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  radienceffAncienttalesWebview: {
    width: 260.1,
    height: 150.2,
    backgroundColor: radienceffAncienttalesColors.transparent,
  },
});

export default RadienceffAncienttalesLoaderScreen;
