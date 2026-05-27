import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, {Marker, type Region} from 'react-native-maps';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  anncintTlllsmythhhsHeritageSites,
  anncintTlllsmythhhsMediaRegistry,
  anncintTlllsmythhhsResolveChronicle,
  anncintTlllsmythhhsFetchChroniclesConsumedKeys,
  anncintTlllsmythhhsSpacing,
  type AnncintTlllsmythhhsHeritageSite,
} from './AnncintTlllsmythhhsCore';
import {
  AnncintTlllsmythhhsFadeInView,
  AnncintTlllsmythhhsGradientButton,
  AnncintTlllsmythhhsRegionBadge,
  AnncintTlllsmythhhsScreenHeader,
} from './AnncintTlllsmythhhsUi';
import {
  AnncintTlllsmythhhsRoutes,
  type AnncintTlllsmythhhsMainTabParamList,
} from './routes/AnncintTlllsmythhhsRoutes';

const worldRegion: Region = {
  latitude: 20,
  longitude: 10,
  latitudeDelta: 110,
  longitudeDelta: 110,
};

const MAP_CONTROL_SIZE = 44;

const FitAllIcon = () => (
  <View style={styles.fitAllIcon}>
    <View style={[styles.fitAllCorner, styles.fitAllCornerTopLeft]} />
    <View style={[styles.fitAllCorner, styles.fitAllCornerTopRight]} />
    <View style={[styles.fitAllCorner, styles.fitAllCornerBottomLeft]} />
    <View style={[styles.fitAllCorner, styles.fitAllCornerBottomRight]} />
    <View style={styles.fitAllDot} />
  </View>
);

