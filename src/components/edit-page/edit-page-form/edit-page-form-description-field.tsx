import {
    Field,
    FieldContent,
    FieldError,
    FieldLabel,
} from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { Controller, useFormContext } from 'react-hook-form';

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
                    <FieldContent>
                        <Textarea
                            {...field}
                            id="edit-form-description"
                            aria-invalid={fieldState.invalid}
                            autoComplete="off"
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </FieldContent>
                </Field>
            )}
        />
    );
}
