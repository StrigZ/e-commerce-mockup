import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { sortColumns, sortDirections } from '@/constants';
import { useAdsQueryContext } from '@/context/ads-query-provider';
import type { SortColumnQueryParam, SortDirectionQueryParam } from '@/types';

const columnToTextMap: Record<SortColumnQueryParam, string> = {
    createdAt: 'новизне',
    title: 'названию',
    price: 'цене',
};

const directionToTextMap: Record<
    SortColumnQueryParam,
    Record<SortDirectionQueryParam, string>
> = {
    createdAt: {
        asc: 'сначала новые',
        desc: 'сначала старые',
    },
    title: {
        asc: 'А → Я',
        desc: 'Я → А',
    },
    price: {
        asc: 'сначала дешевле',
        desc: 'сначала дороже',
    },
};

function getDisplayText(
    column: SortColumnQueryParam,
    direction: SortDirectionQueryParam,
) {
    return `По ${columnToTextMap[column]} (${directionToTextMap[column][direction]})`;
}

function convertStringToParams(str: string) {
    const [column, direction] = str.split(':');

    return { column, direction };
}

function convertParamsToString(
    column: SortColumnQueryParam,
    direction: SortDirectionQueryParam,
) {
    return `${column}:${direction}`;
}

export default function SortDropdown() {
    const { queryParams, updateQueryParam } = useAdsQueryContext();

    const handleSortChange = (newSortStr: string) => {
        const params = convertStringToParams(newSortStr);
        const sortColumn = params.column as SortColumnQueryParam;
        const sortDirection = params.direction as SortDirectionQueryParam;

        updateQueryParam({ skip: 0, sortColumn, sortDirection });
    };

    return (
        <Select
            value={convertParamsToString(
                queryParams.sortColumn,
                queryParams.sortDirection,
            )}
            onValueChange={handleSortChange}
        >
            <SelectTrigger className="bg-card border-input w-60 border-4">
                <SelectValue
                    placeholder={getDisplayText(
                        queryParams.sortColumn,
                        queryParams.sortDirection,
                    )}
                />
            </SelectTrigger>
            <SelectContent align="center" position="popper">
                {sortColumns.map((column) =>
                    sortDirections.map((direction) => (
                        <SelectItem
                            value={convertParamsToString(column, direction)}
                            key={convertParamsToString(column, direction)}
                        >
                            {getDisplayText(column, direction)}
                        </SelectItem>
                    )),
                )}
            </SelectContent>
        </Select>
    );
}
