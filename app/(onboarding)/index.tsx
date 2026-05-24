import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef, useState, type ReactNode } from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SlideCommunity } from '@/components/onboarding/slide-community';
import { SlideFindSpots } from '@/components/onboarding/slide-find-spots';
import { SlideKarma } from '@/components/onboarding/slide-karma';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

interface Slide {
  key: string;
  render: () => ReactNode;
}

const SLIDES: Slide[] = [
  { key: 'find', render: () => <SlideFindSpots /> },
  { key: 'community', render: () => <SlideCommunity /> },
  { key: 'karma', render: () => <SlideKarma /> },
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();
  const listRef = useRef<FlatList<Slide>>(null);
  const [index, setIndex] = useState(0);
  const { width } = useWindowDimensions();
  const slideWidth = width || SCREEN_WIDTH;

  const isLast = index === SLIDES.length - 1;

  const finish = () => {
    router.replace('/(auth)');
  };

  const handleNext = () => {
    if (isLast) {
      finish();
      return;
    }
    const next = index + 1;
    listRef.current?.scrollToIndex({ index: next, animated: true });
    setIndex(next);
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / slideWidth);
    if (newIndex !== index) setIndex(newIndex);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <View style={styles.brandIcon}>
            <Ionicons name="car" size={18} color={Colors.surface} />
          </View>
          <Text style={styles.brand}>ParkFinder</Text>
        </View>
        <Pressable onPress={finish} hitSlop={8}>
          <Text style={styles.skip}>PASSER</Text>
        </Pressable>
      </View>

      <FlatList
        ref={listRef}
        data={SLIDES}
        keyExtractor={(s) => s.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        renderItem={({ item }) => (
          <View style={{ width: slideWidth, flex: 1 }}>{item.render()}</View>
        )}
        getItemLayout={(_, i) => ({
          length: slideWidth,
          offset: slideWidth * i,
          index: i,
        })}
        style={styles.carousel}
      />

      <View style={styles.footer}>
        <View style={styles.dots}>
          {SLIDES.map((s, i) => (
            <View
              key={s.key}
              style={[styles.dot, i === index && styles.dotActive]}
            />
          ))}
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.primaryButton} onPress={handleNext}>
            <Text style={styles.primaryButtonText}>
              {isLast ? 'Commencer' : 'Suivant'}
            </Text>
            <Ionicons name="arrow-forward" size={18} color={Colors.surface} />
          </Pressable>
          <Pressable
            style={styles.secondaryButton}
            onPress={() => router.replace('/(auth)')}
          >
            <Text style={styles.secondaryButtonText}>Créer un compte</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  brandIcon: {
    width: 32,
    height: 32,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    ...Typography.sectionTitle,
    color: Colors.primary,
    fontWeight: '700',
  },
  skip: {
    ...Typography.caption,
    color: Colors.muted,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  carousel: { flex: 1 },
  footer: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xl,
    gap: Spacing.xl,
    alignItems: 'center',
  },
  dots: { flexDirection: 'row', gap: Spacing.sm },
  dot: {
    width: 8,
    height: 8,
    borderRadius: Radius.pill,
    backgroundColor: Colors.border,
  },
  dotActive: { backgroundColor: Colors.primary, width: 24 },
  actions: { width: '100%', maxWidth: 380, gap: Spacing.md },
  primaryButton: {
    height: 48,
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  primaryButtonText: {
    ...Typography.cardTitle,
    color: Colors.surface,
    fontWeight: '600',
  },
  secondaryButton: {
    height: 48,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    ...Typography.cardTitle,
    color: Colors.primary,
    fontWeight: '600',
  },
});
