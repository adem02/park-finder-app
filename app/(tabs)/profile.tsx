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

import { BadgesSection } from '@/components/profile/badges-section';
import { ProfileHero } from '@/components/profile/profile-hero';
import { ProfileStatsGrid } from '@/components/profile/profile-stats-grid';
import { ProfileTopBar } from '@/components/profile/profile-top-bar';
import { RecentContributionsSection } from '@/components/profile/recent-contributions-section';
import { Colors } from '@/constants/Colors';
import { useAuthStore } from '@/store/auth.store';
import { useProfileStore } from '@/store/profile.store';

import { profileStyles as s } from './profile.styles';

export default function ProfileScreen() {
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
      <ProfileTopBar />

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
        <ProfileHero
          displayName={displayName}
          level={level}
          topBadge={topBadge}
          photoUrl={photoUrl}
        />

        {loading && !data ? (
          <View style={s.loadingBlock}>
            <ActivityIndicator color={Colors.primary} />
          </View>
        ) : error && !data ? (
          <View style={s.errorBlock}>
            <Text style={s.errorText}>{error}</Text>
            <Pressable onPress={() => void fetch({ force: true })}>
              <Text style={s.retryText}>Réessayer</Text>
            </Pressable>
          </View>
        ) : data ? (
          <>
            <ProfileStatsGrid
              parkingsAdded={data.stats.parkingsAdded}
              points={data.stats.points}
              reportsCount={data.stats.reportsCount}
              votesCount={data.stats.votesCount}
            />

            <BadgesSection badges={data.badges} />

            <RecentContributionsSection
              recentParkings={data.recentParkings}
            />
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
