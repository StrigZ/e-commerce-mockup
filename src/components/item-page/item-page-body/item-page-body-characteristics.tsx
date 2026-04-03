import { paramToTextMap } from '@/constants';
import type { Category, ItemParam } from '@/types';

type ParamValueToTextMap = {
    [C in Category]: {
        [P in ItemParam]?: Record<string, string>;
    };
};
const paramValueToTextMap: ParamValueToTextMap = {
    auto: {
        transmission: {
            automatic: 'Автоматика',
            manual: 'Ручное',
        },
    },
    real_estate: {
        type: {
            flat: 'Квартира',
            house: 'Дом',
            room: 'Комната',
        },
    },
    electronics: {
        type: {
            phone: 'Телефон',
            laptop: 'Ноутбук',
            misc: 'Другое',
        },
        condition: {
            new: 'Новое',
            used: 'Б\\У',
        },
    },
};

type Props = {
    assignedParams: [ItemParam, string | number][];
    category: Category;
};
export default function ItemPageBodyCharacteristics({
    assignedParams,
    category,
}: Props) {
    return (
        <div className="space-y-4">
            <p className="text-foreground/85 text-[22px] font-medium">
                Характеристики
            </p>
            <ul>
                {assignedParams.map(([param, value]) => (
                    <li className="grid grid-cols-2" key={param}>
                        <p className="text-foreground/45 font-semibold">
                            {paramToTextMap[param]}
                        </p>
                        <p className="font-normal">
                            {paramValueToTextMap[category][param]?.[value] ??
                                value}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
