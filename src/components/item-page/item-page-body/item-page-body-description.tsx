import type { Item } from '@/types';

type Props = { description: Item['description'] };
export default function ItemPageBodyDescription({ description }: Props) {
    return (
        <div>
            <p className="text-foreground/85 text-[22px] font-medium">
                Описание
            </p>
            <p>
                {description && description.length > 0
                    ? description
                    : 'Отсутствует'}
            </p>
        </div>
    );
}
