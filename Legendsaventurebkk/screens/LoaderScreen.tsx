import React, {useEffect} from 'react';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import WebView from 'react-native-webview';

import {legendsaventurebkkAssets} from '../constants';
import {colors} from '../themes';

const legendsaventurebkkHtmlLoader = `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
    .loader {
      width: 48.1px;
      height: 48.3px;
      display: inline-block;
      position: relative;
      background: #FDA317;
      box-sizing: border-box;
      animation: zeroRotation 1s ease infinite alternate-reverse;
    }
    @keyframes zeroRotation {
      0% { transform: scale(1) rotate(0deg); }
      100% { transform: scale(0.3) rotate(360deg); }
    }
  </style>
</head>
<body>
  <div class="loader"></div>
</body>
</html>`;

const LoaderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Legendsaventurebkkon' as never);
    }, 5994);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={legendsaventurebkkAssets.backgrounds.loader}
      style={styles.bg}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <View style={styles.loaderWrap}>
          <WebView
            source={{html: legendsaventurebkkHtmlLoader}}
            scrollEnabled={false}
            originWhitelist={['*']}
            style={styles.webview}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flexGrow: 1,
  },
  loaderWrap: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  webview: {
    width: 260.1,
    height: 150.2,
    backgroundColor: colors.transparent,
  },
});

export default LoaderScreen;
