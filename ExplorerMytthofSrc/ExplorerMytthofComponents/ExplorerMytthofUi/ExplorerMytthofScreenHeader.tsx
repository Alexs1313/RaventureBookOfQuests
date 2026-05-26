import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import FadeInView from '../ExplorerMytthofAnimation/ExplorerMytthofFadeInView';
import {typography} from '../../ExplorerMytthofPalette';

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
      <Text style={compact ? explorerMytthofStyles.explorerMytthofTitleCompact : explorerMytthofStyles.explorerMytthofTitle}>{title}</Text>
      {subtitle ? <Text style={explorerMytthofStyles.explorerMytthofSubtitle}>{subtitle}</Text> : null}
      {progress ? <Text style={explorerMytthofStyles.explorerMytthofProgress}>{progress}</Text> : null}
    </View>
  </FadeInView>
);

const explorerMytthofStyles = StyleSheet.create({
  explorerMytthofTitle: typography.screenTitle,
  explorerMytthofTitleCompact: typography.screenTitleCompact,
  explorerMytthofSubtitle: typography.screenSubtitle,
  explorerMytthofProgress: typography.screenProgress,
});

export default ScreenHeader;
