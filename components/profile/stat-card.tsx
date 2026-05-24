import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

interface StatCardProps {
  value: number;
  label: string;
  valueColor: string;
}

export function StatCard({ value, label, valueColor }: StatCardProps) {
  return (
    <View style={styles.card}>
      <Text style={[styles.value, { color: valueColor }]}>
        {value.toLocaleString('fr-FR')}
      </Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    alignItems: 'center',
    gap: Spacing.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  value: { fontSize: 28, fontWeight: '800', lineHeight: 32 },
  label: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    textAlign: 'center',
  },
});
