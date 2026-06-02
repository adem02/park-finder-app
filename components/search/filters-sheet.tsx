import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import { Colors } from '@/constants/Colors';
import {
  DEFAULT_SEARCH_FILTERS,
  MIN_SPOTS_OPTIONS,
  RADIUS_OPTIONS,
  SORT_OPTIONS,
} from '@/constants/Filters';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';
import type { SearchFilters } from '@/types/search.types';

interface FiltersSheetProps {
  visible: boolean;
  initial: SearchFilters;
  onClose: () => void;
  onApply: (filters: SearchFilters) => void;
}

export function FiltersSheet({
  visible,
  initial,
  onClose,
  onApply,
}: FiltersSheetProps) {
  const [draft, setDraft] = useState<SearchFilters>(initial);

  useEffect(() => {
    if (visible) setDraft(initial);
  }, [visible, initial]);

  const reset = () => setDraft(DEFAULT_SEARCH_FILTERS);

  const apply = () => {
    onApply(draft);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <Text style={styles.title}>Filtres</Text>
            <Pressable hitSlop={8} onPress={onClose}>
              <Ionicons name="close" size={24} color={Colors.textPrimary} />
            </Pressable>
          </View>

          <ScrollView
            contentContainerStyle={styles.body}
            showsVerticalScrollIndicator={false}
          >
            <Section label="Rayon de recherche">
              <Chips
                options={RADIUS_OPTIONS}
                value={draft.radius}
                onChange={(v) => setDraft((d) => ({ ...d, radius: v }))}
              />
            </Section>

            <Section label="Nombre de places minimum">
              <Chips
                options={MIN_SPOTS_OPTIONS}
                value={draft.minSpots}
                onChange={(v) => setDraft((d) => ({ ...d, minSpots: v }))}
              />
            </Section>

            <Section label="Trier par">
              <View style={styles.sortRow}>
                {SORT_OPTIONS.map((opt) => {
                  const active = draft.sort === opt.value;
                  return (
                    <Pressable
                      key={opt.value}
                      onPress={() =>
                        setDraft((d) => ({
                          ...d,
                          sort: opt.value,
                        }))
                      }
                      style={[styles.chip, active && styles.chipActive]}
                    >
                      <Text
                        style={[
                          styles.chipLabel,
                          active && styles.chipLabelActive,
                        ]}
                      >
                        {opt.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </Section>

            <Section label="Options">
              <View style={styles.toggleRow}>
                <View style={styles.toggleLabelWrap}>
                  <Text style={styles.toggleLabel}>
                    Places disponibles uniquement
                  </Text>
                </View>
                <Switch
                  value={draft.availableOnly}
                  onValueChange={(v) =>
                    setDraft((d) => ({ ...d, availableOnly: v }))
                  }
                />
              </View>

              <View style={styles.toggleRow}>
                <View style={styles.toggleLabelWrap}>
                  <Text style={styles.toggleLabel}>Parkings vérifiés</Text>
                </View>
                <Switch
                  value={draft.verifiedOnly}
                  onValueChange={(v) =>
                    setDraft((d) => ({ ...d, verifiedOnly: v }))
                  }
                />
              </View>
            </Section>
          </ScrollView>

          <View style={styles.actions}>
            <Pressable style={[styles.btn, styles.resetBtn]} onPress={reset}>
              <Text style={styles.resetLabel}>Réinitialiser</Text>
            </Pressable>
            <Pressable style={[styles.btn, styles.applyBtn]} onPress={apply}>
              <Text style={styles.applyLabel}>Appliquer</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

interface SectionProps {
  label: string;
  children: React.ReactNode;
}

function Section({ label, children }: SectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>{label}</Text>
      {children}
    </View>
  );
}

interface ChipsProps<T extends number> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}

function Chips<T extends number>({ options, value, onChange }: ChipsProps<T>) {
  return (
    <View style={styles.chipsWrap}>
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Text
              style={[styles.chipLabel, active && styles.chipLabelActive]}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: Radius.lg,
    borderTopRightRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xl,
    maxHeight: '85%',
  },
  handle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    marginTop: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
  },
  title: {
    ...Typography.sectionTitle,
    color: Colors.textPrimary,
  },
  body: {
    paddingVertical: Spacing.sm,
    gap: Spacing.lg,
  },
  section: {
    gap: Spacing.sm,
  },
  sectionLabel: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  sortRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipDisabled: {
    opacity: 0.5,
  },
  chipLabel: {
    ...Typography.caption,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  chipLabelActive: {
    color: '#fff',
  },
  chipLabelDisabled: {
    color: Colors.textSecondary,
  },
  soonBadge: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 10,
    fontWeight: '700',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Radius.sm,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    gap: Spacing.md,
  },
  toggleLabelWrap: {
    flex: 1,
    gap: 2,
  },
  toggleLabel: {
    ...Typography.body,
    color: Colors.textPrimary,
  },
  soonInline: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderColor: Colors.border,
    marginTop: Spacing.sm,
  },
  btn: {
    flex: 1,
    height: 48,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetBtn: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  resetLabel: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  applyBtn: {
    backgroundColor: Colors.primary,
  },
  applyLabel: {
    ...Typography.body,
    color: '#fff',
    fontWeight: '700',
  },
});
