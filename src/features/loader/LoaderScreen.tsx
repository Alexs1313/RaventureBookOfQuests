import React, {useEffect} from 'react';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import WebView from 'react-native-webview';

import {Routes} from '../../app/navigation/routes';
import type {RootStackParamList} from '../../app/navigation/types';
import {FadeInView} from '../../shared/components';
import {ravenQuestAssets} from '../../shared/constants';
import {colors} from '../../shared/theme';

const ravenQuestLoaderHtml = ` <!DOCTYPE html>
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
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }

          .loadingspinner {
            --square: 26px;
            --offset: 30px;
            --duration: 2.4s;
            --delay: 0.2s;
            --timing-function: ease-in-out;
            --in-duration: 0.4s;
            --in-delay: 0.1s;
            --in-timing-function: ease-out;
            width: calc(3 * var(--offset) + var(--square));
            height: calc(2 * var(--offset) + var(--square));
            position: relative;
          }

          .loadingspinner div {
            display: inline-block;
            background: darkorange;
            border: none;
            border-radius: 2px;
            width: var(--square);
            height: var(--square);
            position: absolute;
            padding: 0;
            margin: 0;
          }

          .loadingspinner #square1 {
            left: calc(0 * var(--offset));
            top: calc(0 * var(--offset));
            animation: square1 var(--duration) var(--delay) var(--timing-function) infinite,
              squarefadein var(--in-duration) calc(1 * var(--in-delay)) var(--in-timing-function) both;
          }

          .loadingspinner #square2 {
            left: calc(0 * var(--offset));
            top: calc(1 * var(--offset));
            animation: square2 var(--duration) var(--delay) var(--timing-function) infinite,
              squarefadein var(--in-duration) calc(1 * var(--in-delay)) var(--in-timing-function) both;
          }

          .loadingspinner #square3 {
            left: calc(1 * var(--offset));
            top: calc(1 * var(--offset));
            animation: square3 var(--duration) var(--delay) var(--timing-function) infinite,
              squarefadein var(--in-duration) calc(2 * var(--in-delay)) var(--in-timing-function) both;
          }

          .loadingspinner #square4 {
            left: calc(2 * var(--offset));
            top: calc(1 * var(--offset));
            animation: square4 var(--duration) var(--delay) var(--timing-function) infinite,
              squarefadein var(--in-duration) calc(3 * var(--in-delay)) var(--in-timing-function) both;
          }

          .loadingspinner #square5 {
            left: calc(3 * var(--offset));
            top: calc(1 * var(--offset));
            animation: square5 var(--duration) var(--delay) var(--timing-function) infinite,
              squarefadein var(--in-duration) calc(4 * var(--in-delay)) var(--in-timing-function) both;
          }

          @keyframes square1 {
            0% {
              left: calc(0 * var(--offset));
              top: calc(0 * var(--offset));
            }
            8.333% {
              left: calc(0 * var(--offset));
              top: calc(1 * var(--offset));
            }
            100% {
              left: calc(0 * var(--offset));
              top: calc(1 * var(--offset));
            }
          }

          @keyframes square2 {
            0% {
              left: calc(0 * var(--offset));
              top: calc(1 * var(--offset));
            }
            8.333% {
              left: calc(0 * var(--offset));
              top: calc(2 * var(--offset));
            }
            16.67% {
              left: calc(1 * var(--offset));
              top: calc(2 * var(--offset));
            }
            25% {
              left: calc(1 * var(--offset));
              top: calc(1 * var(--offset));
            }
            83.33% {
              left: calc(1 * var(--offset));
              top: calc(1 * var(--offset));
            }
            91.67% {
              left: calc(1 * var(--offset));
              top: calc(0 * var(--offset));
            }
            100% {
              left: calc(0 * var(--offset));
              top: calc(0 * var(--offset));
            }
          }

          @keyframes square3 {
            0%, 100% {
              left: calc(1 * var(--offset));
              top: calc(1 * var(--offset));
            }
            16.67% {
              left: calc(1 * var(--offset));
              top: calc(1 * var(--offset));
            }
            25% {
              left: calc(1 * var(--offset));
              top: calc(0 * var(--offset));
            }
            33.33% {
              left: calc(2 * var(--offset));
              top: calc(0 * var(--offset));
            }
            41.67% {
              left: calc(2 * var(--offset));
              top: calc(1 * var(--offset));
            }
            66.67% {
              left: calc(2 * var(--offset));
              top: calc(1 * var(--offset));
            }
            75% {
              left: calc(2 * var(--offset));
              top: calc(2 * var(--offset));
            }
            83.33% {
              left: calc(1 * var(--offset));
              top: calc(2 * var(--offset));
            }
            91.67% {
              left: calc(1 * var(--offset));
              top: calc(1 * var(--offset));
            }
          }

          @keyframes square4 {
            0% {
              left: calc(2 * var(--offset));
              top: calc(1 * var(--offset));
            }
            33.33% {
              left: calc(2 * var(--offset));
              top: calc(1 * var(--offset));
            }
            41.67% {
              left: calc(2 * var(--offset));
              top: calc(2 * var(--offset));
            }
            50% {
              left: calc(3 * var(--offset));
              top: calc(2 * var(--offset));
            }
            58.33% {
              left: calc(3 * var(--offset));
              top: calc(1 * var(--offset));
            }
            100% {
              left: calc(3 * var(--offset));
              top: calc(1 * var(--offset));
            }
          }

          @keyframes square5 {
            0% {
              left: calc(3 * var(--offset));
              top: calc(1 * var(--offset));
            }
            50% {
              left: calc(3 * var(--offset));
              top: calc(1 * var(--offset));
            }
            58.33% {
              left: calc(3 * var(--offset));
              top: calc(0 * var(--offset));
            }
            66.67% {
              left: calc(2 * var(--offset));
              top: calc(0 * var(--offset));
            }
            75% {
              left: calc(2 * var(--offset));
              top: calc(1 * var(--offset));
            }
            100% {
              left: calc(2 * var(--offset));
              top: calc(1 * var(--offset));
            }
          }

          @keyframes squarefadein {
            0% {
              transform: scale(0.75);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        </style>
      </head>

      <body>
        <div class="loadingspinner">
          <div id="square1"></div>
          <div id="square2"></div>
          <div id="square3"></div>
          <div id="square4"></div>
          <div id="square5"></div>
        </div>
      </body>
    </html>`;

const LoaderScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate(Routes.Onboarding);
    }, 5999);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={ravenQuestAssets.backgrounds.loader}
      style={styles.bg}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <FadeInView style={styles.loaderWrap} delay={200}>
          <WebView
            source={{html: ravenQuestLoaderHtml}}
            scrollEnabled={false}
            originWhitelist={['*']}
            style={styles.webview}
          />
        </FadeInView>
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
    bottom: 30,
    alignSelf: 'center',
  },
  webview: {
    width: 260.1,
    height: 150.2,
    backgroundColor: colors.transparent,
  },
});

export default LoaderScreen;
