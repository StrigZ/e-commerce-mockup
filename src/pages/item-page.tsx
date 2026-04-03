import ItemPageBody from '@/components/item-page/item-page-body/item-page-body';
import ItemPageHeader from '@/components/item-page/item-page-header';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { Separator } from '@/components/ui/separator';
import { useAd } from '@/hooks/useAds';
import { useParams } from 'react-router';

type Props = {};
export default function ItemPage({}: Props) {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useAd({ id });

    if (isLoading || !data) {
        return <LoadingSpinner className="h-screen" />;
    }

    return (
        <main className="container mx-auto bg-white p-8">
            <ItemPageHeader {...data} />
            <Separator className="my-8" />
            <ItemPageBody {...data} />
        </main>
    );
}
