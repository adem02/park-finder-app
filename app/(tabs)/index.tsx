import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import MapView, {
  type LatLng,
  Marker,
  type Region,
} from 'react-native-maps';

import { parkingsApi } from '@/api/parkings.api';
import { ParkingPin } from '@/components/map/parking-pin';
import { ParkingPreviewCard } from '@/components/map/parking-preview-card';
import { Colors, PinColors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';
import type { ParkingListItem } from '@/types/parking.types';

const FALLBACK_REGION: Region = {
  latitude: 48.8566,
  longitude: 2.3522,
  latitudeDelta: 0.04,
  longitudeDelta: 0.04,
};

const ZOOMED_DELTA = { latitudeDelta: 0.02, longitudeDelta: 0.02 };

export default function MapScreen() {
  const mapRef = useRef<MapView | null>(null);
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [parkings, setParkings] = useState<ParkingListItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const fetchNearby = useCallback(async (center: LatLng) => {
    try {
      const res = await parkingsApi.findNearby({
        latitude: center.latitude,
        longitude: center.longitude,
      });
      setParkings(res.parkings);
    } catch (e) {
      if (__DEV__) console.warn('[map] findNearby failed', e);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        if (!cancelled) {
          setPermissionDenied(true);
          await fetchNearby(FALLBACK_REGION);
        }
        return;
      }

      try {
        const pos = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        if (cancelled) return;

        const here: LatLng = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };
        setUserLocation(here);
        mapRef.current?.animateToRegion({ ...here, ...ZOOMED_DELTA }, 600);
        await fetchNearby(here);
      } catch (e) {
        if (__DEV__) console.warn('[map] location failed', e);
        await fetchNearby(FALLBACK_REGION);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [fetchNearby]);

  const handleRecenter = useCallback(async () => {
    if (userLocation) {
      mapRef.current?.animateToRegion(
        { ...userLocation, ...ZOOMED_DELTA },
        600,
      );
      return;
    }
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Localisation désactivée',
        'Activez la localisation pour centrer la carte sur votre position.',
      );
      return;
    }
    const pos = await Location.getCurrentPositionAsync({});
    const here: LatLng = {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    };
    setUserLocation(here);
    mapRef.current?.animateToRegion({ ...here, ...ZOOMED_DELTA }, 600);
  }, [userLocation]);

  const selected = parkings.find((p) => p.id === selectedId) ?? null;

  if (Platform.OS === 'web') {
    return (
      <SafeAreaView style={styles.fallback} edges={['top']}>
        <Text style={styles.fallbackTitle}>Carte indisponible sur le web</Text>
        <Text style={styles.fallbackBody}>
          Ouvrez l&apos;app sur iOS ou Android.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.root}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={FALLBACK_REGION}
        showsUserLocation={!permissionDenied}
        showsMyLocationButton={false}
        showsCompass={false}
        toolbarEnabled={false}
        onPress={() => setSelectedId(null)}
      >
        {parkings.map((p) => (
          <Marker
            key={p.id}
            coordinate={p.coordinates}
            anchor={{ x: 0.5, y: 1 }}
            tracksViewChanges={false}
            onPress={(e) => {
              e.stopPropagation?.();
              setSelectedId(p.id);
            }}
          >
            <ParkingPin
              selected={selectedId === p.id}
              color={selectedId === p.id ? Colors.primary : PinColors.available}
            />
          </Marker>
        ))}
      </MapView>

      <SafeAreaView pointerEvents="box-none" style={styles.topBar} edges={['top']}>
        <Pressable style={styles.search} onPress={() => undefined}>
          <Ionicons name="search" size={20} color={Colors.textSecondary} />
          <Text style={styles.searchPlaceholder} numberOfLines={1}>
            Rechercher un parking…
          </Text>
          <Ionicons name="options" size={20} color={Colors.primary} />
        </Pressable>
      </SafeAreaView>

      <View pointerEvents="box-none" style={styles.fabs}>
        <Pressable
          accessibilityLabel="Recentrer"
          onPress={handleRecenter}
          style={styles.fabSecondary}
        >
          <Ionicons name="locate" size={22} color={Colors.primary} />
        </Pressable>

        <Pressable
          accessibilityLabel="Ajouter un parking"
          onPress={() =>
            Alert.alert(
              'Bientôt disponible',
              'L’ajout de parking arrive prochainement.',
            )
          }
          style={styles.fabPrimary}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </Pressable>
      </View>

      {selected ? (
        <View pointerEvents="box-none" style={styles.bottomLayer}>
          <ParkingPreviewCard
            parking={selected}
            onClose={() => setSelectedId(null)}
            onPressDetails={() =>
              Alert.alert(
                'Bientôt disponible',
                `Détails de “${selected.name}” à venir.`,
              )
            }
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  searchPlaceholder: {
    flex: 1,
    color: Colors.textSecondary,
    fontSize: 15,
  },
  fabs: {
    position: 'absolute',
    right: Spacing.md,
    bottom: Spacing.lg,
    gap: Spacing.sm,
    alignItems: 'flex-end',
  },
  fabSecondary: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  fabPrimary: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  bottomLayer: {
    position: 'absolute',
    left: Spacing.md,
    right: Spacing.md,
    bottom: Spacing.md,
  },
  fallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    backgroundColor: Colors.background,
  },
  fallbackTitle: {
    ...Typography.pageTitle,
    color: Colors.textPrimary,
  },
  fallbackBody: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
});
