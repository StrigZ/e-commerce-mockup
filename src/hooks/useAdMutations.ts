import { adsApiClient } from '@/lib/ads-api-client';
import { getQueryClient } from '@/lib/query-client';
import { adKeys } from '@/lib/query-keys';
import type { UpdateAdInput } from '@/types';
import { useMutation } from '@tanstack/react-query';

// import { toast } from 'sonner';

export function useBotMutations() {
    const queryClient = getQueryClient();

    const updateBotMutation = useMutation({
        mutationFn: ({ id, data }: UpdateAdInput) =>
            adsApiClient.updateItem(id, data),
        onSuccess: async (data, variables) => {
            await queryClient.setQueryData(adKeys.detail(variables.id), data);
            await queryClient.invalidateQueries({ queryKey: adKeys.lists() });
            // toast.success('Объявление успешно обновлено!');
        },
        //   onError: ({ message }) => toast.error(message),
    });

    return {
        updateBot: updateBotMutation.mutate,
    };
}
