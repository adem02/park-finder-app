import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

interface OrDividerProps {
  label?: string;
}

export function OrDivider({ label = 'OU' }: OrDividerProps) {
  return (
    <View style={styles.row}>
      <View style={styles.line} />
      <Text style={styles.label}>{label}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  line: { flex: 1, height: 1, backgroundColor: Colors.border },
  label: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
});
