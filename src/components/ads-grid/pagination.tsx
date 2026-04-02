import { useAdsQueryContext } from '@/context/ads-query-provider';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '../ui/button';

export default function Pagination() {
    const { queryParams, updateQueryParam, total } = useAdsQueryContext();

    const handleGoNext = () => {
        const newSkip = queryParams.skip + queryParams.limit;
        if (newSkip >= total) return;

        updateQueryParam({ skip: newSkip });
    };
    const handleGoBack = () => {
        const newSkip = queryParams.skip - queryParams.limit;
        if (newSkip < 0) return;

        updateQueryParam({ skip: newSkip });
    };
    const handlePageClick = (pageNumber: number) =>
        updateQueryParam({ skip: pageNumber * queryParams.limit });

    const currentPage = Math.floor(queryParams.skip / queryParams.limit) + 1;
    const totalPages = Math.ceil(total / queryParams.limit);

    return (
        <div className="flex items-center gap-2">
            <Button
                className="text-foreground/85 bg-white"
                onClick={handleGoBack}
                disabled={queryParams.skip - queryParams.limit < 0}
            >
                <ChevronLeft />
            </Button>
            <ul className="flex items-center gap-2">
                {Array(totalPages)
                    .fill(null)
                    .map((_, i) => (
                        <Button
                            key={i}
                            className={cn('text-foreground/85 bg-white', {
                                'border-button-active text-button-active border':
                                    i + 1 === currentPage,
                            })}
                            onClick={() => handlePageClick(i)}
                        >
                            {i + 1}
                        </Button>
                    ))}
            </ul>
            <Button
                className="text-foreground/85 bg-white"
                onClick={handleGoNext}
                disabled={queryParams.skip + queryParams.limit >= total}
            >
                <ChevronRight />
            </Button>
        </div>
    );
}
