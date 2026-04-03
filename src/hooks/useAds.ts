import { adOptions, adsOptions } from '@/lib/ads-query-options';
import type { QueryParamsObject } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useAd({ id }: { id?: string }) {
    return useQuery(adOptions({ id }));
}

export function useAds({ queryParams }: { queryParams?: QueryParamsObject }) {
    return useQuery(adsOptions({ queryParams }));
}
