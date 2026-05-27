import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {radienceffAncienttalesMediaRegistry} from '../RadienceffAncienttalesAssets';
import type {RadienceffAncienttalesJokeEntry} from '../RadienceffAncienttalesTypes';
import {radienceffAncienttalesColors, radienceffAncienttalesGradients, radienceffAncienttalesGradientAxis} from '../RadienceffAncienttalesPalette';

const SaveActionControl = ({
  radienceffAncienttalesIsSaved,
  onActivate,
}: {
  radienceffAncienttalesIsSaved: boolean;
  onActivate: () => void;
}) => (
  <Pressable
    onPress={onActivate}
    style={({pressed}) => [
      radienceffAncienttalesStyles.radienceffAncienttalesSavePressable,
      pressed && radienceffAncienttalesStyles.radienceffAncienttalesPressedState,
    ]}>
    {radienceffAncienttalesIsSaved ? (
      <View style={radienceffAncienttalesStyles.radienceffAncienttalesSaveSurfaceSaved}>
        <Text style={radienceffAncienttalesStyles.radienceffAncienttalesSaveLabelSaved}>
          Saved
        </Text>
      </View>
    ) : (
      <LinearGradient
        colors={radienceffAncienttalesGradients.primary}
        start={radienceffAncienttalesGradientAxis.horizontal.start}
        end={radienceffAncienttalesGradientAxis.horizontal.end}
        style={radienceffAncienttalesStyles.radienceffAncienttalesSaveSurface}>
        <Text style={radienceffAncienttalesStyles.radienceffAncienttalesSaveLabel}>Save</Text>
      </LinearGradient>
    )}
  </Pressable>
);

const ShareActionControl = ({onActivate}: {onActivate: () => void}) => (
  <Pressable
    onPress={onActivate}
    style={({pressed}) => [
      radienceffAncienttalesStyles.radienceffAncienttalesEmitSurface,
      pressed && radienceffAncienttalesStyles.radienceffAncienttalesPressedState,
    ]}>
    <Image source={radienceffAncienttalesMediaRegistry.icons.shareButton} />
  </Pressable>
);

type RadienceffAncienttalesJokeCardProps = {
  joke: RadienceffAncienttalesJokeEntry;
  isSaved: boolean;
  onShare: () => void;
  onToggleSave: () => void;
};

const RadienceffAncienttalesJokeCard = ({joke, isSaved, onShare, onToggleSave}: RadienceffAncienttalesJokeCardProps) => (
  <View
    style={[
      radienceffAncienttalesStyles.radienceffAncienttalesCard,
      isSaved && radienceffAncienttalesStyles.radienceffAncienttalesCardSaved,
    ]}>
    <Text style={radienceffAncienttalesStyles.radienceffAncienttalesBody}>{joke.body}</Text>
    <View style={radienceffAncienttalesStyles.radienceffAncienttalesToolbar}>
      <SaveActionControl
        radienceffAncienttalesIsSaved={isSaved}
        onActivate={onToggleSave}
      />
      <ShareActionControl onActivate={onShare} />
    </View>
  </View>
);

const radienceffAncienttalesStyles = StyleSheet.create({
  radienceffAncienttalesCard: {
    borderRadius: 16.3,
    borderWidth: 1.4,
    borderColor: radienceffAncienttalesColors.border,
    backgroundColor: radienceffAncienttalesColors.cardStrong,
    padding: 24.2,
    gap: 16.3,
  },
  radienceffAncienttalesCardSaved: {
    borderWidth: 1,
    borderColor: radienceffAncienttalesColors.borderMedium,
    backgroundColor: radienceffAncienttalesColors.card,
  },
  radienceffAncienttalesBody: {
    color: radienceffAncienttalesColors.text,
    fontSize: 16.5,
    lineHeight: 26.1,
  },
  radienceffAncienttalesToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12.4,
  },
  radienceffAncienttalesSavePressable: {
    borderRadius: 20.1,
    overflow: 'hidden',
    flex: 1,
  },
  radienceffAncienttalesSaveSurface: {
    minHeight: 48.2,
    borderRadius: 20.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radienceffAncienttalesSaveSurfaceSaved: {
    minHeight: 48.2,
    borderRadius: 20.3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: radienceffAncienttalesColors.cardMedium,
    borderWidth: 1,
    borderColor: radienceffAncienttalesColors.borderMedium,
  },
  radienceffAncienttalesSaveLabel: {
    color: radienceffAncienttalesColors.textDark,
    fontSize: 16.4,
    fontWeight: '500',
    textAlign: 'center',
  },
  radienceffAncienttalesSaveLabelSaved: {
    color: radienceffAncienttalesColors.gold,
    fontSize: 16.4,
    fontWeight: '500',
    textAlign: 'center',
  },
  radienceffAncienttalesEmitSurface: {
    width: 48.2,
    height: 48.3,
    borderRadius: 20.4,
    backgroundColor: radienceffAncienttalesColors.cardMedium,
    borderWidth: 1.5,
    borderColor: radienceffAncienttalesColors.shareBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radienceffAncienttalesPressedState: {
    opacity: 0.85,
  },
});

export default RadienceffAncienttalesJokeCard;
