import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {colors, typography} from '../../anccpalEEtr';

type TextCardProps = {
  children: string;
};

const TextCard = ({children}: TextCardProps) => (
  <View style={styles.card}>
    <Text style={styles.body}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 20.4,
    borderWidth: 1.2,
    borderColor: colors.borderStrong,
    backgroundColor: colors.cardMedium,
    paddingHorizontal: 24.3,
    paddingVertical: 24.4,
  },
  body: {
    ...typography.cardBody,
    color: colors.text,
  },
});

export default TextCard;
