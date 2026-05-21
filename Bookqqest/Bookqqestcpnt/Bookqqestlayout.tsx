import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

const Bookqqestlayout = ({
  children,
  bounce = true,
  contentStyle,
  bookqqestTab = false,
}: {
  children: React.ReactNode;
  bounce?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  bookqqestTab?: boolean;
}) => {
  return (
    <ImageBackground
      source={require('../../assets/img/bookqqestbooappbk.png')}
      style={styles.bookqqestlayoutBg}>
      <View style={styles.bookqqestlayoutOverlay} />
      <ScrollView
        bounces={bounce}
        contentContainerStyle={[
          bookqqestTab
            ? styles.bookqqestlayoutScrollTab
            : styles.bookqqestlayoutScroll,
          contentStyle,
        ]}
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bookqqestlayoutBg: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  bookqqestlayoutOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  bookqqestlayoutScroll: {
    flexGrow: 1,
    paddingHorizontal: 24.1,
    paddingTop: 70.2,
    paddingBottom: 32.3,
  },
  bookqqestlayoutScrollTab: {
    flexGrow: 1,
    paddingHorizontal: 24.4,
    paddingTop: 32.5,
    paddingBottom: 100.1,
  },
});

export default Bookqqestlayout;
