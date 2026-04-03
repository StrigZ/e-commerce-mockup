import {
    autoItemParams,
    electronicsParams,
    realEstateParams,
} from '@/constants';
import type { Item, ItemParam } from '@/types';
import { Image } from 'lucide-react';

import ItemPageBodyCharacteristics from './item-page-body-characteristics';
import ItemPageBodyDescription from './item-page-body-description';
import ItemPageBodyMissingParams from './item-page-body-missing-params';

const categoryToParamsMap = {
    auto: autoItemParams,
    real_estate: realEstateParams,
    electronics: electronicsParams,
};

function getParamValue(params: Item['params'], param: ItemParam) {
    return (params as Record<ItemParam, string | number | undefined>)[param];
}

export default function ItemPageBody({ description, params, category }: Item) {
    const categoryParams = categoryToParamsMap[category];
    const paramsArray = Object.entries(params) as [
        ItemParam,
        string | number,
    ][];
    const missingParams = categoryParams.filter(
        (param) => !getParamValue(params, param as ItemParam),
    );
    const assignedParams = paramsArray.filter(([, value]) => Boolean(value));

    return (
        <div>
            <div className="space-y-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="bg-muted relative flex aspect-4/3 items-center justify-center md:max-w-120">
                        <Image size={144} />
                    </div>
                    <div className="space-y-9">
                        {missingParams.length > 0 && (
                            <ItemPageBodyMissingParams
                                missingParams={missingParams}
                            />
                        )}

                        {assignedParams.length > 0 && (
                            <ItemPageBodyCharacteristics
                                assignedParams={assignedParams}
                                category={category}
                            />
                        )}
                    </div>
                </div>
                <ItemPageBodyDescription description={description} />
            </div>
        </div>
    );
}
