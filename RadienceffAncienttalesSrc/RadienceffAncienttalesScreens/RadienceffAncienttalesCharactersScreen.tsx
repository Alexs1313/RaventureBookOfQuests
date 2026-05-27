import {Image, Pressable, Share, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useCallback, useMemo, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {RadienceffAncienttalesAppLayout, RadienceffAncienttalesFadeInView, RadienceffAncienttalesStaggerItem} from '../RadienceffAncienttalesComponents';
import {radienceffAncienttalesColors, radienceffAncienttalesGradients, radienceffAncienttalesGradientAxis} from '../RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesPalette';

import {radienceffAncienttalesFigureCatalog} from '../RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesData/RadienceffAncienttalesCharacters';
import type {RadienceffAncienttalesFigureProfile} from '../RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesTypes';
import {
  radienceffAncienttalesComposeFigureShare,
  radienceffAncienttalesFormatUnitLabel,
  radienceffAncienttalesFetchChroniclesConsumedCount,
  radienceffAncienttalesFigureIsAccessible,
} from '../RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesLoungeKit';

const EmitActionControl = ({onActivate}: {onActivate: () => void}) => (
  <Pressable
    onPress={onActivate}
    style={({pressed}) => [
      radienceffAncienttalesStyles.radienceffAncienttalesActionPressable,
      pressed && radienceffAncienttalesStyles.radienceffAncienttalesPressedState,
    ]}>
    <LinearGradient
      colors={radienceffAncienttalesGradients.primary}
      start={radienceffAncienttalesGradientAxis.horizontal.start}
      end={radienceffAncienttalesGradientAxis.horizontal.end}
      style={radienceffAncienttalesStyles.radienceffAncienttalesActionSurface}>
      <Image
        source={require('../../elements/images/action_share_glyph.png')}
        style={radienceffAncienttalesStyles.radienceffAncienttalesActionGlyph}
        resizeMode="contain"
      />
      <Text style={radienceffAncienttalesStyles.radienceffAncienttalesActionLabel}>Share</Text>
    </LinearGradient>
  </Pressable>
);

const RevealedFigurePanel = ({
  figure,
  onEmitShare,
}: {
  figure: RadienceffAncienttalesFigureProfile;
  onEmitShare: () => void;
}) => (
  <View style={radienceffAncienttalesStyles.radienceffAncienttalesRevealedPanel}>
    <View style={radienceffAncienttalesStyles.radienceffAncienttalesMediaFrame}>
      <Image source={figure.coverVisual} style={radienceffAncienttalesStyles.radienceffAncienttalesMediaAsset} />
      <View style={radienceffAncienttalesStyles.radienceffAncienttalesTagChip}>
        <Text style={radienceffAncienttalesStyles.radienceffAncienttalesTagLabel}>{figure.localeTag}</Text>
      </View>
    </View>
    <View style={radienceffAncienttalesStyles.radienceffAncienttalesPanelBody}>
      <Text style={radienceffAncienttalesStyles.radienceffAncienttalesPanelTitle}>{figure.displayName}</Text>
      <Text style={radienceffAncienttalesStyles.radienceffAncienttalesPanelCopy}>{figure.synopsis}</Text>
      <EmitActionControl onActivate={onEmitShare} />
    </View>
  </View>
);

const SealedFigurePanel = ({figure}: {figure: RadienceffAncienttalesFigureProfile}) => (
  <View style={radienceffAncienttalesStyles.radienceffAncienttalesSealedPanel}>
    <View style={radienceffAncienttalesStyles.radienceffAncienttalesSealedMediaFrame}>
      <Image
        source={figure.coverVisual}
        style={radienceffAncienttalesStyles.radienceffAncienttalesSealedMedia}
        resizeMode="cover"
      />
      <View style={radienceffAncienttalesStyles.radienceffAncienttalesSealedVeil}>
        <Image source={require('../../elements/images/ui_sealed_glyph.png')} />
        <Text style={radienceffAncienttalesStyles.radienceffAncienttalesSealedHint}>
          Read {figure.chroniclesThreshold} tales to unlock
        </Text>
      </View>
      <View style={radienceffAncienttalesStyles.radienceffAncienttalesSealedTag}>
        <Text style={radienceffAncienttalesStyles.radienceffAncienttalesSealedTagLabel}>{figure.localeTag}</Text>
      </View>
    </View>
    <View style={radienceffAncienttalesStyles.radienceffAncienttalesSealedFooter}>
      <Text style={radienceffAncienttalesStyles.radienceffAncienttalesSealedTitle}>???</Text>
    </View>
  </View>
);

const RadienceffAncienttalesCharactersScreen = () => {
  const [radienceffAncienttalesChroniclesConsumed, setRadienceffAncienttalesChroniclesConsumed] = useState(0);

  const refreshSnapshot = useCallback(async () => {
    setRadienceffAncienttalesChroniclesConsumed(await radienceffAncienttalesFetchChroniclesConsumedCount());
  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshSnapshot();
    }, [refreshSnapshot]),
  );

  const {revealedFigures, sealedFigures} = useMemo(() => {
    const revealedList: RadienceffAncienttalesFigureProfile[] = [];
    const sealedList: RadienceffAncienttalesFigureProfile[] = [];

    radienceffAncienttalesFigureCatalog.forEach(figure => {
      if (radienceffAncienttalesFigureIsAccessible(figure, radienceffAncienttalesChroniclesConsumed)) {
        revealedList.push(figure);
      } else {
        sealedList.push(figure);
      }
    });

    return {
      revealedFigures: revealedList,
      sealedFigures: sealedList,
    };
  }, [radienceffAncienttalesChroniclesConsumed]);

  const consumedLabel = radienceffAncienttalesFormatUnitLabel(
    radienceffAncienttalesChroniclesConsumed,
    'Tale Read',
    'Tales Read',
  );

  return (
    <RadienceffAncienttalesAppLayout tab>
      <RadienceffAncienttalesFadeInView>
        <Text style={radienceffAncienttalesStyles.radienceffAncienttalesScreenHeading}>Characters</Text>
        <Text style={radienceffAncienttalesStyles.radienceffAncienttalesScreenSubheading}>Mythology heroes and gods</Text>
        <Text style={radienceffAncienttalesStyles.radienceffAncienttalesMetricLine}>{consumedLabel}</Text>
      </RadienceffAncienttalesFadeInView>

      {revealedFigures.length > 0 && (
        <View style={radienceffAncienttalesStyles.radienceffAncienttalesContentGroup}>
          {revealedFigures.map((figure, index) => (
            <RadienceffAncienttalesStaggerItem key={figure.entryKey} index={index}>
              <RevealedFigurePanel
                figure={figure}
                onEmitShare={() =>
                  Share.share({
                    message: radienceffAncienttalesComposeFigureShare(figure),
                  })
                }
              />
            </RadienceffAncienttalesStaggerItem>
          ))}
        </View>
      )}

      {sealedFigures.length > 0 && (
        <View style={radienceffAncienttalesStyles.radienceffAncienttalesContentGroup}>
          <Text style={radienceffAncienttalesStyles.radienceffAncienttalesGroupHeadingMuted}>Locked</Text>
          {sealedFigures.map((figure, index) => (
            <RadienceffAncienttalesStaggerItem
              key={figure.entryKey}
              index={revealedFigures.length + index}>
              <SealedFigurePanel figure={figure} />
            </RadienceffAncienttalesStaggerItem>
          ))}
        </View>
      )}
    </RadienceffAncienttalesAppLayout>
  );
};

