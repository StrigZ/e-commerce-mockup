import type { ItemParam } from './types';

export const sortColumns = ['createdAt', 'title', 'price'] as const;

export const sortDirections = ['asc', 'desc'] as const;

export const categories = ['auto', 'real_estate', 'electronics'] as const;

export const autoItemParams = [
    'brand',
    'model',
    'yearOfManufacture',
    'transmission',
    'mileage',
    'enginePower',
] as const;

export const realEstateParams = ['type', 'address', 'area', 'floor'] as const;

export const electronicsParams = [
    'type',
    'brand',
    'model',
    'condition',
    'color',
] as const;

export const paramToTextMap: Record<ItemParam, string> = {
    address: 'Адрес',
    area: 'Площадь',
    brand: 'Бренд',
    color: 'Цвет',
    condition: 'Состояние',
    enginePower: 'Мощность',
    floor: 'Этаж',
    mileage: 'Пробег',
    model: 'Модель',
    transmission: 'Трансмиссия',
    type: 'Тип',
    yearOfManufacture: 'Год производства',
};
