import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Contribution, ProfileRecentParking } from '@/types/profile.types';
import { Avatar } from '@/components/profile/avatar';
import { ContributionItem } from '@/components/profile/contribution-item';
import { RankingCard } from '@/components/profile/ranking-card';
import { StatCard } from '@/components/profile/stat-card';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';
import { useProfileStore } from '@/store/profile.store';
import { useAuthStore } from '@/store/auth.store';
import { profileStyles as s } from './profile.styles';

const PARKING_POINTS = 20;

export function recentParkingToContribution(p: ProfileRecentParking): Contribution {
  return {
    id: p.id,
    type: 'parking',
    name: p.name,
    description: `${p.score >= 0 ? '+' : ''}${p.score} • ${p.votesCount} votes`,
    points: PARKING_POINTS,
    timeAgo: '',
  };
}

export default function ProfileScreen() {
  const router = useRouter();
  const authUser = useAuthStore((st) => st.user);
  const { data, loading, error, fetch } = useProfileStore();

  useEffect(() => {
    void fetch();
  }, [fetch]);

  const displayName = data?.user.username ?? authUser?.username ?? 'Utilisateur';
  const photoUrl = data?.user.photoUrl ?? authUser?.photoUrl;
  const level = data?.stats.level ?? 0;
  const topBadge = data?.badges[0]?.name ?? 'Nouveau contributeur';

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
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
            <Ionicons name="settings-outline" size={22} color={Colors.textSecondary} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading && !!data}
            onRefresh={() => void fetch({ force: true })}
            tintColor={Colors.primary}
          />
        }
      >
        <View style={s.hero}>
          <Avatar name={displayName} level={level} photoUrl={photoUrl} />
          <Text style={s.displayName}>{displayName}</Text>
          <Text style={s.userBadge}>{topBadge}</Text>
        </View>

        {loading && !data ? (
          <View style={{ alignItems: 'center', paddingVertical: Spacing.xl }}>
            <ActivityIndicator color={Colors.primary} />
          </View>
        ) : error && !data ? (
          <View style={{ alignItems: 'center', gap: Spacing.sm, paddingVertical: Spacing.xl }}>
            <Text style={{ ...Typography.body, color: Colors.danger }}>{error}</Text>
            <Pressable onPress={() => void fetch({ force: true })}>
              <Text style={{ ...Typography.body, color: Colors.primary, fontWeight: '600' }}>
                Réessayer
              </Text>
            </Pressable>
          </View>
        ) : data ? (
          <>
            <View style={s.statsRow}>
              <StatCard
                value={data.stats.parkingsAdded}
                label="Parkings ajoutés"
                valueColor={Colors.primary}
              />
              <StatCard
                value={data.stats.points}
                label="Points gagnés"
                valueColor={Colors.warning}
              />
            </View>

            <RankingCard
              rank={data.rank?.rank ?? 0}
              percentileLabel={data.rank?.percentile}
              progressPct={data.stats.progressToNextLevel / 100}
            />

            <View style={s.contribSection}>
              <View style={s.contribHeader}>
                <Text style={s.sectionTitle}>Mes contributions récentes</Text>
                <Pressable hitSlop={8} onPress={() => router.push('/contributions')}>
                  <Text style={s.seeAll}>Voir tout</Text>
                </Pressable>
              </View>
              {data.recentParkings.length === 0 ? (
                <Text style={{ ...Typography.body, color: Colors.textSecondary }}>
                  Aucune contribution pour le moment.
                </Text>
              ) : (
                data.recentParkings.map((p) => (
                  <ContributionItem key={p.id} item={recentParkingToContribution(p)} />
                ))
              )}
            </View>
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