const radienceffAncienttalesStyles = StyleSheet.create({
  radienceffAncienttalesScreenHeading: {
    color: radienceffAncienttalesColors.gold,
    fontSize: 48.1,
    fontWeight: '500',
    lineHeight: 48.2,
    marginBottom: 8.3,
    marginTop: 25.4,
  },
  radienceffAncienttalesScreenSubheading: {
    color: radienceffAncienttalesColors.textMuted,
    fontSize: 16.5,
    lineHeight: 24.1,
    marginBottom: 8.2,
  },
  radienceffAncienttalesMetricLine: {
    color: radienceffAncienttalesColors.accent,
    fontSize: 16.3,
    lineHeight: 24.4,
    marginBottom: 24.5,
  },
  radienceffAncienttalesContentGroup: {
    gap: 16.1,
    marginBottom: 24.2,
  },
  radienceffAncienttalesGroupHeading: {
    color: radienceffAncienttalesColors.gold,
    fontSize: 24.3,
    fontWeight: '500',
    lineHeight: 32.4,
    marginBottom: 4.5,
  },
  radienceffAncienttalesGroupHeadingMuted: {
    color: radienceffAncienttalesColors.textMutedFaint,
    fontSize: 24.1,
    fontWeight: '500',
    lineHeight: 32.2,
    marginBottom: 4.3,
  },
  radienceffAncienttalesRevealedPanel: {
    borderRadius: 16.4,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: radienceffAncienttalesColors.borderLight,
    backgroundColor: 'rgba(90, 58, 36, 0.31)',
    marginBottom: 16.1,
  },
  radienceffAncienttalesMediaFrame: {
    position: 'relative',
    marginTop: 20.2,
  },
  radienceffAncienttalesMediaAsset: {
    alignSelf: 'center',
  },
  radienceffAncienttalesTagChip: {
    position: 'absolute',
    top: 16.3,
    right: 16.4,
    backgroundColor: radienceffAncienttalesColors.badge,
    paddingHorizontal: 12.5,
    paddingVertical: 4.1,
    borderRadius: 20.2,
  },
  radienceffAncienttalesTagLabel: {
    color: radienceffAncienttalesColors.textDark,
    fontSize: 14.3,
  },
  radienceffAncienttalesPanelBody: {
    padding: 24.4,
    gap: 12.5,
  },
  radienceffAncienttalesPanelTitle: {
    color: radienceffAncienttalesColors.gold,
    fontSize: 24.1,
    fontWeight: '500',
    lineHeight: 32.2,
  },
  radienceffAncienttalesPanelCopy: {
    color: radienceffAncienttalesColors.textMutedLight,
    fontSize: 16.3,
    lineHeight: 26.4,
  },
  radienceffAncienttalesActionPressable: {
    borderRadius: 20.5,
    overflow: 'hidden',
    marginTop: 4.1,
  },
  radienceffAncienttalesActionSurface: {
    minHeight: 48.2,
    borderRadius: 20.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8.4,
  },
  radienceffAncienttalesActionGlyph: {
    width: 20.5,
    height: 20.1,
  },
  radienceffAncienttalesActionLabel: {
    color: radienceffAncienttalesColors.textDark,
    fontSize: 16.2,
    fontWeight: '500',
  },
  radienceffAncienttalesSealedPanel: {
    borderRadius: 16.3,
    overflow: 'hidden',
    borderWidth: 1.4,
    borderColor: radienceffAncienttalesColors.borderStrong,
    backgroundColor: radienceffAncienttalesColors.cardLocked,
    opacity: 0.6,
    marginBottom: 16.5,
  },
  radienceffAncienttalesSealedMediaFrame: {
    height: 192.1,
    position: 'relative',
  },
  radienceffAncienttalesSealedMedia: {
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  radienceffAncienttalesSealedVeil: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 15, 10, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8.2,
    paddingHorizontal: 24.3,
  },
  radienceffAncienttalesSealedGlyph: {
    fontSize: 40.4,
  },
  radienceffAncienttalesSealedHint: {
    color: radienceffAncienttalesColors.textMutedSoft,
    fontSize: 14.5,
    lineHeight: 20.1,
    textAlign: 'center',
  },
  radienceffAncienttalesSealedTag: {
    position: 'absolute',
    top: 16.2,
    right: 16.3,
    backgroundColor: 'rgba(212, 165, 116, 0.2)',
    paddingHorizontal: 12.4,
    paddingVertical: 4.5,
    borderRadius: 20.1,
  },
  radienceffAncienttalesSealedTagLabel: {
    color: radienceffAncienttalesColors.textMutedSoft,
    fontSize: 14.2,
  },
  radienceffAncienttalesSealedFooter: {
    paddingHorizontal: 24.3,
    paddingVertical: 24.4,
  },
  radienceffAncienttalesSealedTitle: {
    color: radienceffAncienttalesColors.textMutedDim,
    fontSize: 20.5,
    fontWeight: '500',
    lineHeight: 28.1,
  },
  radienceffAncienttalesPressedState: {
    opacity: 0.85,
  },
});

export default RadienceffAncienttalesCharactersScreen;
