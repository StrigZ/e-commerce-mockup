import { categoryToDisplayTextMap } from '@/constants';
import { cn } from '@/lib/utils';
import type { Item } from '@/types';
import { Image } from 'lucide-react';
import { Link } from 'react-router';

type Props = {
    item: Omit<Item, 'params'>;
    layout: 'grid' | 'list';
};
export default function AdsGridItem({
    item: { id, title, price, category, needsRevision },
    layout,
}: Props) {
    return (
        <li className="bg-card w-full cursor-pointer overflow-hidden rounded-2xl shadow-sm">
            <Link
                to={String(id)}
                className={cn('flex h-full', {
                    'flex-row': layout === 'list',
                    'flex-col': layout === 'grid',
                })}
            >
                <div className="bg-muted flex items-center justify-center p-2 sm:aspect-4/3">
                    <Image
                        className={cn({
                            'sm:h-18 sm:w-18': layout === 'list',
                            'h-18 w-18': layout === 'grid',
                        })}
                    />
                </div>
                <div
                    className={cn('relative flex h-full flex-col gap-1 p-4', {
                        'pt-5.5': layout === 'grid',
                        'pl-6': layout === 'list',
                    })}
                >
                    <p
                        className={cn('text-subtle rounded-md text-sm', {
                            'border-muted bg-card absolute top-0 left-3 -translate-y-1/2 border px-3':
                                layout === 'grid',
                        })}
                    >
                        {categoryToDisplayTextMap[category]}
                    </p>
                    <h5 className="text-foreground truncate text-base">
                        {title}
                    </h5>
                    <p
                        className={cn(
                            'text-subtle text-base leading-[1.4] font-semibold tracking-normal',
                            { 'mt-auto': layout === 'grid' },
                        )}
                    >
                        {price} ₽
                    </p>
                    {needsRevision && (
                        <div className="text-secondary-foreground bg-warning flex w-fit items-center gap-2 rounded-lg px-2 py-0.5 text-sm">
                            <div className="bg-warning-foreground h-1.5 w-1.5 rounded-full" />
                            Требует доработок
                        </div>
                    )}
                </div>
            </Link>
        </li>
    );
}
