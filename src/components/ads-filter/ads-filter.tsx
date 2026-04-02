import { Separator } from '@/components/ui/separator';

import AdsCategoryFilter from './ads-category-filter';
import NeedRevisionSwitch from './need-revision-switch';

export default function AdsFilter() {
    return (
        <div className="bg-card flex flex-col gap-2.5 rounded-lg p-4">
            <h5 className="text-base font-medium">Фильтры</h5>
            <AdsCategoryFilter />
            <Separator />
            <NeedRevisionSwitch />
        </div>
    );
}
