import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

type SortingRule = {
    ruleDisplayText: 'названию' | 'новизне' | 'цене';
    order: {
        orderDisplayText: string;
        value?: string;
    }[];
};

const sortingRules: SortingRule[] = [
    {
        ruleDisplayText: 'новизне',
        order: [
            {
                orderDisplayText: 'сначала новые',
                value: 'date:asc',
            },
            {
                orderDisplayText: 'сначала старые',
                value: 'date:desc',
            },
        ],
    },
    {
        ruleDisplayText: 'названию',
        order: [
            {
                orderDisplayText: 'А → Я',
                value: 'name:asc',
            },
            {
                orderDisplayText: 'Я → А',
                value: 'name:desc',
            },
        ],
    },
    {
        ruleDisplayText: 'цене',
        order: [
            {
                orderDisplayText: 'сначала дешевле',
                value: 'price:asc',
            },
            {
                orderDisplayText: 'сначала дороже',
                value: 'price:desc',
            },
        ],
    },
];

type Props = { className?: string };
export default function SortDropdown({ className }: Props) {
    const [sortingRule, setSortingRule] = useState(
        sortingRules[0].order[0].value,
    );

    return (
        <Select
            value={sortingRule}
            onValueChange={(value) => setSortingRule(value)}
        >
            <SelectTrigger className="bg-card border-input w-60 border-4">
                <SelectValue placeholder={sortingRule} />
            </SelectTrigger>
            <SelectContent align="center" position="popper">
                {sortingRules.map(({ ruleDisplayText, order }) =>
                    order.map(({ orderDisplayText, value }) => (
                        <SelectItem value={value!}>
                            {`по ${ruleDisplayText} (${orderDisplayText})`}
                        </SelectItem>
                    )),
                )}
            </SelectContent>
        </Select>
    );
}
