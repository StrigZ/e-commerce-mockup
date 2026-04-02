import { queryOptions } from '@tanstack/react-query';

import { adsApiClient } from './ads-api-client';
import { adKeys } from './query-keys';

export const adOptions = ({ id }: { id: string }) =>
    queryOptions({
        queryKey: adKeys.detail(id),
        queryFn: () => adsApiClient.getItem(id),
        enabled: !!id,
    });

export const adsOptions = () =>
    queryOptions({
        queryKey: adKeys.lists(),
        queryFn: () => adsApiClient.getItems(),
    });
