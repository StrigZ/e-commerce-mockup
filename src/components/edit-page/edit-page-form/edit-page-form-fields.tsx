import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import useEditAdForm from '@/hooks/use-edit-ad-form';
import { cn } from '@/lib/utils';
import type { Category, Item } from '@/types';
import { Loader } from 'lucide-react';
import { FormProvider } from 'react-hook-form';
import { Link } from 'react-router';

import EditPageFormBaseFields from './edit-page-form-base-fields';
import EditPageFormCategoryParamsFields from './edit-page-form-category-params-fields';
import EditPageFormDescriptionField from './edit-page-form-description-field';

type Props = {
    item: Item;
    category: Category;
};
export default function EditPageFormFields({ item, category }: Props) {
    const { form, onSubmit, isLoading } = useEditAdForm({ category, item });

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
                            (!form.formState.isDirty &&
                                category === item.category) ||
                            isLoading
                        }
                    >
                        {isLoading ? (
                            <Loader className="animate-spin" />
                        ) : (
                            ' Сохранить'
                        )}
                    </Button>
                    <Link
                        to={`/ads/${item.id}`}
                        className={cn(
                            buttonVariants(),
                            'bg-muted! text-foreground/85!',
                            {
                                'text-foreground/45! pointer-events-none! cursor-not-allowed!':
                                    isLoading,
                            },
                        )}
                    >
                        Отменить
                    </Link>
                </div>
            </form>
        </FormProvider>
    );
}
