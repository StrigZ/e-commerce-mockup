import { Field, FieldContent, FieldLabel } from '@/components/ui/field';
import { Controller, useFormContext } from 'react-hook-form';

export default function EditPageFormDescriptionField() {
    const form = useFormContext();

    return (
        <Field>
            <FieldLabel>Описание</FieldLabel>
            <FieldContent>
                <Controller
                    control={form.control}
                    name="description"
                    render={({ field }) => <textarea {...field} />}
                />
            </FieldContent>
        </Field>
    );
}
