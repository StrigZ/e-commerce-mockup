import { Switch } from '@/components/ui/switch';
import { useAdsQueryContext } from '@/context/ads-query-provider';

export default function NeedRevisionSwitch() {
    const { queryParams, updateQueryParam } = useAdsQueryContext();

    const handleCheckedChange = (checked: boolean) =>
        updateQueryParam({ skip: 0, needsRevision: !!checked });

    return (
        <label className="flex items-center justify-between text-sm font-bold">
            Только требующие доработок
            <Switch
                size="default"
                checked={queryParams.needsRevision}
                onCheckedChange={handleCheckedChange}
            />
        </label>
    );
}
