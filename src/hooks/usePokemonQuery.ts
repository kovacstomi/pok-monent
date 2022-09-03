import { useCallback, useEffect, useState } from "react";

type UsePokemonQueryProps<TypeOfData> = {
  callbackFn: () => Promise<TypeOfData>;
  enabled?: boolean;
};

type QueryState<TypeOfData, TypeOfError> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; error: TypeOfError }
  | { status: "success"; data: TypeOfData };

const usePokemonQuery = <TypeOfData = unknown, TypeOfError = unknown>({
  callbackFn,
  enabled = true,
}: UsePokemonQueryProps<TypeOfData>) => {
  const [queryState, setQueryState] = useState<
    QueryState<TypeOfData, TypeOfError>
  >({
    status: "idle",
  });

  const fetchQuery = useCallback(async () => {
    setQueryState({ status: "loading" });
    try {
      const data = await callbackFn();
      setQueryState({ status: "success", data });
    } catch (error: any) {
      console.error(error);
      setQueryState({ status: "error", error });
    }
  }, [callbackFn]);

  useEffect(() => {
    if (enabled && queryState.status === "idle") {
      fetchQuery();
    }
  }, [enabled, fetchQuery, queryState.status]);

  return {
    isLoading: queryState.status === "loading",
    isError: queryState.status === "error",
    isSuccess: queryState.status === "success",
    isIdle: queryState.status === "idle",
    data: queryState.status === "success" ? queryState.data : undefined,
    error: queryState.status === "error" ? queryState.error : undefined,
  };
};

export default usePokemonQuery;
