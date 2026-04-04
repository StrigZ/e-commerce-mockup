import type { Item } from '@/types';

const API_URL = 'http://localhost:8080/ai';
export type MarketPriceResult = {
    priceMin: number;
    priceMax: number;
    overview: string;
};

class AIApiClient {
    private async request<T>(path: string, item: Item): Promise<T> {
        const response = await fetch(`${API_URL}${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item }),
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        return response.json();
    }

    public async getDescription(item: Item): Promise<{ description: string }> {
        return this.request('/description', item);
    }

    public async getMarketPrice(item: Item): Promise<MarketPriceResult> {
        return this.request('/price', item);
    }
}

export const aiApiClient = new AIApiClient();
