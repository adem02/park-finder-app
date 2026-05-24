import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

const MAP_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC4G5LbwPfYVoWG1zzZQCa6NSBADmnS6aSVMEodzjxwtigi3etVczNHie40FUBwtlhID5m4J084sAERWfdJlRs_Iq0Fs5nEr4uoRVetJlGoDM_Kn2sMxjrCXjLOaMXge9OoFD83ntVu0gG8KL93B9OWhRucwY8a1bEX3yu8tmOxZgCykY2649AjNsJOF-igXCjf384JvyPwTfgYMooLPGOJcofzbUvuu9usHXZoR9s71JgG_M71yq-NO3oBHEHDv0exCECRnLuqea82';

export function SlideFindSpots() {
  return (
    <View style={styles.container}>
      <View style={styles.visual}>
        <Image
          source={{ uri: MAP_IMAGE }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.overlay} />
        <View style={styles.pin}>
          <Ionicons name="compass" size={32} color={Colors.surface} />
        </View>
      </View>

      <View style={styles.textBlock}>
        <Text style={styles.title}>Trouvez des places gratuites</Text>
        <Text style={styles.description}>
          Accédez à une carte en temps réel répertoriant toutes les options de
          stationnement gratuit dans votre zone urbaine.
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
    maxWidth: 320,
    aspectRatio: 1,
    borderRadius: 32,
    backgroundColor: '#ecedf7',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
  },
  image: { width: '100%', height: '100%' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(249,249,255,0.2)',
  },
  pin: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 72,
    height: 72,
    marginLeft: -36,
    marginTop: -36,
    borderRadius: Radius.pill,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
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
