import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

interface ProgressStepperProps {
  step: 1 | 2 | 3;
  label: string;
  total?: number;
}

export function ProgressStepper({
  step,
  label,
  total = 3,
}: ProgressStepperProps) {
  return (
    <View style={styles.root}>
      <View style={styles.labels}>
        <Text style={styles.stepText}>
          Étape {step} sur {total}
        </Text>
        <Text style={styles.name}>{label}</Text>
      </View>
      <View style={styles.bar}>
        {Array.from({ length: total }).map((_, i) => {
          const n = i + 1;
          return (
            <View
              key={n}
              style={[
                styles.segment,
                n < step && styles.segmentDone,
                n === step && styles.segmentCurrent,
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    gap: Spacing.xs,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepText: {
    ...Typography.badge,
    color: Colors.primary,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  name: {
    ...Typography.badge,
    color: Colors.textSecondary,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  bar: {
    flexDirection: 'row',
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: Radius.pill,
    overflow: 'hidden',
    gap: 2,
  },
  segment: { flex: 1, backgroundColor: 'transparent' },
  segmentDone: { backgroundColor: Colors.success },
  segmentCurrent: { backgroundColor: Colors.primary },
});
