import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverAnchor,
    PopoverContent,
} from '@/components/ui/popover';
import useAI from '@/hooks/use-ai';
import { cn } from '@/lib/utils';
import { Lightbulb, Loader, LoaderCircle, RotateCcw } from 'lucide-react';
import { useState } from 'react';

type ButtonState = 'initial' | 'loading' | 'finished' | 'error';

type AIResult = {
    display: string;
    formValue: string;
};

type Props = {
    type: 'description' | 'price';
    hasExistingValue?: boolean;
    onAccept: (value: string) => void;
};

function getButtonText(
    type: Props['type'],
    state: ButtonState,
    hasExistingValue?: boolean,
): string {
    if (state === 'loading') return 'Выполняется запрос';
    if (state === 'finished' || state === 'error')
        return type === 'description'
            ? 'Сгенерировать заново'
            : 'Узнать заново';

    if (type === 'description') {
        return hasExistingValue ? 'Улучшить описание' : 'Придумать описание';
    }
    return 'Узнать рыночную стоимость';
}

const stateToIcon: Record<ButtonState, React.ReactNode> = {
    initial: <Lightbulb />,
    loading: <LoaderCircle className="animate-spin" />,
    finished: <RotateCcw />,
    error: <RotateCcw />,
};

export default function EditPageFormGenerateButton({
    type,
    onAccept,
    hasExistingValue,
}: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [result, setResult] = useState<AIResult | null>(null);
    const [hasError, setHasError] = useState(false);
    const { generateDescription, generatePriceOverview, isLoading } = useAI();

    const buttonState: ButtonState = isLoading
        ? 'loading'
        : hasError
          ? 'error'
          : result
            ? 'finished'
            : 'initial';

    const handleButtonClick = async () => {
        setHasError(false);
        setResult(null);
        setIsOpen(false);

        try {
            const res =
                type === 'description'
                    ? await generateDescription()
                    : await generatePriceOverview();

            setResult(
                typeof res === 'string'
                    ? { display: res, formValue: res }
                    : {
                          display: res.overview,
                          formValue: String(res.priceMin),
                      },
            );
        } catch {
            setHasError(true);
        } finally {
            setIsOpen(true);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleAccept = () => {
        if (result) onAccept(result.formValue);
        setIsOpen(false);
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverAnchor asChild>
                <Button
                    className="flex w-max items-center justify-center"
                    variant="secondary"
                    onClick={handleButtonClick}
                    type="button"
                >
                    {stateToIcon[buttonState]}
                    {getButtonText(type, buttonState, hasExistingValue)}
                </Button>
            </PopoverAnchor>
            <PopoverContent
                className={cn('w-83', { 'bg-red-100': hasError })}
                align="center"
            >
                <p
                    className={cn('text-sm font-medium', {
                        'text-red-400': hasError,
                    })}
                >
                    {hasError
                        ? 'Произошла ошибка при запросе к AI'
                        : 'Ответ AI:'}
                </p>
                <div>
                    {hasError ? (
                        'Попробуйте повторить запрос или закройте уведомление'
                    ) : isLoading ? (
                        <Loader className="mx-auto my-2 animate-spin" />
                    ) : (
                        result?.display
                    )}
                </div>
                <div className="space-x-2.5">
                    {!hasError && (
                        <Button type="button" onClick={handleAccept}>
                            Применить
                        </Button>
                    )}
                    <Button
                        className={cn({ 'bg-red-200': hasError })}
                        type="button"
                        variant="outline"
                        onClick={handleClose}
                    >
                        Закрыть
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
