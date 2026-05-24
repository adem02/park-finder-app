import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

export function LegalFooter() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        En continuant, vous acceptez nos{' '}
        <Text style={styles.link}>Conditions d&apos;utilisation</Text>.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  text: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  link: { color: Colors.primary, fontWeight: '600' },
});
