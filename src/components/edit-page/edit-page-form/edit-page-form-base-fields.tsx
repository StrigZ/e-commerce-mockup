import {
    Field,
    FieldContent,
    FieldError,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Controller, useFormContext } from 'react-hook-form';

import EditPageFormClearButton from './edit-page-form-clear-button';
import EditPageFormGenerateButton from './edit-page-form-generate-button';

const baseFields = [
    {
        fieldName: 'title',
        fieldText: 'Название',
    },
    {
        fieldName: 'price',
        fieldText: 'Цена',
    },
];

export default function EditPageFormBaseFields() {
    const form = useFormContext();
    return baseFields.map(({ fieldName, fieldText }) => (
        <>
            <Controller
                control={form.control}
                name={fieldName}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={`edit-form-${fieldName}`}>
                            <span className="text-red-500">*</span> {fieldText}
                        </FieldLabel>
                        <FieldContent className="space-y-2">
                            <div className="relative">
                                <Input
                                    {...field}
                                    className={cn({
                                        'border-red-500':
                                            fieldState.error &&
                                            fieldState.isDirty,
                                    })}
                                    required
                                    id={`edit-form-${fieldName}`}
                                    aria-invalid={fieldState.invalid}
                                    autoComplete="off"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        if (fieldState.error) {
                                            form.trigger(field.name);
                                        }
                                    }}
                                />
                                <EditPageFormClearButton
                                    className="absolute top-1/2 right-2.5 -translate-y-1/2"
                                    onClear={() => {
                                        form.setValue(field.name, '', {
                                            shouldValidate: true,
                                        });
                                    }}
                                />
                            </div>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                            {field.name === 'price' && (
                                <EditPageFormGenerateButton
                                    type="price"
                                    onAccept={(value: string) =>
                                        form.setValue(field.name, value, {
                                            shouldValidate: true,
                                            shouldDirty: true,
                                            shouldTouch: true,
                                        })
                                    }
                                />
                            )}
                        </FieldContent>
                    </Field>
                )}
            />
            <Separator className="my-4.5" />
        </>
    ));
}
