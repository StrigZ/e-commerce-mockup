import type { Item, QueryParamsObject, UpdateAdItem } from '@/types';

import { getQueryParamsString } from './utils';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

class AdsApiClient {
    public async getItems(
        params?: QueryParamsObject,
    ): Promise<{ items: Omit<Item, 'params'>[]; total: number }> {
        const queryParams = params ? getQueryParamsString(params) : '';

        return (await fetch(`${API_URL}/items${queryParams}`)).json();
    }
    public async getItem(id: string): Promise<Item> {
        return (await fetch(`${API_URL}/items/${id}`)).json();
    }
    public async updateItem(
        id: string,
        item: UpdateAdItem,
    ): Promise<{ success: boolean; error?: string }> {
        return (
            await fetch(`${API_URL}/items/${id}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            })
        ).json();
    }
}

export const adsApiClient = new AdsApiClient();
