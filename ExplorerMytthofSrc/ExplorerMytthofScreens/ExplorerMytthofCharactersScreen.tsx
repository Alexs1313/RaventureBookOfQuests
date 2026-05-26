import {Image, Pressable, Share, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useCallback, useMemo, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {AppLayout, FadeInView, StaggerItem} from '../ExplorerMytthofComponents';
import {colors, gradients, gradientAxis} from '../ExplorerMytthofPalette';

import {figureCatalog} from '../ExplorerMytthofData/ExplorerMytthofCharacters';
import type {FigureProfile} from '../ExplorerMytthofTypes';
import {
  composeFigureShare,
  formatUnitLabel,
  fetchChroniclesConsumedCount,
  figureIsAccessible,
} from '../ExplorerMytthofLoungeKit';

const EmitActionControl = ({onActivate}: {onActivate: () => void}) => (
  <Pressable
    onPress={onActivate}
    style={({pressed}) => [
      explorerMytthofStyles.explorerMytthofActionPressable,
      pressed && explorerMytthofStyles.explorerMytthofPressedState,
    ]}>
    <LinearGradient
      colors={gradients.primary}
      start={gradientAxis.horizontal.start}
      end={gradientAxis.horizontal.end}
      style={explorerMytthofStyles.explorerMytthofActionSurface}>
      <Image
        source={require('../../elements/images/icons/shareIcon.png')}
        style={explorerMytthofStyles.explorerMytthofActionGlyph}
        resizeMode="contain"
      />
      <Text style={explorerMytthofStyles.explorerMytthofActionLabel}>Share</Text>
    </LinearGradient>
  </Pressable>
);

const RevealedFigurePanel = ({
  figure,
  onEmitShare,
}: {
  figure: FigureProfile;
  onEmitShare: () => void;
}) => (
  <View style={explorerMytthofStyles.explorerMytthofRevealedPanel}>
    <View style={explorerMytthofStyles.explorerMytthofMediaFrame}>
      <Image source={figure.coverVisual} style={explorerMytthofStyles.explorerMytthofMediaAsset} />
      <View style={explorerMytthofStyles.explorerMytthofTagChip}>
        <Text style={explorerMytthofStyles.explorerMytthofTagLabel}>{figure.localeTag}</Text>
      </View>
    </View>
    <View style={explorerMytthofStyles.explorerMytthofPanelBody}>
      <Text style={explorerMytthofStyles.explorerMytthofPanelTitle}>{figure.displayName}</Text>
      <Text style={explorerMytthofStyles.explorerMytthofPanelCopy}>{figure.synopsis}</Text>
      <EmitActionControl onActivate={onEmitShare} />
    </View>
  </View>
);

const SealedFigurePanel = ({figure}: {figure: FigureProfile}) => (
  <View style={explorerMytthofStyles.explorerMytthofSealedPanel}>
    <View style={explorerMytthofStyles.explorerMytthofSealedMediaFrame}>
      <Image
        source={figure.coverVisual}
        style={explorerMytthofStyles.explorerMytthofSealedMedia}
        resizeMode="cover"
      />
      <View style={explorerMytthofStyles.explorerMytthofSealedVeil}>
        <Image source={require('../../elements/images/icons/lockIcon.png')} />
        <Text style={explorerMytthofStyles.explorerMytthofSealedHint}>
          Read {figure.chroniclesThreshold} tales to unlock
        </Text>
      </View>
      <View style={explorerMytthofStyles.explorerMytthofSealedTag}>
        <Text style={explorerMytthofStyles.explorerMytthofSealedTagLabel}>{figure.localeTag}</Text>
      </View>
    </View>
    <View style={explorerMytthofStyles.explorerMytthofSealedFooter}>
      <Text style={explorerMytthofStyles.explorerMytthofSealedTitle}>???</Text>
    </View>
  </View>
);

const CharactersScreen = () => {
  const [explorerMytthofChroniclesConsumed, setExplorerMytthofChroniclesConsumed] = useState(0);

  const refreshSnapshot = useCallback(async () => {
    setExplorerMytthofChroniclesConsumed(await fetchChroniclesConsumedCount());
  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshSnapshot();
    }, [refreshSnapshot]),
  );

  const {revealedFigures, sealedFigures} = useMemo(() => {
    const revealedList: FigureProfile[] = [];
    const sealedList: FigureProfile[] = [];

    figureCatalog.forEach(figure => {
      if (figureIsAccessible(figure, explorerMytthofChroniclesConsumed)) {
        revealedList.push(figure);
      } else {
        sealedList.push(figure);
      }
    });

    return {
      revealedFigures: revealedList,
      sealedFigures: sealedList,
    };
  }, [explorerMytthofChroniclesConsumed]);

  const consumedLabel = formatUnitLabel(
    explorerMytthofChroniclesConsumed,
    'Tale Read',
    'Tales Read',
  );

  return (
    <AppLayout tab>
      <FadeInView>
        <Text style={explorerMytthofStyles.explorerMytthofScreenHeading}>Characters</Text>
        <Text style={explorerMytthofStyles.explorerMytthofScreenSubheading}>Mythology heroes and gods</Text>
        <Text style={explorerMytthofStyles.explorerMytthofMetricLine}>{consumedLabel}</Text>
      </FadeInView>

      {revealedFigures.length > 0 && (
        <View style={explorerMytthofStyles.explorerMytthofContentGroup}>
          {revealedFigures.map((figure, index) => (
            <StaggerItem key={figure.entryKey} index={index}>
              <RevealedFigurePanel
                figure={figure}
                onEmitShare={() =>
                  Share.share({
                    message: composeFigureShare(figure),
                  })
                }
              />
            </StaggerItem>
          ))}
        </View>
      )}

      {sealedFigures.length > 0 && (
        <View style={explorerMytthofStyles.explorerMytthofContentGroup}>
          <Text style={explorerMytthofStyles.explorerMytthofGroupHeadingMuted}>Locked</Text>
          {sealedFigures.map((figure, index) => (
            <StaggerItem
              key={figure.entryKey}
              index={revealedFigures.length + index}>
              <SealedFigurePanel figure={figure} />
            </StaggerItem>
          ))}
        </View>
      )}
    </AppLayout>
  );
};

