import { paramToTextMap } from '@/constants';
import type { ItemParam } from '@/types';

type Props = { missingParams: ItemParam[] };
export default function ItemPageBodyMissingParams({ missingParams }: Props) {
    return (
        <div className="bg-secondary grid grid-cols-[min-content_1fr] gap-4 rounded-lg px-4 py-3 shadow">
            <div className="bg-secondary-foreground flex h-4 w-4 items-center justify-center rounded-full p-1 text-white">
                !
            </div>

            <div className="space-y-2">
                <p className="font-semibold">Требуются доработки</p>
                <div className="text-foreground/85 text-sm">
                    <p>У объявления не заполнены поля:</p>
                    <ul className="list-disc pl-6">
                        {missingParams.map((param) => (
                            <li key={param}>{paramToTextMap[param]}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
