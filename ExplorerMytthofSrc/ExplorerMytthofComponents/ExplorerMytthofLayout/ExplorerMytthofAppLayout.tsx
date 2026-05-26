import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import {mediaRegistry} from '../../ExplorerMytthofAssets';
import {colors, spacing} from '../../ExplorerMytthofPalette';

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
    source={mediaRegistry.backgrounds.app}
    style={explorerMytthofStyles.explorerMytthofBg}>
    <View style={explorerMytthofStyles.explorerMytthofOverlay} />
    <ScrollView
      bounces={bounce}
      contentContainerStyle={[
        tab ? explorerMytthofStyles.explorerMytthofScrollTab : explorerMytthofStyles.explorerMytthofScroll,
        contentStyle,
      ]}
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  </ImageBackground>
);

const explorerMytthofStyles = StyleSheet.create({
  explorerMytthofBg: {
    flex: 1,
    backgroundColor: colors.background,
  },
  explorerMytthofOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
  },
  explorerMytthofScroll: {
    flexGrow: 1,
    paddingHorizontal: spacing.layoutPaddingX,
    paddingTop: spacing.layoutPaddingTop,
    paddingBottom: spacing.layoutPaddingBottom,
  },
  explorerMytthofScrollTab: {
    flexGrow: 1,
    paddingHorizontal: spacing.layoutPaddingX,
    paddingTop: spacing.tabPaddingTop,
    paddingBottom: spacing.tabPaddingBottom,
  },
});

export default AppLayout;
