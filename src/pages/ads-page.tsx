import SearchBar from '@/components/search-bar/search-bar';

type Props = {};
export default function AdsPage({}: Props) {
    return (
        <div>
            <header className="flex flex-col gap-4">
                <div>
                    <h1 className="text-2xl font-medium">Мои объявления</h1>
                    <p className="text-muted-foreground text-lg">
                        {42} объявления
                    </p>
                </div>
                <SearchBar />
            </header>
            <aside>sorting</aside>
            <div>grid</div>
        </div>
    );
}
