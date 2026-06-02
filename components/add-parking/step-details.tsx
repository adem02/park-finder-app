import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { ADD_PARKING_RULES } from '@/constants/Parking';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

interface StepDetailsProps {
  name: string;
  onNameChange: (v: string) => void;
  totalSpots: number;
  onTotalSpotsChange: (v: number) => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function StepDetails({
  name,
  onNameChange,
  totalSpots,
  onTotalSpotsChange,
  onIncrement,
  onDecrement,
}: StepDetailsProps) {
  const atMin = totalSpots <= ADD_PARKING_RULES.spotsMin;
  const atMax = totalSpots >= ADD_PARKING_RULES.spotsMax;

  const [draft, setDraft] = useState(String(totalSpots));
  useEffect(() => {
    setDraft(String(totalSpots));
  }, [totalSpots]);

  const commitDraft = () => {
    const parsed = parseInt(draft, 10);
    if (Number.isFinite(parsed)) {
      onTotalSpotsChange(parsed);
    } else {
      setDraft(String(totalSpots));
    }
  };

  return (
    <View style={styles.section}>
      <View style={styles.field}>
        <Text style={styles.label}>NOM DU PARKING</Text>
        <TextInput
          value={name}
          onChangeText={onNameChange}
          placeholder="Ex: Parking de la Gare"
          placeholderTextColor={Colors.muted}
          style={styles.input}
          maxLength={ADD_PARKING_RULES.nameMax}
        />
      </View>

      <View style={styles.counterCard}>
        <View style={styles.counterText}>
          <Text style={styles.label}>NOMBRE DE PLACES</Text>
          <Text style={styles.counterTitle}>Capacité totale</Text>
        </View>
        <View style={styles.counterControls}>
          <Pressable
            onPress={onDecrement}
            disabled={atMin}
            style={[styles.counterBtn, atMin && styles.counterBtnDisabled]}
          >
            <Ionicons
              name="remove"
              size={20}
              color={atMin ? Colors.muted : Colors.primary}
            />
          </Pressable>
          <TextInput
            value={draft}
            onChangeText={(v) => setDraft(v.replace(/[^0-9]/g, ''))}
            onBlur={commitDraft}
            onSubmitEditing={commitDraft}
            keyboardType="number-pad"
            returnKeyType="done"
            maxLength={String(ADD_PARKING_RULES.spotsMax).length}
            selectTextOnFocus
            style={styles.counterValue}
          />
          <Pressable
            onPress={onIncrement}
            disabled={atMax}
            style={[
              styles.counterBtn,
              styles.counterBtnPrimary,
              atMax && styles.counterBtnDisabled,
            ]}
          >
            <Ionicons name="add" size={20} color="#fff" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: Spacing.md },
  field: { gap: Spacing.xs },
  label: {
    ...Typography.badge,
    color: Colors.textSecondary,
    letterSpacing: 0.6,
    fontWeight: '700',
  },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    height: 48,
    ...Typography.body,
    color: Colors.textPrimary,
  },
  counterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.md,
  },
  counterText: { flex: 1, gap: 2 },
  counterTitle: { ...Typography.cardTitle, color: Colors.textPrimary },
  counterControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: 4,
    backgroundColor: Colors.background,
    borderRadius: Radius.md,
  },
  counterBtn: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterBtnPrimary: { backgroundColor: Colors.primary },
  counterBtnDisabled: { opacity: 0.5 },
  counterValue: {
    minWidth: 56,
    paddingHorizontal: Spacing.xs,
    textAlign: 'center',
    ...Typography.pageTitle,
    color: Colors.primary,
    fontWeight: '800',
  },
});
