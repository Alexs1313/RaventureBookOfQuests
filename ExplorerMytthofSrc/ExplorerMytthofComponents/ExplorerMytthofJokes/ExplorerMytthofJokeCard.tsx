import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {mediaRegistry} from '../../ExplorerMytthofAssets';
import type {JokeEntry} from '../../ExplorerMytthofTypes';
import {colors, gradients, gradientAxis} from '../../ExplorerMytthofPalette';

const SaveActionControl = ({
  explorerMytthofIsSaved,
  onActivate,
}: {
  explorerMytthofIsSaved: boolean;
  onActivate: () => void;
}) => (
  <Pressable
    onPress={onActivate}
    style={({pressed}) => [
      explorerMytthofStyles.explorerMytthofSavePressable,
      pressed && explorerMytthofStyles.explorerMytthofPressedState,
    ]}>
    {explorerMytthofIsSaved ? (
      <View style={explorerMytthofStyles.explorerMytthofSaveSurfaceSaved}>
        <Text style={explorerMytthofStyles.explorerMytthofSaveLabelSaved}>
          Saved
        </Text>
      </View>
    ) : (
      <LinearGradient
        colors={gradients.primary}
        start={gradientAxis.horizontal.start}
        end={gradientAxis.horizontal.end}
        style={explorerMytthofStyles.explorerMytthofSaveSurface}>
        <Text style={explorerMytthofStyles.explorerMytthofSaveLabel}>Save</Text>
      </LinearGradient>
    )}
  </Pressable>
);

const ShareActionControl = ({onActivate}: {onActivate: () => void}) => (
  <Pressable
    onPress={onActivate}
    style={({pressed}) => [
      explorerMytthofStyles.explorerMytthofEmitSurface,
      pressed && explorerMytthofStyles.explorerMytthofPressedState,
    ]}>
    <Image source={mediaRegistry.icons.shareButton} />
  </Pressable>
);

type JokeCardProps = {
  joke: JokeEntry;
  isSaved: boolean;
  onShare: () => void;
  onToggleSave: () => void;
};

const JokeCard = ({joke, isSaved, onShare, onToggleSave}: JokeCardProps) => (
  <View
    style={[
      explorerMytthofStyles.explorerMytthofCard,
      isSaved && explorerMytthofStyles.explorerMytthofCardSaved,
    ]}>
    <Text style={explorerMytthofStyles.explorerMytthofBody}>{joke.body}</Text>
    <View style={explorerMytthofStyles.explorerMytthofToolbar}>
      <SaveActionControl
        explorerMytthofIsSaved={isSaved}
        onActivate={onToggleSave}
      />
      <ShareActionControl onActivate={onShare} />
    </View>
  </View>
);

const explorerMytthofStyles = StyleSheet.create({
  explorerMytthofCard: {
    borderRadius: 16.3,
    borderWidth: 1.4,
    borderColor: colors.border,
    backgroundColor: colors.cardStrong,
    padding: 24.2,
    gap: 16.3,
  },
  explorerMytthofCardSaved: {
    borderWidth: 1,
    borderColor: colors.borderMedium,
    backgroundColor: colors.card,
  },
  explorerMytthofBody: {
    color: colors.text,
    fontSize: 16.5,
    lineHeight: 26.1,
  },
  explorerMytthofToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12.4,
  },
  explorerMytthofSavePressable: {
    borderRadius: 20.1,
    overflow: 'hidden',
    flex: 1,
  },
  explorerMytthofSaveSurface: {
    minHeight: 48.2,
    borderRadius: 20.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  explorerMytthofSaveSurfaceSaved: {
    minHeight: 48.2,
    borderRadius: 20.3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cardMedium,
    borderWidth: 1,
    borderColor: colors.borderMedium,
  },
  explorerMytthofSaveLabel: {
    color: colors.textDark,
    fontSize: 16.4,
    fontWeight: '500',
    textAlign: 'center',
  },
  explorerMytthofSaveLabelSaved: {
    color: colors.gold,
    fontSize: 16.4,
    fontWeight: '500',
    textAlign: 'center',
  },
  explorerMytthofEmitSurface: {
    width: 48.2,
    height: 48.3,
    borderRadius: 20.4,
    backgroundColor: colors.cardMedium,
    borderWidth: 1.5,
    borderColor: colors.shareBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  explorerMytthofPressedState: {
    opacity: 0.85,
  },
});

export default JokeCard;
