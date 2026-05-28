import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import FadeInView from '../animation/FadeInView';
import {typography} from '../../anccpalEEtr';

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  progress?: string;
  compact?: boolean;
};

const ScreenHeader = ({
  title,
  subtitle,
  progress,
  compact,
}: ScreenHeaderProps) => (
  <FadeInView>
    <View>
      <Text style={compact ? styles.titleCompact : styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {progress ? <Text style={styles.progress}>{progress}</Text> : null}
    </View>
  </FadeInView>
);

const styles = StyleSheet.create({
  title: typography.screenTitle,
  titleCompact: typography.screenTitleCompact,
  subtitle: typography.screenSubtitle,
  progress: typography.screenProgress,
});

export default ScreenHeader;
