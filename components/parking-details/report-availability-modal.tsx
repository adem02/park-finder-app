import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

interface ReportAvailabilityModalProps {
  visible: boolean;
  totalSpots: number;
  initialValue?: number;
  submitting?: boolean;
  onClose: () => void;
  onConfirm: (availableSpots: number) => void | Promise<void>;
}

export function ReportAvailabilityModal({
  visible,
  totalSpots,
  initialValue,
  submitting = false,
  onClose,
  onConfirm,
}: ReportAvailabilityModalProps) {
  const defaultValue = Math.min(
    totalSpots,
    Math.max(0, initialValue ?? Math.floor(totalSpots / 2)),
  );
  const [value, setValue] = useState(defaultValue);
  const [inputText, setInputText] = useState(String(defaultValue));

  useEffect(() => {
    if (visible) {
      setValue(defaultValue);
      setInputText(String(defaultValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, totalSpots]);

  const updateValue = (next: number) => {
    const clamped = Math.min(totalSpots, Math.max(0, next));
    setValue(clamped);
    setInputText(String(clamped));
  };

  const decrement = () => {
    if (value <= 0 || submitting) return;
    void Haptics.selectionAsync();
    updateValue(value - 1);
  };

  const increment = () => {
    if (value >= totalSpots || submitting) return;
    void Haptics.selectionAsync();
    updateValue(value + 1);
  };

  const handleInputChange = (text: string) => {
    const digits = text.replace(/[^0-9]/g, '');
    setInputText(digits);
    if (digits === '') {
      setValue(0);
      return;
    }
    const parsed = parseInt(digits, 10);
    if (Number.isFinite(parsed)) {
      setValue(Math.min(totalSpots, Math.max(0, parsed)));
    }
  };

  const handleInputBlur = () => {
    updateValue(value);
  };

  const handleConfirm = () => {
    if (submitting) return;
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    void onConfirm(value);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={submitting ? undefined : onClose}
    >
      <Pressable
        style={styles.backdrop}
        onPress={submitting ? undefined : onClose}
      >
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.title}>Signaler la disponibilité</Text>
          <Text style={styles.subtitle}>
            Combien de places libres voyez-vous ?
          </Text>

          <View style={styles.stepperRow}>
            <Pressable
              onPress={decrement}
              disabled={value <= 0 || submitting}
              style={[
                styles.stepperBtn,
                (value <= 0 || submitting) && styles.stepperBtnDisabled,
              ]}
            >
              <Ionicons name="remove" size={28} color={Colors.textPrimary} />
            </Pressable>

            <View style={styles.valueBox}>
              <TextInput
                value={inputText}
                onChangeText={handleInputChange}
                onBlur={handleInputBlur}
                keyboardType="number-pad"
                maxLength={String(totalSpots).length}
                editable={!submitting}
                selectTextOnFocus
                style={styles.valueInput}
              />
              <Text style={styles.valueTotal}>/ {totalSpots}</Text>
            </View>

            <Pressable
              onPress={increment}
              disabled={value >= totalSpots || submitting}
              style={[
                styles.stepperBtn,
                (value >= totalSpots || submitting) && styles.stepperBtnDisabled,
              ]}
            >
              <Ionicons name="add" size={28} color={Colors.textPrimary} />
            </Pressable>
          </View>

          <Text style={styles.helper}>
            {value === 0
              ? 'Parking complet'
              : value === totalSpots
                ? 'Parking vide'
                : `${value} place${value > 1 ? 's' : ''} disponible${value > 1 ? 's' : ''}`}
          </Text>

          <View style={styles.actions}>
            <Pressable
              onPress={onClose}
              disabled={submitting}
              style={[styles.btn, styles.cancelBtn]}
            >
              <Text style={styles.cancelLabel}>Annuler</Text>
            </Pressable>
            <Pressable
              onPress={handleConfirm}
              disabled={submitting}
              style={[styles.btn, styles.confirmBtn]}
            >
              {submitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.confirmLabel}>Valider</Text>
              )}
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  title: {
    ...Typography.sectionTitle,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  stepperBtn: {
    width: 56,
    height: 56,
    borderRadius: Radius.pill,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  stepperBtnDisabled: {
    opacity: 0.4,
  },
  valueBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  value: {
    fontSize: 48,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  valueInput: {
    fontSize: 48,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    minWidth: 80,
    padding: 0,
  },
  valueTotal: {
    ...Typography.body,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  helper: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  btn: {
    flex: 1,
    height: 48,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtn: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cancelLabel: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  confirmBtn: {
    backgroundColor: Colors.primary,
  },
  confirmLabel: {
    ...Typography.body,
    color: '#fff',
    fontWeight: '700',
  },
});
