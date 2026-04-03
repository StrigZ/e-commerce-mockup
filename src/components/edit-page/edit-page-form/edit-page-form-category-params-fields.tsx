// components/edit-page-form/category-params-fields.tsx
import {
    Field,
    FieldContent,
    FieldLabel,
    FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { categoryToParamsMap, paramToTextMap } from '@/constants';
import type { Category, ItemParam } from '@/types';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
    category: Category;
};

export default function EditPageFormCategoryParamsFields({ category }: Props) {
    const form = useFormContext();
    const categoryParams = categoryToParamsMap[category];

    return (
        <>
            <FieldSet>
                <FieldLabel>Характеристики</FieldLabel>
                {categoryParams.map((param) => (
                    <Field key={param}>
                        <FieldLabel>{paramToTextMap[param]}</FieldLabel>
                        <FieldContent>
                            <Controller
                                control={form.control}
                                name={param as ItemParam}
                                render={({ field }) => <Input {...field} />}
                            />
                        </FieldContent>
                    </Field>
                ))}
            </FieldSet>
            <Separator />
        </>
    );
}
