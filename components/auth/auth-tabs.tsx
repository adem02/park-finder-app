import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';
import type { AuthMode } from '@/types/auth.types';

interface AuthTabsProps {
  mode: AuthMode;
  onChange: (mode: AuthMode) => void;
}

interface TabConfig {
  mode: AuthMode;
  label: string;
}

const TABS: TabConfig[] = [
  { mode: 'login', label: 'Se connecter' },
  { mode: 'register', label: "S'inscrire" },
];

export function AuthTabs({ mode, onChange }: AuthTabsProps) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = tab.mode === mode;
        return (
          <Pressable
            key={tab.mode}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => onChange(tab.mode)}
          >
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: { borderBottomColor: Colors.primary },
  label: { ...Typography.cardTitle, color: Colors.textSecondary },
  labelActive: { color: Colors.primary },
});
