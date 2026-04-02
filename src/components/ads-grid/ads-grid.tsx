import AdsGridItem from './ads-grid-item';

const items = Array(10)
    .fill(null)
    .map((_, i) => i);

type Props = {};
export default function AdsGrid({}: Props) {
    return (
        <ul className="grid h-full w-full flex-4 grid-flow-col grid-rows-2 gap-x-[13.75px] gap-y-3">
            {items.map((_) => (
                <AdsGridItem />
            ))}
        </ul>
    );
}
