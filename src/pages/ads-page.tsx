import AdsFilter from '@/components/ads-filter/ads-filter';
import ResetFiltersButton from '@/components/ads-filter/reset-filters-button';
import AdsGrid from '@/components/ads-grid/ads-grid';
import SearchBar from '@/components/search-bar/search-bar';

type Props = {};
export default function AdsPage({}: Props) {
    return (
        <div className="flex h-full w-full flex-col gap-4">
            <header className="flex flex-col gap-4">
                <div>
                    <h1 className="text-2xl text-[22px] font-medium">
                        Мои объявления
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        {42} объявления
                    </p>
                </div>
                <SearchBar />
            </header>
            <div className="flex h-full w-full flex-col items-start gap-6 md:flex-row">
                <aside className="flex w-full flex-1 flex-col gap-2.5">
                    <AdsFilter />
                    <ResetFiltersButton />
                </aside>
                <AdsGrid />
            </div>
        </div>
    );
}