const explorerMytthofStyles = StyleSheet.create({
  explorerMytthofScreenHeading: {
    color: colors.gold,
    fontSize: 48.1,
    fontWeight: '500',
    lineHeight: 48.2,
    marginBottom: 8.3,
    marginTop: 25.4,
  },
  explorerMytthofScreenSubheading: {
    color: colors.textMuted,
    fontSize: 16.5,
    lineHeight: 24.1,
    marginBottom: 8.2,
  },
  explorerMytthofMetricLine: {
    color: colors.accent,
    fontSize: 16.3,
    lineHeight: 24.4,
    marginBottom: 24.5,
  },
  explorerMytthofContentGroup: {
    gap: 16.1,
    marginBottom: 24.2,
  },
  explorerMytthofGroupHeading: {
    color: colors.gold,
    fontSize: 24.3,
    fontWeight: '500',
    lineHeight: 32.4,
    marginBottom: 4.5,
  },
  explorerMytthofGroupHeadingMuted: {
    color: colors.textMutedFaint,
    fontSize: 24.1,
    fontWeight: '500',
    lineHeight: 32.2,
    marginBottom: 4.3,
  },
  explorerMytthofRevealedPanel: {
    borderRadius: 16.4,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    backgroundColor: 'rgba(90, 58, 36, 0.31)',
    marginBottom: 16.1,
  },
  explorerMytthofMediaFrame: {
    position: 'relative',
    marginTop: 20.2,
  },
  explorerMytthofMediaAsset: {
    alignSelf: 'center',
  },
  explorerMytthofTagChip: {
    position: 'absolute',
    top: 16.3,
    right: 16.4,
    backgroundColor: colors.badge,
    paddingHorizontal: 12.5,
    paddingVertical: 4.1,
    borderRadius: 20.2,
  },
  explorerMytthofTagLabel: {
    color: colors.textDark,
    fontSize: 14.3,
  },
  explorerMytthofPanelBody: {
    padding: 24.4,
    gap: 12.5,
  },
  explorerMytthofPanelTitle: {
    color: colors.gold,
    fontSize: 24.1,
    fontWeight: '500',
    lineHeight: 32.2,
  },
  explorerMytthofPanelCopy: {
    color: colors.textMutedLight,
    fontSize: 16.3,
    lineHeight: 26.4,
  },
  explorerMytthofActionPressable: {
    borderRadius: 20.5,
    overflow: 'hidden',
    marginTop: 4.1,
  },
  explorerMytthofActionSurface: {
    minHeight: 48.2,
    borderRadius: 20.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8.4,
  },
  explorerMytthofActionGlyph: {
    width: 20.5,
    height: 20.1,
  },
  explorerMytthofActionLabel: {
    color: colors.textDark,
    fontSize: 16.2,
    fontWeight: '500',
  },
  explorerMytthofSealedPanel: {
    borderRadius: 16.3,
    overflow: 'hidden',
    borderWidth: 1.4,
    borderColor: colors.borderStrong,
    backgroundColor: colors.cardLocked,
    opacity: 0.6,
    marginBottom: 16.5,
  },
  explorerMytthofSealedMediaFrame: {
    height: 192.1,
    position: 'relative',
  },
  explorerMytthofSealedMedia: {
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  explorerMytthofSealedVeil: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 15, 10, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8.2,
    paddingHorizontal: 24.3,
  },
  explorerMytthofSealedGlyph: {
    fontSize: 40.4,
  },
  explorerMytthofSealedHint: {
    color: colors.textMutedSoft,
    fontSize: 14.5,
    lineHeight: 20.1,
    textAlign: 'center',
  },
  explorerMytthofSealedTag: {
    position: 'absolute',
    top: 16.2,
    right: 16.3,
    backgroundColor: 'rgba(212, 165, 116, 0.2)',
    paddingHorizontal: 12.4,
    paddingVertical: 4.5,
    borderRadius: 20.1,
  },
  explorerMytthofSealedTagLabel: {
    color: colors.textMutedSoft,
    fontSize: 14.2,
  },
  explorerMytthofSealedFooter: {
    paddingHorizontal: 24.3,
    paddingVertical: 24.4,
  },
  explorerMytthofSealedTitle: {
    color: colors.textMutedDim,
    fontSize: 20.5,
    fontWeight: '500',
    lineHeight: 28.1,
  },
  explorerMytthofPressedState: {
    opacity: 0.85,
  },
});

export default CharactersScreen;
