import { Text, View } from 'react-native';

import { Avatar } from '@/components/profile/avatar';
import { profileSharedStyles as s } from './profile.shared.styles';

interface ProfileHeroProps {
  displayName: string;
  level: number;
  topBadge: string;
  photoUrl?: string;
}

export function ProfileHero({
  displayName,
  level,
  topBadge,
  photoUrl,
}: ProfileHeroProps) {
  return (
    <View style={s.hero}>
      <Avatar name={displayName} level={level} photoUrl={photoUrl} />
      <Text style={s.displayName}>{displayName}</Text>
      <Text style={s.userBadge}>{topBadge}</Text>
    </View>
  );
}
