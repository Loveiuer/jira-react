import { useCallback, useState } from "react";
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

export const useAsync = <T>(
    initialState?: State<T>,
    initialConfig?: typeof defaultConfig
) => {
    const [state, setState] = useState<State<T>>({
        ...defaultInitialState,
        ...initialState,
    });

    const config = {
        ...defaultConfig,
        ...initialConfig,
    };
    const [retry, setRetry] = useState(() => () => {});
    const mountedRef = useMountedRef();

    const setData = useCallback(
        (data: T) =>
            setState({
                error: null,
                data,
                stat: "success",
            }),
        []
    );

    const setError = useCallback(
        (error: Error) =>
            setState({
                error,
                data: null,
                stat: "error",
            }),
        []
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
            setState((preState) => ({ ...preState, stat: "loading" }));
            return promise
                .then((data) => {
                    if (mountedRef.current) setData(data);
                    return data;
                })
                .catch((error) => {
                    setError(error);
                    if (config.throwError) throw error;
                    return error;
                });
        },
        [config.throwError, mountedRef, setData, setError]
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
