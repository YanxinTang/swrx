import useSWR, {
  type BareFetcher,
  type Key,
  type SWRConfiguration,
} from 'swr';
import useSWRImmutable from 'swr/immutable';
import { fetcher, type SWRKey } from './core';

export type { ApiFn, SWRKey } from './core';

export function useApi<A extends unknown[], R, E = unknown>(
  key: SWRKey<A, R>,
  config?: SWRConfiguration<R, E>,
) {
  return useSWR<R, E>(key as Key, fetcher as BareFetcher<R>, config);
}

export function useApiImmutable<A extends unknown[], R, E = unknown>(
  key: SWRKey<A, R>,
  config?: SWRConfiguration<R, E>,
) {
  return useSWRImmutable<R, E>(key as Key, fetcher as BareFetcher<R>, config);
}
