import { DEFAULT_SEARCH_FILTERS } from '@/constants/Filters';
import type { SearchFilters } from '@/types/search.types';

export function countActiveFilters(filters: SearchFilters): number {
  let n = 0;
  if (filters.radius !== DEFAULT_SEARCH_FILTERS.radius) n += 1;
  if (filters.minSpots !== DEFAULT_SEARCH_FILTERS.minSpots) n += 1;
  if (filters.sort !== DEFAULT_SEARCH_FILTERS.sort) n += 1;
  if (filters.availableOnly !== DEFAULT_SEARCH_FILTERS.availableOnly) n += 1;
  if (filters.verifiedOnly !== DEFAULT_SEARCH_FILTERS.verifiedOnly) n += 1;
  return n;
}
