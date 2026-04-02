import type { Item } from '@/types';

const API_URL = 'http://localhost:8080';

class AdsApiClient {
    public async getItems(): Promise<{ items: Item[]; total: number }> {
        return (await fetch(`${API_URL}/items`)).json();
    }
    public async getItem(id: string): Promise<Item> {
        return (await fetch(`${API_URL}/items/${id}`)).json();
    }
    public async updateItem(
        id: string,
        item: Item,
    ): Promise<{ success: boolean; error?: string }> {
        return (
            await fetch(`${API_URL}/items/${id}`, {
                method: 'put',
                body: JSON.stringify(item),
            })
        ).json();
    }
}

export const adsApiClient = new AdsApiClient();
