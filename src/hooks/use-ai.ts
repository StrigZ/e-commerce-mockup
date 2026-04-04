import { categoryToParamsMap } from '@/constants';
import { aiApiClient } from '@/lib/ai-api-client';
import type { Category, Item } from '@/types';
import { useFormContext } from 'react-hook-form';

export default function useAI() {
    const form = useFormContext();
    const formFields = form.getValues();
    const { price, category, title, description } = formFields;

    const categoryParams = categoryToParamsMap[category as Category];
    const params = Object.fromEntries(
        categoryParams
            .filter((param) => formFields[param] !== '')
            .map((param) => [param, formFields[param]]),
    );

    const item = {
        price,
        category,
        title,
        description,
        params,
    } as Item;

    const generateDescription = () => aiApiClient.getDescription(item);
    const generatePriceOverview = () => aiApiClient.getMarketPrice(item);

    return { generateDescription, generatePriceOverview };
}
