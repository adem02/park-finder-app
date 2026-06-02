import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, type Region } from 'react-native-maps';

import { ParkingPin } from '@/components/map/parking-pin';
import { ParkingPreviewCard } from '@/components/map/parking-preview-card';
import { Colors, PinColors } from '@/constants/Colors';
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
        {items.map((it) => {
          const isSelected = selectedId === it.parking.id;
          return (
            <Marker
              key={it.parking.id}
              coordinate={it.parking.coordinates}
              anchor={{ x: 0.5, y: 1 }}
              tracksViewChanges={false}
              onPress={(e) => {
                e.stopPropagation?.();
                onSelect(it.parking.id);
              }}
            >
              <ParkingPin
                selected={isSelected}
                color={isSelected ? Colors.primary : PinColors.available}
              />
            </Marker>
          );
        })}
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
