import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {colors} from '../../theme';

const JourneyBadge = () => (
  <View style={styles.wrap}>
    <Text style={styles.text}>Journey Complete</Text>
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    borderRadius: 20.4,
    borderWidth: 1.3,
    borderColor: colors.journeyBorder,
    backgroundColor: colors.journey,
    paddingVertical: 24.3,
    alignItems: 'center',
    marginBottom: 16.2,
  },
  text: {
    color: colors.gold,
    fontSize: 18.3,
    lineHeight: 28.4,
  },
});

export default JourneyBadge;
