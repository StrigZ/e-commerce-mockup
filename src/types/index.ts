import type { categories, sortColumns, sortDirections } from '@/constants';

export type Item = {
    id: number;
    title: string;
    description?: string;
    price: number | null;
    createdAt: string;
    updatedAt: string;
} & (
    | {
          category: 'auto';
          params: AutoItemParams;
      }
    | {
          category: 'real_estate';
          params: RealEstateItemParams;
      }
    | {
          category: 'electronics';
          params: ElectronicsItemParams;
      }
);

type AutoItemParams = {
    brand?: string;
    model?: string;
    yearOfManufacture?: number;
    transmission?: AutoItemTransmission;
    mileage?: number;
    enginePower?: number;
};

export type AutoItemTransmission = 'automatic' | 'manual';
export type AutoItemParam = keyof AutoItemParams;

type RealEstateItemParams = {
    type?: RealEstateItemType;
    address?: string;
    area?: number;
    floor?: number;
};

export type RealEstateItemType = 'flat' | 'house' | 'room';
export type RealEstateItemParam = keyof RealEstateItemParams;

type ElectronicsItemParams = {
    type?: ElectronicsItemType;
    brand?: string;
    model?: string;
    condition?: ElectronicsItemCondition;
    color?: string;
};
export type ElectronicsItemType = 'phone' | 'laptop' | 'misc';
export type ElectronicsItemCondition = 'new' | 'used';
export type ElectronicsItemParam = keyof ElectronicsItemParams;

export type ItemParam =
    | AutoItemParam
    | RealEstateItemParam
    | ElectronicsItemParam;

export type ItemSortColumn = Extract<keyof Item, 'title' | 'createdAt'>;

export type SortDirection = 'asc' | 'desc';

export type UpdateAdInput = {
    id: string;
    data: Item;
};

export type SortColumnQueryParam = (typeof sortColumns)[number];
export type SortDirectionQueryParam = (typeof sortDirections)[number];
export type Category = (typeof categories)[number];

export type QueryParamsObject = {
    q: string;
    limit: number;
    skip: number;
    needsRevision: boolean;
    categories: Category[];
    sortColumn: SortColumnQueryParam;
    sortDirection: SortDirectionQueryParam;
};

export type QueryParam = keyof QueryParamsObject;
