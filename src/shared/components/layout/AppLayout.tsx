import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import {legendsaventurebkkAssets} from '../../constants';
import {colors, spacing} from '../../theme';

type AppLayoutProps = {
  children: React.ReactNode;
  bounce?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  tab?: boolean;
};

const AppLayout = ({
  children,
  bounce = true,
  contentStyle,
  tab = false,
}: AppLayoutProps) => (
  <ImageBackground
    source={legendsaventurebkkAssets.backgrounds.app}
    style={styles.bg}>
    <View style={styles.overlay} />
    <ScrollView
      bounces={bounce}
      contentContainerStyle={[
        tab ? styles.scrollTab : styles.scroll,
        contentStyle,
      ]}
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  </ImageBackground>
);

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: colors.background,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: spacing.layoutPaddingX,
    paddingTop: spacing.layoutPaddingTop,
    paddingBottom: spacing.layoutPaddingBottom,
  },
  scrollTab: {
    flexGrow: 1,
    paddingHorizontal: spacing.layoutPaddingX,
    paddingTop: spacing.tabPaddingTop,
    paddingBottom: spacing.tabPaddingBottom,
  },
});

export default AppLayout;
