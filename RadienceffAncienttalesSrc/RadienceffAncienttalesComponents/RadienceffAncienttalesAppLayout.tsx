import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import {radienceffAncienttalesMediaRegistry} from './RadienceffAncienttalesCore/RadienceffAncienttalesAssets';
import {radienceffAncienttalesColors, radienceffAncienttalesSpacing} from './RadienceffAncienttalesCore/RadienceffAncienttalesPalette';

type RadienceffAncienttalesAppLayoutProps = {
  children: React.ReactNode;
  bounce?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  tab?: boolean;
};

const RadienceffAncienttalesAppLayout = ({
  children,
  bounce = true,
  contentStyle,
  tab = false,
}: RadienceffAncienttalesAppLayoutProps) => (
  <ImageBackground
    source={radienceffAncienttalesMediaRegistry.backgrounds.app}
    style={radienceffAncienttalesStyles.radienceffAncienttalesBg}>
    <View style={radienceffAncienttalesStyles.radienceffAncienttalesOverlay} />
    <ScrollView
      bounces={bounce}
      contentContainerStyle={[
        tab ? radienceffAncienttalesStyles.radienceffAncienttalesScrollTab : radienceffAncienttalesStyles.radienceffAncienttalesScroll,
        contentStyle,
      ]}
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  </ImageBackground>
);

const radienceffAncienttalesStyles = StyleSheet.create({
  radienceffAncienttalesBg: {
    flex: 1,
    backgroundColor: radienceffAncienttalesColors.background,
  },
  radienceffAncienttalesOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: radienceffAncienttalesColors.overlay,
  },
  radienceffAncienttalesScroll: {
    flexGrow: 1,
    paddingHorizontal: radienceffAncienttalesSpacing.layoutPaddingX,
    paddingTop: radienceffAncienttalesSpacing.layoutPaddingTop,
    paddingBottom: radienceffAncienttalesSpacing.layoutPaddingBottom,
  },
  radienceffAncienttalesScrollTab: {
    flexGrow: 1,
    paddingHorizontal: radienceffAncienttalesSpacing.layoutPaddingX,
    paddingTop: radienceffAncienttalesSpacing.tabPaddingTop,
    paddingBottom: radienceffAncienttalesSpacing.tabPaddingBottom,
  },
});

export default RadienceffAncienttalesAppLayout;
