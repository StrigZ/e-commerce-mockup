import { Field, FieldContent, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { categories, categoryToDisplayTextMap } from '@/constants';
import type { Category } from '@/types';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
    currentCategory: Category;
};

export default function EditPageFormBaseFields({ currentCategory }: Props) {
    const form = useFormContext();

    return (
        <>
            <Field>
                <FieldLabel>Категория</FieldLabel>
                <FieldContent>
                    <Controller
                        control={form.control}
                        name="category"
                        render={({ field: { value, onChange } }) => (
                            <Select value={value} onValueChange={onChange}>
                                <SelectTrigger className="bg-card border-input w-full border-4 sm:w-66">
                                    <SelectValue
                                        placeholder={
                                            categoryToDisplayTextMap[
                                                currentCategory
                                            ]
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent align="center" position="popper">
                                    {categories.map((c) => (
                                        <SelectItem value={c} key={c}>
                                            {categoryToDisplayTextMap[c]}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                </FieldContent>
            </Field>
            <Separator />
            <Field className="md:max-w-1/2">
                <FieldLabel>
                    <span className="text-red-500">*</span> Название
                </FieldLabel>
                <FieldContent>
                    <Controller
                        control={form.control}
                        name="title"
                        render={({ field }) => <Input {...field} required />}
                    />
                </FieldContent>
            </Field>
            <Separator />
            <Field className="md:max-w-1/2">
                <FieldLabel>
                    <span className="text-red-500">*</span> Цена
                </FieldLabel>
                <FieldContent>
                    <Controller
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <Input {...field} type="number" required />
                        )}
                    />
                </FieldContent>
            </Field>
        </>
    );
}
