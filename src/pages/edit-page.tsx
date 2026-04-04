import EditPageForm from '@/components/edit-page/edit-page-form/edit-page-form';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { useAd } from '@/hooks/useAds';
import { useParams } from 'react-router';

export default function EditPage() {
    const { id } = useParams<{ id: string }>();

    const { data, isLoading } = useAd({ id });

    if (isLoading || !data) {
        return <LoadingSpinner />;
    }

    return (
        <main className="space-y-4.5 p-8 pb-12">
            <h2 className="text-foreground/85 text-2xl font-medium sm:text-3xl">
                Редактирование объявления
            </h2>
            <EditPageForm {...data} />
        </main>
    );
}
