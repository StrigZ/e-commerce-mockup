import { adOptions, adsOptions } from '@/lib/ads-query-options';
import { useQuery } from '@tanstack/react-query';

export function useAd({ id }: { id: string }) {
    return useQuery(adOptions({ id }));
}

export function useAds() {
    return useQuery(adsOptions());
}
