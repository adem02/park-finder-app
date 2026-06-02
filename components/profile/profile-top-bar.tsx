import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { profileSharedStyles as s } from './profile.shared.styles';

export function ProfileTopBar() {
  const router = useRouter();
  return (
    <View style={s.header}>
      <Text style={s.headerBrand}>ParkFinder</Text>
      <View style={s.headerActions}>
        <Pressable
          style={s.headerBtn}
          onPress={() => router.push('/search')}
          hitSlop={8}
          accessibilityLabel="Rechercher"
        >
          <Ionicons name="search" size={22} color={Colors.textSecondary} />
        </Pressable>
        <Pressable
          style={s.headerBtn}
          onPress={() => router.push('/settings')}
          hitSlop={8}
          accessibilityLabel="Réglages"
        >
          <Ionicons
            name="settings-outline"
            size={22}
            color={Colors.textSecondary}
          />
        </Pressable>
      </View>
    </View>
  );
}
