import {
    Field,
    FieldContent,
    FieldError,
    FieldLabel,
} from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Controller, useFormContext } from 'react-hook-form';

import EditPageFormGenerateButton from './edit-page-form-generate-button';

export default function EditPageFormDescriptionField() {
    const form = useFormContext();

    return (
        <Controller
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="edit-form-description">
                        Описание
                    </FieldLabel>
                    <FieldContent className="space-y-2">
                        <div className="relative">
                            <Textarea
                                {...field}
                                id="edit-form-description"
                                aria-invalid={fieldState.invalid}
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                            <span
                                className={cn(
                                    'text-foreground/25 absolute right-0 bottom-0 translate-y-full text-sm',
                                    {
                                        'text-red-500':
                                            field.value.length > 1000,
                                    },
                                )}
                            >
                                {field.value.length}/1000
                            </span>
                        </div>
                        <EditPageFormGenerateButton
                            type="description"
                            hasExistingValue={!!field.value}
                            onAccept={(value: string) =>
                                form.setValue(field.name, value, {
                                    shouldValidate: true,
                                    shouldDirty: true,
                                    shouldTouch: true,
                                })
                            }
                        />
                    </FieldContent>
                </Field>
            )}
        />
    );
}
