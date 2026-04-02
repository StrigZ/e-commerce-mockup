export const adKeys = {
    all: ['items'] as const,
    lists: () => [...adKeys.all, 'list'] as const,
    details: () => [...adKeys.all, 'detail'] as const,
    detail: (id: string) => [...adKeys.details(), id] as const,
};
