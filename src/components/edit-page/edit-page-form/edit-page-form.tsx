import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { categories, categoryToParamsMap } from '@/constants';
import { cn } from '@/lib/utils';
import type { Category, Item, ItemParam } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router';
import * as z from 'zod';

import EditPageFormBaseFields from './edit-page-form-base-fields';
import EditPageFormCategoryParamsFields from './edit-page-form-category-params-fields';
import EditPageFormDescriptionField from './edit-page-form-description-field';

const baseSchema = z.object({
    category: z.enum(categories),
    title: z.string().nonempty('Название не может быть пустым'),
    price: z.coerce
        .number()
        .min(0, 'Цена не может быть отрицательной') as z.ZodNumber,
    description: z
        .string()
        .max(1000, 'Описание не может быть длиннее 1000 символов')
        .optional(),
});

function buildFormSchema(category: Category) {
    const categoryParams = categoryToParamsMap[category];
    return baseSchema.extend(
        Object.fromEntries(
            categoryParams.map((param) => [param, z.string().optional()]),
        ) as Record<ItemParam, z.ZodOptional<z.ZodString>>,
    );
}

export default function EditPageForm(item: Item) {
    const formSchema = useMemo(
        () => buildFormSchema(item.category),
        [item.category],
    );

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { ...item, price: item.price ?? 0 },
        mode: 'onChange',
    });

    // eslint-disable-next-line react-hooks/incompatible-library
    const category = form.watch('category') as Category;

    useEffect(() => {
        form.clearErrors();
        const prevParams = categoryToParamsMap[item.category];
        prevParams.forEach((param) => form.setValue(param, ''));
    }, [category, form, item.category]);

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data);
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <EditPageFormBaseFields currentCategory={category} />
                <Separator />
                <EditPageFormCategoryParamsFields category={item.category} />
                <Separator />
                <EditPageFormDescriptionField />
                <div className="grid grid-cols-[min-content_min-content] gap-2.5">
                    <Button
                        className="bg-button-active"
                        type="submit"
                        disabled={
                            !form.formState.isValid || !form.formState.isDirty
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
