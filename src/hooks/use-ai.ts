import { categoryToParamsMap } from '@/constants';
import { aiApiClient } from '@/lib/ai-api-client';
import type { Category, Item } from '@/types';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function useAI() {
    const [isDescriptionLoading, setIsDescriptionLoading] = useState(false);
    const [isPriceLoading, setIsPriceLoading] = useState(false);
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

    const generateDescription = async () => {
        setIsDescriptionLoading(true);
        try {
            const res = await aiApiClient.getDescription(item);
            return res.description;
        } finally {
            setIsDescriptionLoading(false);
        }
    };

    const generatePriceOverview = async () => {
        setIsPriceLoading(true);
        try {
            const res = await aiApiClient.getMarketPrice(item);
            return res;
        } finally {
            setIsPriceLoading(false);
        }
    };

    return {
        generateDescription,
        generatePriceOverview,
        isLoading: isDescriptionLoading || isPriceLoading,
    };
}
