import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

const SCENE_IMAGE =
  'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80';

export function SlideCommunity() {
  return (
    <View style={styles.container}>
      <View style={styles.visual}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: SCENE_IMAGE }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.badge}>
          <Ionicons name="checkmark-circle" size={14} color="#00714d" />
          <Text style={styles.badgeText}>LIBRE</Text>
        </View>
      </View>

      <View style={styles.textBlock}>
        <Text style={styles.title}>Une communauté soudée</Text>
        <Text style={styles.description}>
          Signalez votre départ et aidez les autres conducteurs à trouver une
          place sans attendre.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.md,
    gap: Spacing.xl,
  },
  visual: {
    width: '100%',
    maxWidth: 340,
    aspectRatio: 1,
    backgroundColor: Colors.surface,
    borderRadius: 32,
    padding: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    position: 'relative',
  },
  imageWrapper: {
    flex: 1,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#2e4a5e',
  },
  image: { width: '100%', height: '100%' },
  badge: {
    position: 'absolute',
    top: Spacing.lg,
    right: Spacing.lg,
    backgroundColor: '#6cf8bb',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  badgeText: {
    ...Typography.caption,
    color: '#00714d',
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  textBlock: {
    alignItems: 'center',
    gap: Spacing.md,
    maxWidth: 360,
  },
  title: {
    ...Typography.pageTitle,
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  description: {
    ...Typography.body,
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
