import {
    Field,
    FieldContent,
    FieldError,
    FieldLabel,
    FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    categoryToParamsMap,
    paramToTextMap,
    paramValueToTextMap,
} from '@/constants';
import { cn } from '@/lib/utils';
import type { Category, ItemParam } from '@/types';
import { Controller, useFormContext } from 'react-hook-form';

import EditPageFormClearButton from './edit-page-form-clear-button';

type Props = {
    category: Category;
};

export default function EditPageFormCategoryParamsFields({ category }: Props) {
    const form = useFormContext();
    const categoryParams = categoryToParamsMap[category];

    return (
        <FieldSet className="md:max-w-1/2">
            <FieldLabel>Характеристики</FieldLabel>
            {categoryParams.map((param) => {
                const options = paramValueToTextMap[category][param];

                return (
                    <Controller
                        control={form.control}
                        name={param as ItemParam}
                        render={({ field, fieldState }) => (
                            <Field
                                key={param}
                                data-invalid={fieldState.invalid}
                            >
                                <FieldLabel htmlFor={`edit-form-${param}`}>
                                    {paramToTextMap[param]}
                                </FieldLabel>
                                <FieldContent>
                                    {options ? (
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger
                                                className={cn('w-full', {
                                                    'border-secondary-foreground':
                                                        !field.value,
                                                })}
                                                id={`edit-form-${param}`}
                                            >
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent
                                                align="center"
                                                position="popper"
                                            >
                                                {Object.entries(options).map(
                                                    ([k, v]) => (
                                                        <SelectItem
                                                            key={k}
                                                            value={k}
                                                        >
                                                            {v}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                id={`edit-form-${param}`}
                                                className={cn({
                                                    'border-secondary-foreground':
                                                        !field.value,
                                                })}
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                                autoComplete="off"
                                            />
                                            <EditPageFormClearButton
                                                className="absolute top-1/2 right-2.5 -translate-y-1/2"
                                                onClear={() => {
                                                    form.setValue(
                                                        field.name,
                                                        '',
                                                        {
                                                            shouldDirty: true,
                                                        },
                                                    );
                                                }}
                                            />
                                        </div>
                                    )}
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </FieldContent>
                            </Field>
                        )}
                    />
                );
            })}
        </FieldSet>
    );
}
