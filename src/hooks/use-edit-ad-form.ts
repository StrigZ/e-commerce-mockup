import { categories, categoryToParamsMap } from '@/constants';
import type { Category, Item, ItemParam } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { type Resolver, useForm } from 'react-hook-form';
import * as z from 'zod';

import { useAdMutations } from './useAdMutations';

const baseSchema = z.object({
    category: z.enum(categories),
    title: z.string().nonempty('Название должно быть заполнено'),
    price: z.preprocess(
        (val) => {
            const num = Number(val);
            return val === '' || val === null || isNaN(num) ? undefined : num;
        },
        z
            .number({ error: 'Цена должна быть заполнена' })
            .positive('Цена должна быть положительной'),
    ) as z.ZodType<number>,
    description: z
        .string()
        .max(1000, 'Описание не может быть длиннее 1000 символов')
        .optional(),
});

const numericParams = new Set<ItemParam>([
    'yearOfManufacture',
    'mileage',
    'enginePower',
    'area',
    'floor',
]);

function buildFormSchema(category: Category) {
    const categoryParams = categoryToParamsMap[category];
    return baseSchema.extend(
        Object.fromEntries(
            categoryParams.map((param) => [
                param,
                numericParams.has(param)
                    ? z.coerce.number().optional()
                    : z.string().optional(),
            ]),
        ) as Record<
            ItemParam,
            z.ZodOptional<z.ZodString> | z.ZodOptional<z.ZodNumber>
        >,
    );
}

export default function useEditAdForm({
    item,
    category,
}: {
    item: Item;
    category: Category;
}) {
    const { params, ...itemFields } = item;
    const isSameCategory = category === item.category;

    const formSchema = buildFormSchema(category);

    type FormValues = Omit<z.infer<typeof formSchema>, 'price'> & {
        price: number;
    };

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as Resolver<FormValues>,
        defaultValues: {
            ...itemFields,
            ...(isSameCategory ? params : {}),
            price: item.price !== null ? item.price : undefined,
            category,
        },
        mode: 'onBlur',
    });

    const updateAdMutations = useAdMutations();

    function onSubmit(data: z.infer<typeof formSchema>) {
        const { price, category, title, description } = data;
        const categoryParams = categoryToParamsMap[category];

        const params = Object.fromEntries(
            categoryParams.map((param) => [param, data[param]]),
        );
        updateAdMutations.updateAd({
            id: String(item.id),
            data: { price, category, title, description, params },
        });
    }

    return { form, onSubmit, isLoading: updateAdMutations.isUpdating };
}
