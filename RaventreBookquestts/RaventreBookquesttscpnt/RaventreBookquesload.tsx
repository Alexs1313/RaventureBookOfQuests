// Loader HTML

import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';

import React, {useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
import WebView from 'react-native-webview';

const raventreBookquesttsHtmlLoader = `<!DOCTYPE html>
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
      width: 48px;
      height: 48px;
      display: inline-block;
      position: relative;
      background: #FDA317;
      box-sizing: border-box;
      animation: zeroRotation 1s ease infinite alternate-reverse;
    }

    @keyframes zeroRotation {
      0% {
        transform: scale(1) rotate(0deg);
      }

      100% {
        transform: scale(0.3) rotate(360deg);
      }
    }
  </style>
</head>
<body>
  <div class="loader"></div>
</body>
</html>`;

const RaventreBookquesload = () => {
  const loadNavigation = useNavigation();

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      loadNavigation.navigate('RaventreBookquesttson' as never);
    }, 5994);

    return () => {
      clearTimeout(loadTimer);
    };
  }, [loadNavigation]);

  return (
    <ImageBackground
      source={require('../../assets/img/raventrebookquebg.png')}
      style={styles.loadimageBg}>
      <ScrollView
        contentContainerStyle={styles.loadscrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.loadbottomWrap}>
          <WebView
            source={{html: raventreBookquesttsHtmlLoader}}
            scrollEnabled={false}
            originWhitelist={['*']}
            style={{width: 260, height: 150, backgroundColor: 'transparent'}}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default RaventreBookquesload;

const styles = StyleSheet.create({
  loadbottomWrap: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  loadimageBg: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  loadscrollContent: {
    flexGrow: 1,
  },
});
