import { memo, useEffect, useState } from 'react';
import { Marker, type MapMarkerProps as RNMarkerProps } from 'react-native-maps';

import { ParkingPin } from './parking-pin';
import { Colors, PinColors } from '@/constants/Colors';

interface MapMarkerProps {
  id: string;
  coordinate: { latitude: number; longitude: number };
  selected: boolean;
  onPress: (id: string) => void;
}

function MapMarkerBase({ id, coordinate, selected, onPress }: MapMarkerProps) {
  const [tracks, setTracks] = useState(true);

  // Le style change → on autorise un nouveau snapshot du pin
  useEffect(() => {
    setTracks(true);
  }, [selected]);

  useEffect(() => {
    if (!tracks) return;
    // Un petit délai pour laisser le pin custom finir son layout côté natif
    // avant de figer le snapshot. Sans ça, Android affiche parfois un marker vide.
    const timeout = setTimeout(() => setTracks(false), 60);
    return () => clearTimeout(timeout);
  }, [tracks]);

  const handlePress: RNMarkerProps['onPress'] = (e) => {
    e.stopPropagation?.();
    onPress(id);
  };

  return (
    <Marker
      identifier={id}
      coordinate={coordinate}
      anchor={{ x: 0.5, y: 1 }}
      onPress={handlePress}
      tracksViewChanges={tracks}
    >
      <ParkingPin
        selected={selected}
        color={selected ? Colors.primary : PinColors.available}
      />
    </Marker>
  );
}

export const MapMarker = memo(MapMarkerBase, (prev, next) => {
  return (
    prev.id === next.id &&
    prev.selected === next.selected &&
    prev.coordinate.latitude === next.coordinate.latitude &&
    prev.coordinate.longitude === next.coordinate.longitude &&
    prev.onPress === next.onPress
  );
});
