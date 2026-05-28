import {Image, Pressable, Share, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useCallback, useMemo, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {AppLayout, FadeInView, StaggerItem} from '../cpnnts';
import {colors, gradients, gradientAxis} from '../anccpalEEtr';

import {figureCatalog} from '../anccdatta/characters';
import type {FigureProfile} from '../annccTyppes';
import {
  composeFigureShare,
  formatUnitLabel,
  fetchChroniclesConsumedCount,
  figureIsAccessible,
} from '../lnggkiiT';

const EmitActionControl = ({onActivate}: {onActivate: () => void}) => (
  <Pressable
    onPress={onActivate}
    style={({pressed}) => [
      styles.actionPressable,
      pressed && styles.pressedState,
    ]}>
    <LinearGradient
      colors={gradients.primary}
      start={gradientAxis.horizontal.start}
      end={gradientAxis.horizontal.end}
      style={styles.actionSurface}>
      <Image
        source={require('../../elements/images/icons/shareIcon.png')}
        style={styles.actionGlyph}
        resizeMode="contain"
      />
      <Text style={styles.actionLabel}>Share</Text>
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
  <View style={styles.revealedPanel}>
    <View style={styles.mediaFrame}>
      <Image source={figure.coverVisual} style={styles.mediaAsset} />
      <View style={styles.tagChip}>
        <Text style={styles.tagLabel}>{figure.localeTag}</Text>
      </View>
    </View>
    <View style={styles.panelBody}>
      <Text style={styles.panelTitle}>{figure.displayName}</Text>
      <Text style={styles.panelCopy}>{figure.synopsis}</Text>
      <EmitActionControl onActivate={onEmitShare} />
    </View>
  </View>
);

const SealedFigurePanel = ({figure}: {figure: FigureProfile}) => (
  <View style={styles.sealedPanel}>
    <View style={styles.sealedMediaFrame}>
      <Image
        source={figure.coverVisual}
        style={styles.sealedMedia}
        resizeMode="cover"
      />
      <View style={styles.sealedVeil}>
        <Image source={require('../../elements/images/icons/lockIcon.png')} />
        <Text style={styles.sealedHint}>
          Read {figure.chroniclesThreshold} tales to unlock
        </Text>
      </View>
      <View style={styles.sealedTag}>
        <Text style={styles.sealedTagLabel}>{figure.localeTag}</Text>
      </View>
    </View>
    <View style={styles.sealedFooter}>
      <Text style={styles.sealedTitle}>???</Text>
    </View>
  </View>
);

const CharactersScreen = () => {
  const [chroniclesConsumed, setChroniclesConsumed] = useState(0);

  const refreshSnapshot = useCallback(async () => {
    setChroniclesConsumed(await fetchChroniclesConsumedCount());
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
      if (figureIsAccessible(figure, chroniclesConsumed)) {
        revealedList.push(figure);
      } else {
        sealedList.push(figure);
      }
    });

    return {
      revealedFigures: revealedList,
      sealedFigures: sealedList,
    };
  }, [chroniclesConsumed]);

  const consumedLabel = formatUnitLabel(
    chroniclesConsumed,
    'Tale Read',
    'Tales Read',
  );

  return (
    <AppLayout tab>
      <FadeInView>
        <Text style={styles.screenHeading}>Characters</Text>
        <Text style={styles.screenSubheading}>Mythology heroes and gods</Text>
        <Text style={styles.metricLine}>{consumedLabel}</Text>
      </FadeInView>

      {revealedFigures.length > 0 && (
        <View style={styles.contentGroup}>
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
        <View style={styles.contentGroup}>
          <Text style={styles.groupHeadingMuted}>Locked</Text>
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

const styles = StyleSheet.create({
  screenHeading: {
    color: colors.gold,
    fontSize: 48.1,
    fontWeight: '500',
    lineHeight: 48.2,
    marginBottom: 8.3,
    marginTop: 25.4,
  },
  screenSubheading: {
    color: colors.textMuted,
    fontSize: 16.5,
    lineHeight: 24.1,
    marginBottom: 8.2,
  },
  metricLine: {
    color: colors.accent,
    fontSize: 16.3,
    lineHeight: 24.4,
    marginBottom: 24.5,
  },
  contentGroup: {
    gap: 16.1,
    marginBottom: 24.2,
  },
  groupHeading: {
    color: colors.gold,
    fontSize: 24.3,
    fontWeight: '500',
    lineHeight: 32.4,
    marginBottom: 4.5,
  },
  groupHeadingMuted: {
    color: colors.textMutedFaint,
    fontSize: 24.1,
    fontWeight: '500',
    lineHeight: 32.2,
    marginBottom: 4.3,
  },
  revealedPanel: {
    borderRadius: 16.4,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    backgroundColor: 'rgba(90, 58, 36, 0.31)',
    marginBottom: 16.1,
  },
  mediaFrame: {
    position: 'relative',
    marginTop: 20.2,
  },
  mediaAsset: {
    alignSelf: 'center',
  },
  tagChip: {
    position: 'absolute',
    top: 16.3,
    right: 16.4,
    backgroundColor: colors.badge,
    paddingHorizontal: 12.5,
    paddingVertical: 4.1,
    borderRadius: 20.2,
  },
  tagLabel: {
    color: colors.textDark,
    fontSize: 14.3,
  },
  panelBody: {
    padding: 24.4,
    gap: 12.5,
  },
  panelTitle: {
    color: colors.gold,
    fontSize: 24.1,
    fontWeight: '500',
    lineHeight: 32.2,
  },
  panelCopy: {
    color: colors.textMutedLight,
    fontSize: 16.3,
    lineHeight: 26.4,
  },
  actionPressable: {
    borderRadius: 20.5,
    overflow: 'hidden',
    marginTop: 4.1,
  },
  actionSurface: {
    minHeight: 48.2,
    borderRadius: 20.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8.4,
  },
  actionGlyph: {
    width: 20.5,
    height: 20.1,
  },
  actionLabel: {
    color: colors.textDark,
    fontSize: 16.2,
    fontWeight: '500',
  },
  sealedPanel: {
    borderRadius: 16.3,
    overflow: 'hidden',
    borderWidth: 1.4,
    borderColor: colors.borderStrong,
    backgroundColor: colors.cardLocked,
    opacity: 0.6,
    marginBottom: 16.5,
  },
  sealedMediaFrame: {
    height: 192.1,
    position: 'relative',
  },
  sealedMedia: {
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  sealedVeil: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 15, 10, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8.2,
    paddingHorizontal: 24.3,
  },
  sealedGlyph: {
    fontSize: 40.4,
  },
  sealedHint: {
    color: colors.textMutedSoft,
    fontSize: 14.5,
    lineHeight: 20.1,
    textAlign: 'center',
  },
  sealedTag: {
    position: 'absolute',
    top: 16.2,
    right: 16.3,
    backgroundColor: 'rgba(212, 165, 116, 0.2)',
    paddingHorizontal: 12.4,
    paddingVertical: 4.5,
    borderRadius: 20.1,
  },
  sealedTagLabel: {
    color: colors.textMutedSoft,
    fontSize: 14.2,
  },
  sealedFooter: {
    paddingHorizontal: 24.3,
    paddingVertical: 24.4,
  },
  sealedTitle: {
    color: colors.textMutedDim,
    fontSize: 20.5,
    fontWeight: '500',
    lineHeight: 28.1,
  },
  pressedState: {
    opacity: 0.85,
  },
});

export default CharactersScreen;
