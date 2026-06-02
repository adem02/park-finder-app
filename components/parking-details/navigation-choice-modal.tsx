import { Ionicons } from '@expo/vector-icons';
import { Linking, Modal, Pressable, StyleSheet, Text } from 'react-native';

import { Colors } from '@/constants/Colors';
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
  const openGoogleMaps = async () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`;
    onClose();
    await Linking.openURL(url);
  };

  const openWaze = async () => {
    const appUrl = `waze://?ll=${latitude},${longitude}&navigate=yes`;
    const webUrl = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;
    onClose();
    const canOpen = await Linking.canOpenURL(appUrl).catch(() => false);
    await Linking.openURL(canOpen ? appUrl : webUrl);
  };

  const openSystemMaps = async () => {
    const encoded = encodeURIComponent(label);
    const url = `geo:${latitude},${longitude}?q=${latitude},${longitude}(${encoded})`;
    onClose();
    await Linking.openURL(url);
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

          <Pressable style={styles.option} onPress={() => void openGoogleMaps()}>
            <Ionicons name="map" size={22} color={Colors.primary} />
            <Text style={styles.optionLabel}>Google Maps</Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={Colors.textSecondary}
            />
          </Pressable>

          <Pressable style={styles.option} onPress={() => void openWaze()}>
            <Ionicons name="navigate" size={22} color="#33CCFF" />
            <Text style={styles.optionLabel}>Waze</Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={Colors.textSecondary}
            />
          </Pressable>

          <Pressable style={styles.option} onPress={() => void openSystemMaps()}>
            <Ionicons name="phone-portrait" size={22} color={Colors.textPrimary} />
            <Text style={styles.optionLabel}>Application par défaut</Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={Colors.textSecondary}
            />
          </Pressable>

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
