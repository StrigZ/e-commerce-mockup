import { Field, FieldLabel } from '@/components/ui/field';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { categories, categoryToDisplayTextMap } from '@/constants';
import type { Category } from '@/types';

type Props = { value: Category; onChange: (value: Category) => void };
export default function EditPageFormCategorySelect({ value, onChange }: Props) {
    return (
        <Field>
            <FieldLabel htmlFor="edit-form-category">Категория</FieldLabel>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger
                    className="w-full sm:w-66"
                    id="edit-form-category"
                >
                    <SelectValue />
                </SelectTrigger>
                <SelectContent align="center" position="popper">
                    {categories.map((c) => (
                        <SelectItem value={c} key={c}>
                            {categoryToDisplayTextMap[c]}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </Field>
    );
}
