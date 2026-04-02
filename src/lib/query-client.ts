import {
    QueryClient,
    defaultShouldDehydrateQuery,
} from '@tanstack/react-query';
import SuperJSON from 'superjson';

let clientQueryClientSingleton: QueryClient | undefined = undefined;

export const createQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 15 * 60 * 1000,
            },
            dehydrate: {
                serializeData: SuperJSON.serialize,
                shouldDehydrateQuery: (query) =>
                    defaultShouldDehydrateQuery(query) ||
                    query.state.status === 'pending',
            },
            hydrate: {
                deserializeData: SuperJSON.deserialize,
            },
        },
    });

export const getQueryClient = () => {
    clientQueryClientSingleton ??= createQueryClient();

    return clientQueryClientSingleton;
};
