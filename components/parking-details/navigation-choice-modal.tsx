import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Linking, Modal, Pressable, StyleSheet, Text } from 'react-native';

import { Colors } from '@/constants/Colors';
import { NAV_APPS, type NavApp } from '@/constants/Navigation';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

interface NavigationChoiceModalProps {
  visible: boolean;
  latitude: number;
  longitude: number;
  label: string;
  onClose: () => void;
}

export function NavigationChoiceModal({
  visible,
  latitude,
  longitude,
  label,
  onClose,
}: NavigationChoiceModalProps) {
  const [availableApps, setAvailableApps] = useState<NavApp[]>([]);

  useEffect(() => {
    if (!visible) return;

    let cancelled = false;

    (async () => {
      const checks = await Promise.all(
        NAV_APPS.map(async (app) => {
          if (app.scheme === null) return app;
          const canOpen = await Linking.canOpenURL(app.scheme).catch(() => false);
          return canOpen ? app : null;
        }),
      );

      if (cancelled) return;
      setAvailableApps(checks.filter((a): a is NavApp => a !== null));
    })();

    return () => {
      cancelled = true;
    };
  }, [visible]);

  const openApp = async (app: NavApp) => {
    const url = app.buildUrl(latitude, longitude, label);
    onClose();
    await Linking.openURL(url).catch(() => undefined);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.title}>Y aller avec</Text>

          {availableApps.map((app) => (
            <Pressable
              key={app.key}
              style={styles.option}
              onPress={() => void openApp(app)}
            >
              <Ionicons name={app.icon} size={22} color={app.color} />
              <Text style={styles.optionLabel}>{app.label}</Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={Colors.textSecondary}
              />
            </Pressable>
          ))}

          <Pressable style={styles.cancel} onPress={onClose}>
            <Text style={styles.cancelLabel}>Annuler</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
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
    padding: Spacing.md,
    paddingBottom: Spacing.xl,
    gap: Spacing.xs,
  },
  title: {
    ...Typography.sectionTitle,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.md,
    backgroundColor: '#F3F4F6',
  },
  optionLabel: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    flex: 1,
  },
  cancel: {
    marginTop: Spacing.sm,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderRadius: Radius.md,
  },
  cancelLabel: {
    ...Typography.body,
    color: Colors.danger,
    fontWeight: '600',
  },
});
