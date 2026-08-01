import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { type Region } from 'react-native-maps';

import { MapMarker } from '@/components/map/map-marker';
import { ParkingPreviewCard } from '@/components/map/parking-preview-card';
import { Spacing } from '@/constants/Spacing';
import type { NearbyParkingItem } from '@/types/parking.types';

interface SearchMapViewProps {
  region: Region;
  items: NearbyParkingItem[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export function SearchMapView({
  region,
  items,
  selectedId,
  onSelect,
}: SearchMapViewProps) {
  const router = useRouter();
  const selected =
    items.find((it) => it.parking.id === selectedId)?.parking ?? null;

  const handleMarkerPress = useCallback(
    (id: string) => onSelect(id),
    [onSelect],
  );

  return (
    <View style={styles.mapWrap}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={region}
        region={region}
        showsUserLocation
        showsMyLocationButton={false}
        toolbarEnabled={false}
        onPress={() => onSelect(null)}
      >
        {items.map((it) => (
          <MapMarker
            key={it.parking.id}
            id={it.parking.id}
            coordinate={it.parking.coordinates}
            selected={selectedId === it.parking.id}
            onPress={handleMarkerPress}
          />
        ))}
      </MapView>

      {selected && (
        <View style={styles.bottom} pointerEvents="box-none">
          <ParkingPreviewCard
            parking={selected}
            onClose={() => onSelect(null)}
            onPressDetails={() =>
              router.push({
                pathname: '/parking/[id]',
                params: { id: selected.id },
              })
            }
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mapWrap: {
    flex: 1,
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: Spacing.md,
  },
});
