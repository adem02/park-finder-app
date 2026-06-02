import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';

interface HeaderOverlayProps {
  onBack: () => void;
  onShare?: () => void;
}

export function HeaderOverlay({ onBack, onShare }: HeaderOverlayProps) {
  return (
    <SafeAreaView edges={['top']} style={styles.wrap} pointerEvents="box-none">
      <View style={styles.row} pointerEvents="box-none">
        <Pressable
          onPress={onBack}
          hitSlop={10}
          style={styles.btn}
          accessibilityLabel="Retour"
        >
          <Ionicons name="arrow-back" size={20} color={Colors.textPrimary} />
        </Pressable>
        {onShare && (
          <Pressable
            onPress={onShare}
            hitSlop={10}
            style={styles.btn}
            accessibilityLabel="Partager"
          >
            <Ionicons
              name="share-social-outline"
              size={20}
              color={Colors.textPrimary}
            />
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
  },
  btn: {
    width: 40,
    height: 40,
    borderRadius: Radius.pill,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
});
