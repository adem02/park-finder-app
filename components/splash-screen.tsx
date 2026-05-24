import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

const GRADIENT_COLORS = ['#2170e4', '#0058be'] as const;

export function SplashScreen() {
  return (
    <LinearGradient
      colors={GRADIENT_COLORS}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <View style={styles.center}>
        <View style={styles.glow} />
        <View style={styles.logoCard}>
          <Ionicons name="car-sport" size={64} color={Colors.primary} />
          <View style={styles.badge}>
            <Ionicons name="navigate" size={14} color="#00714d" />
          </View>
        </View>

        <View style={styles.dots}>
          <View style={[styles.dot, styles.dotAccent]} />
          <View style={[styles.dot, styles.dotPill]} />
          <View style={styles.dot} />
        </View>
      </View>

      <View style={styles.brandBlock}>
        <Text style={styles.brand}>ParkFinder</Text>
        <Text style={styles.tagline}>YOUR URBAN CO-PILOT</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: Spacing.xl * 2,
  },
  center: { alignItems: 'center', justifyContent: 'center' },
  glow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: Radius.pill,
    backgroundColor: '#adc6ff',
    opacity: 0.2,
  },
  logoCard: {
    width: 128,
    height: 128,
    backgroundColor: '#ffffff',
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 32,
    height: 32,
    borderRadius: Radius.pill,
    backgroundColor: '#6cf8bb',
    borderWidth: 4,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dots: {
    marginTop: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: Radius.pill,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  dotAccent: {
    backgroundColor: '#6ffbbe',
  },
  dotPill: {
    width: 32,
  },
  brandBlock: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  brand: {
    ...Typography.pageTitle,
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  tagline: {
    ...Typography.caption,
    color: 'rgba(216, 226, 255, 0.8)',
    letterSpacing: 2,
    fontWeight: '700',
  },
});
