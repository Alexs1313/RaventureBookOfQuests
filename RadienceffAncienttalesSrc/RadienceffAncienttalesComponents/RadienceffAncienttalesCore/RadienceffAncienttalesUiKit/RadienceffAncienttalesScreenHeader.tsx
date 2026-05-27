import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import RadienceffAncienttalesFadeInView from '../RadienceffAncienttalesAnimation/RadienceffAncienttalesFadeInView';
import {radienceffAncienttalesTypography} from '../RadienceffAncienttalesPalette';

type RadienceffAncienttalesScreenHeaderProps = {
  title: string;
  subtitle?: string;
  progress?: string;
  compact?: boolean;
};

const RadienceffAncienttalesScreenHeader = ({
  title,
  subtitle,
  progress,
  compact,
}: RadienceffAncienttalesScreenHeaderProps) => (
  <RadienceffAncienttalesFadeInView>
    <View>
      <Text style={compact ? radienceffAncienttalesStyles.radienceffAncienttalesTitleCompact : radienceffAncienttalesStyles.radienceffAncienttalesTitle}>{title}</Text>
      {subtitle ? <Text style={radienceffAncienttalesStyles.radienceffAncienttalesSubtitle}>{subtitle}</Text> : null}
      {progress ? <Text style={radienceffAncienttalesStyles.radienceffAncienttalesProgress}>{progress}</Text> : null}
    </View>
  </RadienceffAncienttalesFadeInView>
);

const radienceffAncienttalesStyles = StyleSheet.create({
  radienceffAncienttalesTitle: radienceffAncienttalesTypography.screenTitle,
  radienceffAncienttalesTitleCompact: radienceffAncienttalesTypography.screenTitleCompact,
  radienceffAncienttalesSubtitle: radienceffAncienttalesTypography.screenSubtitle,
  radienceffAncienttalesProgress: radienceffAncienttalesTypography.screenProgress,
});

export default RadienceffAncienttalesScreenHeader;
