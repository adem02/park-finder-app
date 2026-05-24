import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

interface AuthHeaderProps {
  onClose: () => void;
}

export function AuthHeader({ onClose }: AuthHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.brand}>ParkFinder</Text>
      <Pressable
        style={styles.closeButton}
        onPress={onClose}
        hitSlop={8}
        accessibilityLabel="Fermer"
      >
        <Ionicons name="close" size={24} color={Colors.primary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  brand: {
    ...Typography.pageTitle,
    color: Colors.primary,
    fontSize: 26,
    fontWeight: '700',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
