import { Search } from 'lucide-react';

import { Input } from '../ui/input';

type Props = {};
export default function SearchInput({}: Props) {
    return (
        <div className="relative flex-1">
            <Input
                placeholder="Найти объявление..."
                className="bg-input rounded-lg border-none placeholder:text-sm"
            />
            <Search
                className="absolute top-1/2 right-3 -translate-y-1/2"
                size={12}
            />
        </div>
    );
}
