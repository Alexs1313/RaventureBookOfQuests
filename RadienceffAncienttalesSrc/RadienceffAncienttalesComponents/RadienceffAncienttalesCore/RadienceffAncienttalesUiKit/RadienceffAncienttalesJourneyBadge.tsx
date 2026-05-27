import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {radienceffAncienttalesColors} from '../RadienceffAncienttalesPalette';

const RadienceffAncienttalesJourneyBadge = () => (
  <View style={radienceffAncienttalesStyles.radienceffAncienttalesWrap}>
    <Text style={radienceffAncienttalesStyles.radienceffAncienttalesText}>Journey Complete</Text>
  </View>
);

const radienceffAncienttalesStyles = StyleSheet.create({
  radienceffAncienttalesWrap: {
    borderRadius: 20.4,
    borderWidth: 1.3,
    borderColor: radienceffAncienttalesColors.journeyBorder,
    backgroundColor: radienceffAncienttalesColors.journey,
    paddingVertical: 24.3,
    alignItems: 'center',
    marginBottom: 16.2,
  },
  radienceffAncienttalesText: {
    color: radienceffAncienttalesColors.gold,
    fontSize: 18.3,
    lineHeight: 28.4,
  },
});

export default RadienceffAncienttalesJourneyBadge;
