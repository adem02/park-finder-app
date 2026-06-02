import { View } from 'react-native';

import { StatCard } from '@/components/profile/stat-card';
import { Colors } from '@/constants/Colors';
import { profileSharedStyles as s } from './profile.shared.styles';

interface ProfileStatsGridProps {
  parkingsAdded: number;
  points: number;
  reportsCount: number;
  votesCount: number;
}

export function ProfileStatsGrid({
  parkingsAdded,
  points,
  reportsCount,
  votesCount,
}: ProfileStatsGridProps) {
  return (
    <View style={s.statsGrid}>
      <View style={s.statsRow}>
        <StatCard
          value={parkingsAdded}
          label="Parkings ajoutés"
          valueColor={Colors.primary}
        />
        <StatCard
          value={points}
          label="Points gagnés"
          valueColor={Colors.warning}
        />
      </View>
      <View style={s.statsRow}>
        <StatCard
          value={reportsCount}
          label="Signalements"
          valueColor={Colors.success}
        />
        <StatCard
          value={votesCount}
          label="Votes donnés"
          valueColor={Colors.textPrimary}
        />
      </View>
    </View>
  );
}
