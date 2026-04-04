import { cn } from '@/lib/utils';
import { CircleX } from 'lucide-react';

type Props = { onClear: () => void; className?: string };
export default function EditPageFormClearButton({ onClear, className }: Props) {
    return (
        <button
            className={cn(
                'scale-105 cursor-pointer active:scale-100',
                className,
            )}
            onClick={onClear}
            type="button"
        >
            <CircleX size={12} />
        </button>
    );
}
