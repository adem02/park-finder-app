import { useCallback, useEffect, useRef, useState } from 'react';
import { Linking, Platform, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { type Region } from 'react-native-maps';

import { LocationPermissionBanner } from '@/components/map/location-permission-banner';
import { MapFabs } from '@/components/map/map-fabs';
import { MapMarker } from '@/components/map/map-marker';
import { MapTopBar } from '@/components/map/map-top-bar';
import { ParkingPreviewCard } from '@/components/map/parking-preview-card';
import { useCurrentLocation } from '@/hooks/use-current-location';
import { useMapAutoRefetch } from '@/hooks/use-map-auto-refetch';
import { useNearbyParkings } from '@/hooks/use-nearby-parkings';
import { FALLBACK_CENTER } from '@/lib/map';
import type { ParkingRadius } from '@/types/parking.types';

import { styles } from './index.styles';

const FALLBACK_REGION: Region = {
  ...FALLBACK_CENTER,
  latitudeDelta: 0.04,
  longitudeDelta: 0.04,
};

const ZOOMED_DELTA = { latitudeDelta: 0.02, longitudeDelta: 0.02 };

const MAP_RADIUS: ParkingRadius = 5000;

export default function MapScreen() {
  const mapRef = useRef<MapView | null>(null);
  const hasCenteredRef = useRef(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleMarkerPress = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const {
    coordinates,
    source,
    denied,
    refresh: refreshLocation,
  } = useCurrentLocation({ fallback: FALLBACK_CENTER, watch: true });

  // Tant que le GPS n'a pas répondu, on ne transmet aucune position au hook
  // de refetch : ça empêche tout fetch (et donc tout marker) sur le fallback.
  const gpsCoordinates = source === 'gps' ? coordinates : null;

  const { effectiveCenter, setCenter, onRegionChangeComplete } =
    useMapAutoRefetch({ userLocation: gpsCoordinates, radius: MAP_RADIUS });

  const { items, refreshing, refresh } = useNearbyParkings({
    center: effectiveCenter,
    radius: MAP_RADIUS,
  });
  const parkings = items.map((it) => it.parking);

  // Skip le tout premier focus (données déjà fetchées au mount). Ensuite,
  // chaque retour sur cet onglet (ex: après ajout d'un parking, ou vote/
  // signalement sur l'écran détails) relance un refresh silencieux.
  const hasFocusedOnceRef = useRef(false);
  useFocusEffect(
    useCallback(() => {
      if (!hasFocusedOnceRef.current) {
        hasFocusedOnceRef.current = true;
        return;
      }
      void refresh();
    }, [refresh]),
  );

  useEffect(() => {
    if (source === 'gps' && coordinates && !hasCenteredRef.current) {
      hasCenteredRef.current = true;
      mapRef.current?.animateToRegion({ ...coordinates, ...ZOOMED_DELTA }, 600);
    }
  }, [coordinates, source]);

  const handleRecenter = useCallback(async () => {
    if (source === 'gps' && coordinates) {
      mapRef.current?.animateToRegion({ ...coordinates, ...ZOOMED_DELTA }, 600);
      setCenter(coordinates);
      return;
    }
    await refreshLocation();
  }, [coordinates, refreshLocation, setCenter, source]);

  const handleOpenSettings = useCallback(() => {
    void Linking.openSettings();
  }, []);

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
        showsUserLocation={!denied}
        showsMyLocationButton={false}
        showsCompass={false}
        toolbarEnabled={false}
        onPress={() => setSelectedId(null)}
        onRegionChangeComplete={
          source === 'gps' ? onRegionChangeComplete : undefined
        }
      >
        {parkings.map((p) => (
          <MapMarker
            key={p.id}
            id={p.id}
            coordinate={p.coordinates}
            selected={selectedId === p.id}
            onPress={handleMarkerPress}
          />
        ))}
      </MapView>

      <MapTopBar
        refreshing={refreshing}
        onSearchPress={() => router.push('/search')}
      />

      <MapFabs
        onRecenter={handleRecenter}
        onAdd={() => router.push('/parking/add')}
      />

      {denied ? (
        <LocationPermissionBanner
          onRetry={() => void refreshLocation()}
          onOpenSettings={handleOpenSettings}
        />
      ) : null}

      {selected ? (
        <View pointerEvents="box-none" style={styles.bottomLayer}>
          <ParkingPreviewCard
            parking={selected}
            onClose={() => setSelectedId(null)}
            onPressDetails={() =>
              router.push({
                pathname: '/parking/[id]',
                params: { id: selected.id },
              })
            }
          />
        </View>
      ) : null}
    </View>
  );
}
