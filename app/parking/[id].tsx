import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { HeaderOverlay } from '@/components/parking-details/header-overlay';
import { AvailabilityBadge } from '@/components/parking-details/availability-badge';
import { NavigationChoiceModal } from '@/components/parking-details/navigation-choice-modal';
import { PhotosCarousel } from '@/components/parking-details/photos-carousel';
import { RecentCommentsSection } from '@/components/parking-details/recent-comments-section';
import { ReportAvailabilityModal } from '@/components/parking-details/report-availability-modal';
import { VoteButtons } from '@/components/parking-details/vote-buttons';
import { Colors } from '@/constants/Colors';
import { useCurrentLocation } from '@/hooks/use-current-location';
import { useParkingDetails } from '@/hooks/use-parking-details';
import { useParkingVote } from '@/hooks/use-parking-vote';
import { useReportAvailability } from '@/hooks/use-report-availability';
import { distanceMeters, formatDistance } from '@/lib/distance';

import { styles } from './[id].styles';

export default function ParkingDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { details, loading, error, refresh } = useParkingDetails(id ?? null);
  const { coordinates: userCoords } = useCurrentLocation();
  const vote = useParkingVote(id ?? null, details?.votes ?? null);

  const [navModalVisible, setNavModalVisible] = useState(false);
  const report = useReportAvailability({
    parkingId: id ?? null,
    onReported: refresh,
  });

  const distance = useMemo(() => {
    if (!details || !userCoords) return null;
    return distanceMeters(userCoords, details.coordinates);
  }, [details, userCoords]);

  const onShare = () => undefined;

  const onNavigate = () => {
    if (!details) return;
    setNavModalVisible(true);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.root}>
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator color={Colors.primary} />
          </View>
        ) : error || !details ? (
          <View style={styles.center}>
            <Ionicons name="alert-circle-outline" size={48} color={Colors.muted} />
            <Text style={styles.errorTitle}>Parking introuvable</Text>
            <Text style={styles.errorBody}>
              {error ?? 'Une erreur est survenue lors du chargement.'}
            </Text>
            <Pressable onPress={() => void refresh()} style={styles.retryBtn}>
              <Text style={styles.retryLabel}>Réessayer</Text>
            </Pressable>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.scroll}>
            <PhotosCarousel photos={details.photos} />

            <View style={styles.body}>
              <View style={styles.titleRow}>
                <Text style={styles.title} numberOfLines={2}>
                  {details.name}
                </Text>
                {distance != null && (
                  <View style={styles.distance}>
                    <Ionicons name="navigate" size={14} color={Colors.primary} />
                    <Text style={styles.distanceLabel}>
                      {formatDistance(distance)}
                    </Text>
                  </View>
                )}
              </View>

              <Text style={styles.subtitle}>
                {details.coordinates.latitude.toFixed(5)},{' '}
                {details.coordinates.longitude.toFixed(5)}
              </Text>

              <View style={styles.metaRow}>
                <Ionicons
                  name="car-outline"
                  size={16}
                  color={Colors.textSecondary}
                />
                <Text style={styles.metaLabel}>
                  {details.totalSpots} place{details.totalSpots > 1 ? 's' : ''} au
                  total
                </Text>
              </View>

              <View style={styles.infoCard}>
                <View style={styles.infoTopRow}>
                  <AvailabilityBadge
                    availability={details.availability}
                    totalSpots={details.totalSpots}
                  />
                  <View style={styles.freeBadge}>
                    <Text style={styles.freeBadgeLabel}>Gratuit</Text>
                  </View>
                </View>
                <VoteButtons
                  upvotes={vote.upvotes}
                  downvotes={vote.downvotes}
                  userVote={vote.userVote}
                  pending={vote.pending}
                  onToggle={(type) => void vote.toggle(type)}
                />
              </View>

              <Pressable
                style={styles.reportBtn}
                onPress={report.open}
              >
                <Ionicons name="flag-outline" size={18} color={Colors.primary} />
                <Text style={styles.reportLabel}>Signaler la disponibilité</Text>
              </Pressable>

              <RecentCommentsSection
                comments={details.recentComments}
                onSeeAll={() => router.push(`/parking/comments/${details.id}`)}
              />
            </View>
          </ScrollView>
        )}

        <HeaderOverlay onBack={() => router.back()} onShare={onShare} />

        {details && !loading && !error && (
          <View style={styles.footer}>
            <Pressable onPress={onNavigate} style={styles.cta}>
              <Ionicons name="navigate" size={20} color="#fff" />
              <Text style={styles.ctaLabel}>Y aller</Text>
            </Pressable>
          </View>
        )}

        {details && (
          <>
            <NavigationChoiceModal
              visible={navModalVisible}
              latitude={details.coordinates.latitude}
              longitude={details.coordinates.longitude}
              label={details.name}
              onClose={() => setNavModalVisible(false)}
            />
            <ReportAvailabilityModal
              visible={report.visible}
              totalSpots={details.totalSpots}
              initialValue={details.availability.availableSpots ?? undefined}
              submitting={report.submitting}
              onClose={report.close}
              onConfirm={report.confirm}
            />
          </>
        )}
      </View>
    </>
  );
}