const AnncintTlllsmythhhsMapScreen = () => {
  const navigation =
    useNavigation<
      BottomTabNavigationProp<AnncintTlllsmythhhsMainTabParamList>
    >();
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView>(null);
  const [consumedKeys, setConsumedKeys] = useState<string[]>([]);
  const [selectedSite, setSelectedSite] =
    useState<AnncintTlllsmythhhsHeritageSite | null>(null);
  const [mapRegion, setMapRegion] = useState<Region>(worldRegion);

  const tabBarBlockHeight =
    anncintTlllsmythhhsSpacing.tabBarHeight +
    Math.max(insets.bottom, anncintTlllsmythhhsSpacing.tabBarMinInset);

  const tabBarClearance = tabBarBlockHeight + 8;

  const coordinates = useMemo(
    () =>
      anncintTlllsmythhhsHeritageSites.map(site => ({
        latitude: site.latitude,
        longitude: site.longitude,
      })),
    [],
  );

  const mapEdgePadding = useMemo(
    () => ({
      top: 96,
      right: 40,
      bottom: tabBarClearance + (selectedSite ? 220 : 40),
      left: 40,
    }),
    [selectedSite, tabBarClearance],
  );

  const refreshProgress = useCallback(async () => {
    setConsumedKeys(await anncintTlllsmythhhsFetchChroniclesConsumedKeys());
  }, []);

  const fitAllSites = useCallback(
    (animated = true) => {
      mapRef.current?.fitToCoordinates(coordinates, {
        edgePadding: mapEdgePadding,
        animated,
      });
    },
    [coordinates, mapEdgePadding],
  );

  useFocusEffect(
    useCallback(() => {
      void refreshProgress();
      requestAnimationFrame(() => fitAllSites(false));
    }, [fitAllSites, refreshProgress]),
  );

  const focusSite = useCallback((site: AnncintTlllsmythhhsHeritageSite) => {
    setSelectedSite(site);
    mapRef.current?.animateToRegion(
      {
        latitude: site.latitude,
        longitude: site.longitude,
        latitudeDelta: 14,
        longitudeDelta: 14,
      },
      350,
    );
  }, []);

  const dismissSite = useCallback(() => {
    setSelectedSite(null);
    fitAllSites(true);
  }, [fitAllSites]);

  const zoomMap = useCallback(
    (direction: 'in' | 'out') => {
      const factor = direction === 'in' ? 0.5 : 2;
      const nextRegion: Region = {
        ...mapRegion,
        latitudeDelta: Math.min(
          Math.max(mapRegion.latitudeDelta * factor, 0.5),
          120,
        ),
        longitudeDelta: Math.min(
          Math.max(mapRegion.longitudeDelta * factor, 0.5),
          120,
        ),
      };
      setMapRegion(nextRegion);
      mapRef.current?.animateToRegion(nextRegion, 250);
    },
    [mapRegion],
  );

  const openReading = useCallback(() => {
    if (!selectedSite) {
      return;
    }
    navigation.navigate(AnncintTlllsmythhhsRoutes.Tales, {
      entryKey: selectedSite.entryKey,
    });
  }, [navigation, selectedSite]);

  const linkedChronicle = selectedSite
    ? anncintTlllsmythhhsResolveChronicle(selectedSite.entryKey)
    : undefined;

  const exploredCount = consumedKeys.length;
  const siteTotal = anncintTlllsmythhhsHeritageSites.length;

  return (
    <ImageBackground
      source={anncintTlllsmythhhsMediaRegistry.backgrounds.app}
      style={styles.root}>
      <View style={styles.overlay} />
      <View style={[styles.headerWrap, {paddingTop: insets.top + 12}]}>
        <AnncintTlllsmythhhsFadeInView>
          <AnncintTlllsmythhhsScreenHeader
            title="Heritage Atlas"
            subtitle="Sites across four world regions"
            progress={`${exploredCount} of ${siteTotal} sites explored`}
          />
          <Text style={styles.hint}>
            Tap a marker to view the site and open its linked reading.
          </Text>
        </AnncintTlllsmythhhsFadeInView>
      </View>

      <View style={[styles.mapWrap, {marginBottom: tabBarClearance}]}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={worldRegion}
          onRegionChangeComplete={setMapRegion}
          showsCompass={false}
          showsScale={false}
          toolbarEnabled={false}>
          {anncintTlllsmythhhsHeritageSites.map(site => {
            const explored = consumedKeys.includes(site.entryKey);
            const selected = selectedSite?.siteKey === site.siteKey;
            return (
              <Marker
                key={site.siteKey}
                coordinate={{
                  latitude: site.latitude,
                  longitude: site.longitude,
                }}
                onPress={() => focusSite(site)}>
                <View
                  style={[
                    styles.pin,
                    explored && styles.pinExplored,
                    selected && styles.pinSelected,
                  ]}
                />
              </Marker>
            );
          })}
        </MapView>

        <View style={styles.mapControls}>
          <Pressable style={styles.controlBtn} onPress={() => zoomMap('in')}>
            <Text style={styles.controlLabel}>+</Text>
          </Pressable>
          <Pressable style={styles.controlBtn} onPress={() => zoomMap('out')}>
            <Text style={styles.controlLabel}>−</Text>
          </Pressable>
          <Pressable style={styles.controlBtn} onPress={() => fitAllSites(true)}>
            <FitAllIcon />
          </Pressable>
        </View>
      </View>

      {selectedSite ? (
        <View style={[styles.sheet, {paddingBottom: tabBarBlockHeight}]}>
          <View style={styles.sheetBody}>
            <View style={styles.sheetRow}>
              {linkedChronicle ? (
                <Image
                  source={linkedChronicle.coverVisual}
                  style={styles.sheetImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.sheetImagePlaceholder} />
              )}
              <View style={styles.sheetMeta}>
                <AnncintTlllsmythhhsRegionBadge
                  region={selectedSite.localeTag}
                />
                <Text style={styles.siteName}>{selectedSite.siteName}</Text>
                <Text style={styles.synopsis}>{selectedSite.synopsis}</Text>
                {linkedChronicle ? (
                  <Text style={styles.linkedReading}>
                    Linked tale: {linkedChronicle.headline}
                  </Text>
                ) : null}
                <Text style={styles.coords}>
                  {selectedSite.latitude.toFixed(4)}°,{' '}
                  {selectedSite.longitude.toFixed(4)}°
                </Text>
              </View>
            </View>
            <AnncintTlllsmythhhsGradientButton
              label="Open reading"
              onPress={openReading}
            />
            <Pressable onPress={dismissSite} hitSlop={8} style={styles.closeBtn}>
              <Text style={styles.closeLabel}>Close</Text>
            </Pressable>
          </View>
        </View>
      ) : null}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  headerWrap: {
    paddingHorizontal: 24,
    zIndex: 2,
  },
  hint: {
    fontSize: 16,
    lineHeight: 27,
    color: 'rgba(212, 165, 116, 0.7)',
    marginBottom: 12,
  },
  mapWrap: {
    flex: 1,
    marginHorizontal: 24,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.25)',
    backgroundColor: '#2A1810',
  },
  map: {
    flex: 1,
  },
  mapControls: {
    position: 'absolute',
    top: 12,
    right: 12,
    gap: 8,
  },
  controlBtn: {
    width: MAP_CONTROL_SIZE,
    height: MAP_CONTROL_SIZE,
    backgroundColor: 'rgba(28, 18, 12, 0.88)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlLabel: {
    color: '#D4A574',
    fontSize: 22,
    lineHeight: 24,
    marginBottom: 0,
  },
  fitAllIcon: {
    width: 20,
    height: 20,
    position: 'relative',
  },
  fitAllCorner: {
    position: 'absolute',
    width: 7,
    height: 7,
    borderColor: '#D4A574',
  },
  fitAllCornerTopLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
  fitAllCornerTopRight: {
    top: 0,
    right: 0,
    borderTopWidth: 2,
    borderRightWidth: 2,
  },
  fitAllCornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  fitAllCornerBottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  fitAllDot: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D4A574',
  },
  pin: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#8E8E93',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  pinExplored: {
    backgroundColor: '#D4763E',
  },
  pinSelected: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#3D2013',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderColor: '#D4763E33',
  },
  sheetBody: {
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212, 118, 62, 0.2)',
    gap: 12,
  },
  sheetRow: {
    flexDirection: 'row',
    gap: 14,
  },
  sheetImage: {
    width: 88,
    height: 88,
    borderRadius: 14,
    backgroundColor: 'rgba(90, 58, 36, 0.21)',
  },
  sheetImagePlaceholder: {
    width: 88,
    height: 88,
    borderRadius: 14,
    backgroundColor: 'rgba(90, 58, 36, 0.21)',
  },
  sheetMeta: {
    flex: 1,
    alignItems: 'flex-start',
    gap: 6,
  },
  siteName: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 28,
    color: '#DAA520',
  },
  synopsis: {
    fontSize: 16,
    lineHeight: 27,
    color: '#D4A574',
  },
  linkedReading: {
    color: 'rgba(212, 165, 116, 0.7)',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 0,
  },
  coords: {
    color: 'rgba(212, 165, 116, 0.6)',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 0,
  },
  closeBtn: {
    alignSelf: 'center',
  },
  closeLabel: {
    color: '#D4763E',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 0,
  },
});

export default AnncintTlllsmythhhsMapScreen;
