import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {colors} from '../../ExplorerMytthofPalette';

const JourneyBadge = () => (
  <View style={explorerMytthofStyles.explorerMytthofWrap}>
    <Text style={explorerMytthofStyles.explorerMytthofText}>Journey Complete</Text>
  </View>
);

const explorerMytthofStyles = StyleSheet.create({
  explorerMytthofWrap: {
    borderRadius: 20.4,
    borderWidth: 1.3,
    borderColor: colors.journeyBorder,
    backgroundColor: colors.journey,
    paddingVertical: 24.3,
    alignItems: 'center',
    marginBottom: 16.2,
  },
  explorerMytthofText: {
    color: colors.gold,
    fontSize: 18.3,
    lineHeight: 28.4,
  },
});

export default JourneyBadge;
