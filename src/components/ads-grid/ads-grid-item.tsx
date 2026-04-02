import { Image } from 'lucide-react';
import { Link } from 'react-router';

type Props = {};
export default function AdsGridItem({}: Props) {
    return (
        <li className="bg-card cursor-pointer overflow-hidden rounded-2xl shadow-sm">
            <Link to={'id'}>
                <div className="bg-muted flex aspect-4/3 items-center justify-center">
                    <Image size={72} />
                </div>
                <div className="relative space-y-1 px-4 pt-5.5">
                    <p className="border-muted text-foreground absolute top-0 left-4 -translate-y-1/2 rounded-md border bg-white px-3 text-sm">
                        Электроника
                    </p>
                    <p className="text-foreground">Наушники</p>
                    <p className="text-foreground/45 leading-[1.4] font-semibold">
                        2990 ₽
                    </p>
                    <p>Требует доработок</p>
                </div>
            </Link>
        </li>
    );
}
