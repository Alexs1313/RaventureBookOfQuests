import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {radienceffAncienttalesColors, radienceffAncienttalesTypography} from '../RadienceffAncienttalesPalette';

type RadienceffAncienttalesTextCardProps = {
  children: string;
};

const RadienceffAncienttalesTextCard = ({children}: RadienceffAncienttalesTextCardProps) => (
  <View style={radienceffAncienttalesStyles.radienceffAncienttalesCard}>
    <Text style={radienceffAncienttalesStyles.radienceffAncienttalesBody}>{children}</Text>
  </View>
);

const radienceffAncienttalesStyles = StyleSheet.create({
  radienceffAncienttalesCard: {
    borderRadius: 20.4,
    borderWidth: 1.2,
    borderColor: radienceffAncienttalesColors.borderStrong,
    backgroundColor: radienceffAncienttalesColors.cardMedium,
    paddingHorizontal: 24.3,
    paddingVertical: 24.4,
  },
  radienceffAncienttalesBody: {
    ...radienceffAncienttalesTypography.cardBody,
    color: radienceffAncienttalesColors.text,
  },
});

export default RadienceffAncienttalesTextCard;
