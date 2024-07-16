import { ActionState, FieldErrors } from "@/lib/create-safe-actions";
import { useCallback, useState } from "react";

type Action<TInput, TOutput> = (
  data: TInput,
) => Promise<ActionState<TInput, TOutput>>;

interface UserActionOption<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: UserActionOption<TOutput> = {},
) => {
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<TInput> | undefined
  >(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [isLoading, setIsloading] = useState<boolean>(false);

  const execute = useCallback(
    async (input: TInput) => {
      setIsloading(true);

      try {
        const result = await action(input);

        if (!result) {
          return;
        }

        setFieldErrors(result.fieldErrors);

        if (result.error) {
          setError(result.error);
          options.onError?.(result.error);
        }

        if (result.data) {
          setData(data);
          options.onSuccess?.(result.data);
        }
      } finally {
        setIsloading(false);
        options.onComplete?.();
      }
    },
    [action, options],
  );

  return {
    execute,
    fieldErrors,
    error,
    data,
    isLoading,
  };
};
