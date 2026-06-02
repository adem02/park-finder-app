import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { ADD_PARKING_RULES } from '@/constants/Parking';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';
import type { NewParkingPhoto } from '@/types/parking.types';

interface StepPhotoProps {
  photos: NewParkingPhoto[];
  canAddPhoto: boolean;
  onPick: () => void;
  onRemove: (index: number) => void;
}

export function StepPhoto({
  photos,
  canAddPhoto,
  onPick,
  onRemove,
}: StepPhotoProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Photos du parking</Text>
      <Text style={styles.help}>
        Optionnel — ajoutez jusqu’à {ADD_PARKING_RULES.photosMax} photos pour
        aider la communauté à reconnaître le lieu.
      </Text>

      <View style={styles.grid}>
        {photos.map((p, i) => (
          <View key={`${p.uri}-${i}`} style={styles.tile}>
            <Image source={{ uri: p.uri }} style={styles.img} />
            <Pressable
              onPress={() => onRemove(i)}
              hitSlop={8}
              style={styles.remove}
              accessibilityLabel="Retirer la photo"
            >
              <Ionicons name="close" size={16} color="#fff" />
            </Pressable>
          </View>
        ))}

        {canAddPhoto && (
          <Pressable
            onPress={onPick}
            style={[styles.tile, styles.addTile]}
            accessibilityLabel="Ajouter une photo"
          >
            <Ionicons name="camera" size={28} color={Colors.primary} />
            <Text style={styles.addLabel}>Ajouter</Text>
          </Pressable>
        )}
      </View>

      <Text style={styles.counter}>
        {photos.length} / {ADD_PARKING_RULES.photosMax}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: Spacing.md },
  title: { ...Typography.sectionTitle, color: Colors.textPrimary },
  help: { ...Typography.body, color: Colors.textSecondary },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  tile: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: Radius.md,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
    position: 'relative',
  },
  img: { width: '100%', height: '100%' },
  remove: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addTile: {
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  addLabel: { ...Typography.caption, color: Colors.primary, fontWeight: '600' },
  counter: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'right',
  },
});
