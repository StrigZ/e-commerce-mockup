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

const baseFields = [
    {
        fieldName: 'title',
        fieldText: 'Название',
        fieldType: 'text',
    },
    {
        fieldName: 'price',
        fieldText: 'Цена',
        fieldType: 'number',
    },
];

export default function EditPageFormBaseFields() {
    const form = useFormContext();
    return baseFields.map(({ fieldName, fieldText, fieldType }) => (
        <>
            <Controller
                control={form.control}
                name={fieldName}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={`edit-form-${fieldName}`}>
                            <span className="text-red-500">*</span> {fieldText}
                        </FieldLabel>
                        <FieldContent>
                            <Input
                                {...field}
                                className={cn({
                                    'border-red-500':
                                        fieldState.error && fieldState.isDirty,
                                })}
                                type={fieldType}
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
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </FieldContent>
                    </Field>
                )}
            />
            <Separator className="my-4.5" />
        </>
    ));
}
