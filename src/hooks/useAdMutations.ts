import { adsApiClient } from '@/lib/ads-api-client';
import { getQueryClient } from '@/lib/query-client';
import { adKeys } from '@/lib/query-keys';
import type { UpdateAdInput } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export function useAdMutations() {
    const queryClient = getQueryClient();
    const navigate = useNavigate();
    const updateAdMutation = useMutation({
        mutationFn: ({ id, data }: UpdateAdInput) =>
            adsApiClient.updateItem(id, data),
        onSuccess: async (_, variables) => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: adKeys.lists() }),
                queryClient.invalidateQueries({
                    queryKey: adKeys.detail(variables.id),
                }),
            ]);
            localStorage.removeItem(`edit-form-${variables.id}`);
            toast.success('Изменения сохранены', { position: 'top-right' });
            navigate(`/ads/${variables.id}`);
        },
        onError: () =>
            toast.error('Ошибка сохранения', {
                position: 'top-right',
                description:
                    'При попытке сохранить изменения произошла ошибка. Попробуйте ещё раз или зайдите позже.',
            }),
    });

    return {
        updateAd: updateAdMutation.mutate,
        isUpdating: updateAdMutation.isPending,
    };
}
