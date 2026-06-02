import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

export type SearchViewMode = 'list' | 'map';

interface ViewToggleProps {
  value: SearchViewMode;
  onChange: (mode: SearchViewMode) => void;
}

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <View style={styles.wrap}>
      <Segment
        active={value === 'list'}
        icon="list"
        label="Liste"
        onPress={() => onChange('list')}
      />
      <Segment
        active={value === 'map'}
        icon="map"
        label="Carte"
        onPress={() => onChange('map')}
      />
    </View>
  );
}

interface SegmentProps {
  active: boolean;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  onPress: () => void;
}

function Segment({ active, icon, label, onPress }: SegmentProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.segment, active && styles.segmentActive]}
    >
      <Ionicons
        name={icon}
        size={16}
        color={active ? '#fff' : Colors.textSecondary}
      />
      <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: Radius.pill,
    padding: 4,
    gap: 4,
  },
  segment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.pill,
  },
  segmentActive: {
    backgroundColor: Colors.primary,
  },
  label: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  labelActive: {
    color: '#fff',
  },
});
