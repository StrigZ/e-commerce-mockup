import type { QueryParamsObject } from '@/types';
import { queryOptions } from '@tanstack/react-query';

import { adsApiClient } from './ads-api-client';
import { adKeys } from './query-keys';

export const adOptions = ({ id }: { id?: string }) =>
    queryOptions({
        queryKey: adKeys.detail(id!),
        queryFn: () => adsApiClient.getItem(id!),
        enabled: !!id,
    });

export const adsOptions = ({
    queryParams,
}: {
    queryParams?: QueryParamsObject;
}) =>
    queryOptions({
        queryKey: adKeys.list(queryParams),
        queryFn: () => adsApiClient.getItems(queryParams),
    });
