import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FiltersSheet } from '@/components/search/filters-sheet';
import { ParkingRowCard } from '@/components/search/parking-row-card';
import { SearchEmptyState } from '@/components/search/search-empty-state';
import { SearchHeaderBar } from '@/components/search/search-header-bar';
import { SearchMapView } from '@/components/search/search-map-view';
import { ViewToggle, type SearchViewMode } from '@/components/search/view-toggle';
import { Colors } from '@/constants/Colors';
import { DEFAULT_SEARCH_FILTERS } from '@/constants/Filters';
import { useCurrentLocation } from '@/hooks/use-current-location';
import { useDebounce } from '@/hooks/use-debounce';
import { useNearbyParkings } from '@/hooks/use-nearby-parkings';
import { countActiveFilters } from '@/lib/filters';
import { FALLBACK_CENTER, regionForRadius } from '@/lib/map';
import type { SearchFilters } from '@/types/search.types';

import { styles } from './search.styles';

export default function ListScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_SEARCH_FILTERS);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<SearchViewMode>('list');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, 300);

  const { coordinates } = useCurrentLocation({ fallback: FALLBACK_CENTER });
  const { items, loading, refreshing, refresh } = useNearbyParkings({
    center: coordinates,
    query: debouncedQuery,
    radius: filters.radius,
    minSpots: filters.minSpots,
    availableOnly: filters.availableOnly,
    verifiedOnly: filters.verifiedOnly,
    sort: filters.sort,
  });

  const activeCount = countActiveFilters(filters);

  const region = useMemo(
    () => regionForRadius(coordinates ?? FALLBACK_CENTER, filters.radius),
    [coordinates, filters.radius],
  );

  const empty = (
    <SearchEmptyState
      query={debouncedQuery}
      hasActiveFilters={activeCount > 0}
      onResetFilters={() => setFilters(DEFAULT_SEARCH_FILTERS)}
    />
  );

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <SearchHeaderBar
        query={query}
        onQueryChange={setQuery}
        activeFiltersCount={activeCount}
        onOpenFilters={() => setFiltersOpen(true)}
      />

      <View style={styles.toolbar}>
        <ViewToggle value={viewMode} onChange={setViewMode} />
        <Text style={styles.resultCount}>
          {items.length} résultat{items.length > 1 ? 's' : ''}
        </Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      ) : viewMode === 'list' ? (
        <FlatList
          data={items}
          keyExtractor={(it) => it.parking.id}
          contentContainerStyle={[
            styles.list,
            items.length === 0 && styles.listEmpty,
          ]}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <ParkingRowCard
              parking={item.parking}
              distanceMeters={item.distance}
              onPress={() =>
                router.push({
                  pathname: '/parking/[id]',
                  params: { id: item.parking.id },
                })
              }
            />
          )}
          ListEmptyComponent={empty}
          refreshing={refreshing}
          onRefresh={refresh}
        />
      ) : Platform.OS === 'web' ? (
        <View style={styles.center}>
          <Ionicons name="map-outline" size={40} color={Colors.muted} />
          <Text style={styles.emptyTitle}>Carte indisponible sur le web</Text>
          <Text style={styles.emptyBody}>
            Ouvrez l’app sur iOS ou Android.
          </Text>
        </View>
      ) : items.length === 0 ? (
        empty
      ) : (
        <SearchMapView
          region={region}
          items={items}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      )}

      <FiltersSheet
        visible={filtersOpen}
        initial={filters}
        onClose={() => setFiltersOpen(false)}
        onApply={setFilters}
      />
    </SafeAreaView>
  );
}
