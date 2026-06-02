import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { ContributionItem } from '@/components/profile/contribution-item';
import { recentParkingToContribution } from '@/lib/profile';
import type { ProfileRecentParking } from '@/types/profile.types';
import { profileSharedStyles as s } from './profile.shared.styles';

interface RecentContributionsSectionProps {
  recentParkings: ProfileRecentParking[];
}

export function RecentContributionsSection({
  recentParkings,
}: RecentContributionsSectionProps) {
  const router = useRouter();
  return (
    <View style={s.contribSection}>
      <View style={s.contribHeader}>
        <Text style={s.sectionTitle}>Mes parkings ajoutés</Text>
        <Pressable
          hitSlop={8}
          onPress={() => router.push('/contributions')}
        >
          <Text style={s.seeAll}>Voir tout</Text>
        </Pressable>
      </View>
      {recentParkings.length === 0 ? (
        <Text style={s.emptyText}>
          Aucune contribution pour le moment.
        </Text>
      ) : (
        recentParkings.map((p) => (
          <ContributionItem
            key={p.id}
            item={recentParkingToContribution(p)}
            onPress={() => router.push(`/parking/${p.id}`)}
          />
        ))
      )}
    </View>
  );
}
