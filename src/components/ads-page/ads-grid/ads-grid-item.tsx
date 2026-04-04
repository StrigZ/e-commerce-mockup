import { categoryToDisplayTextMap } from '@/constants';
import type { Item } from '@/types';
import { Image } from 'lucide-react';
import { Link } from 'react-router';

export default function AdsGridItem({
    id,
    title,
    price,
    category,
    needsRevision,
}: Omit<Item, 'params'>) {
    return (
        <li className="bg-card w-full cursor-pointer overflow-hidden rounded-2xl shadow-sm">
            <Link to={String(id)} className="flex h-full flex-col">
                <div className="bg-muted flex aspect-4/3 items-center justify-center">
                    <Image size={72} />
                </div>
                <div className="relative flex h-full flex-col gap-1 p-4 pt-5.5">
                    <p className="border-muted text-foreground/85 absolute top-0 left-3 -translate-y-1/2 rounded-md border bg-white px-3 text-sm">
                        {categoryToDisplayTextMap[category]}
                    </p>
                    <h5 className="text-foreground/85 truncate text-base">
                        {title}
                    </h5>
                    <p className="text-foreground/45 mt-auto text-base leading-[1.4] font-semibold tracking-normal">
                        {price} ₽
                    </p>
                    {needsRevision && (
                        <div className="bg-secondary text-secondary-foreground flex w-fit items-center gap-2 rounded-lg px-2 py-0.5 text-sm">
                            <div className="bg-secondary-foreground h-1.5 w-1.5 rounded-full" />
                            Требует доработок
                        </div>
                    )}
                </div>
            </Link>
        </li>
    );
}
