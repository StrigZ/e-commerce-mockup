import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { categories, categoryToParamsMap } from '@/constants';
import { cn } from '@/lib/utils';
import type { Category, Item, ItemParam } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router';
import * as z from 'zod';

import EditPageFormBaseFields from './edit-page-form-base-fields';
import EditPageFormCategoryParamsFields from './edit-page-form-category-params-fields';
import EditPageFormDescriptionField from './edit-page-form-description-field';

const baseSchema = z.object({
    category: z.enum(categories),
    title: z.string().nonempty('Название должно быть заполнено'),
    price: z.coerce
        .number()
        .min(0, 'Цена не может быть отрицательной') as z.ZodNumber,
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

type Props = {
    item: Item;
    category: Category;
};
export default function EditPageFormFields({ item, category }: Props) {
    const formSchema = buildFormSchema(category);
    const { params, ...itemFields } = item;
    const isSameCategory = category === item.category;
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...itemFields,
            ...(isSameCategory ? params : {}),
            price: item.price ?? 0,
            category,
        },
        mode: 'onBlur',
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data);
    }

    return (
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4.5"
            >
                <EditPageFormBaseFields />
                <EditPageFormCategoryParamsFields category={category} />
                <Separator />
                <EditPageFormDescriptionField />
                <div className="grid grid-cols-[min-content_min-content] gap-2.5">
                    <Button
                        className="bg-button-active"
                        type="submit"
                        disabled={
                            !form.formState.isValid ||
                            (!form.formState.isDirty && isSameCategory)
                        }
                    >
                        Сохранить
                    </Button>
                    <Link
                        to={`/ads/${item.id}`}
                        className={cn(
                            buttonVariants(),
                            'bg-muted! text-foreground/45!',
                        )}
                    >
                        Отменить
                    </Link>
                </div>
            </form>
        </FormProvider>
    );
}
