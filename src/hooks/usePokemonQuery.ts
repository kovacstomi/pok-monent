import { useCallback, useEffect, useState } from "react";

type UsePokemonQueryProps = {
  callbackFn: () => Promise<any>;
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
}: UsePokemonQueryProps) => {
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
      setQueryState({ status: "error", error });
    }
  }, [callbackFn]);

  useEffect(() => {
    if (enabled) {
      fetchQuery();
    }
  }, [enabled, fetchQuery]);

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
