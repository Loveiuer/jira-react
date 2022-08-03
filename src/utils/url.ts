import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { filterNullValues } from "utils";

export const useURLSearchParams = <T extends string>(params: T[]) => {
    const [searchParams] = useSearchParams();
    const setSearchParams = useSetURLSearchParams();
    // const [stateParams] = useState(params)
    return [
        useMemo(
            () =>
                params.reduce((pre, cur) => {
                    return { ...pre, [cur]: searchParams.get(cur) || "" };
                }, {} as { [key in T]: string }),
            // eslint-disable-next-line  react-hooks/exhaustive-deps
            [searchParams]
        ),
        (params: Partial<{ [key in T]: unknown }>) => {
            return setSearchParams(params);
        },
    ] as const;
};

export const useSetURLSearchParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    return (params: { [key: string]: unknown }) => {
        const o = filterNullValues({
            ...Object.fromEntries(searchParams),
            ...params,
        });
        return setSearchParams(o);
    };
};
