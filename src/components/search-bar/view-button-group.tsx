import { cn } from '@/lib/utils';
import { LayoutGrid, List } from 'lucide-react';

import { Button } from '../ui/button';

type Props = {
    layout: 'grid' | 'list';
};
export default function ViewButtonGroup({ layout }: Props) {
    return (
        <div className="bg-input relative flex items-center rounded-lg">
            <Button
                className={cn({ 'text-button-active': layout === 'grid' })}
                variant={'link'}
                size={'icon'}
            >
                <LayoutGrid />
            </Button>

            <div className="absolute top-1/2 left-1/2 h-[calc(100%-4px)] w-0.5 -translate-x-1/2 -translate-y-1/2 bg-white" />

            <Button
                className={cn({ 'text-button-active': layout === 'list' })}
                variant={'link'}
                size={'icon'}
            >
                <List />
            </Button>
        </div>
    );
}
