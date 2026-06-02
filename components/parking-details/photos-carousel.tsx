import { useState } from 'react';
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

interface PhotosCarouselProps {
  photos: string[];
  height?: number;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

export function PhotosCarousel({ photos, height = 220 }: PhotosCarouselProps) {
  const [index, setIndex] = useState(0);

  if (photos.length === 0) {
    return (
      <View style={[styles.empty, { height }]}>
        <Ionicons name="image-outline" size={36} color={Colors.muted} />
        <Text style={styles.emptyLabel}>Aucune photo</Text>
      </View>
    );
  }

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const next = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    if (next !== index) setIndex(next);
  };

  return (
    <View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
      >
        {photos.map((uri, i) => (
          <Image
            key={`${uri}-${i}`}
            source={{ uri }}
            style={[styles.img, { width: SCREEN_WIDTH, height }]}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      {photos.length > 1 && (
        <View style={styles.dots}>
          {photos.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === index && styles.dotActive]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  img: { backgroundColor: Colors.border },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  emptyLabel: { ...Typography.caption, color: Colors.textSecondary },
  dots: {
    position: 'absolute',
    bottom: Spacing.sm,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: Radius.pill,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  dotActive: {
    backgroundColor: '#fff',
    width: 18,
  },
});
