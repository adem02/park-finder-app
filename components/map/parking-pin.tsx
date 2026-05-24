import { StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/Colors';

interface ParkingPinProps {
  selected?: boolean;
  color?: string;
}

export function ParkingPin({
  selected = false,
  color = Colors.success,
}: ParkingPinProps) {
  return (
    <View style={[styles.wrapper, selected && styles.wrapperSelected]}>
      <View style={[styles.pin, { backgroundColor: color }]} />
      <View style={styles.dot} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 32,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperSelected: {
    transform: [{ scale: 1.25 }],
  },
  pin: {
    width: 28,
    height: 36,
    borderRadius: 14,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    transform: [{ rotate: '45deg' }],
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  dot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
});
