import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "utils";

interface State<D> {
    error: Error | null;
    data: D | null;
    stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
    data: null,
    stat: "idle",
    error: null,
};

const defaultConfig = {
    throwError: false,
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
    const mountedRef = useMountedRef();

    return useCallback(
        (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
        [mountedRef, dispatch]
    );
};

export const useAsync = <T>(
    initialState?: State<T>,
    initialConfig?: typeof defaultConfig
) => {
    const [state, dispatch] = useReducer(
        (state: State<T>, action: Partial<State<T>>) => ({
            ...state,
            ...action,
        }),
        {
            ...defaultInitialState,
            ...initialState,
        }
    );

    const config = {
        ...defaultConfig,
        ...initialConfig,
    };
    const [retry, setRetry] = useState(() => () => {});
    const safeDispatch = useSafeDispatch(dispatch);

    const setData = useCallback(
        (data: T) =>
            safeDispatch({
                error: null,
                data,
                stat: "success",
            }),
        [safeDispatch]
    );

    const setError = useCallback(
        (error: Error) =>
            safeDispatch({
                error,
                data: null,
                stat: "error",
            }),
        [safeDispatch]
    );

    // run 用来触发异步请求
    const run = useCallback(
        (promise: Promise<T>, runConfig?: { retry: () => Promise<T> }) => {
            if (!promise || !promise.then) {
                throw new Error("请传入 Promise 类型数据");
            }

            setRetry(() => () => {
                if (runConfig?.retry) {
                    run(runConfig?.retry(), runConfig);
                }
            });
            safeDispatch({ stat: "loading" });
            return promise
                .then((data) => {
                    setData(data);
                    return data;
                })
                .catch((error) => {
                    setError(error);
                    if (config.throwError) throw error;
                    return error;
                });
        },
        [config.throwError, setData, setError, safeDispatch]
    );

    return {
        isIdle: state.stat === "idle",
        isLoading: state.stat === "loading",
        isError: state.stat === "error",
        isSuccess: state.stat === "success",
        run,
        setData,
        setError,
        retry,
        ...state,
    };
};
