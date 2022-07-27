import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { filterNullValues } from "utils";

export const useURLSearchParams = <T extends string>(params: T[]) => {
    const [searchParams, setSearchParams] = useSearchParams();
    return [
        useMemo(
            () =>
                params.reduce((pre, cur) => {
                    return { ...pre, [cur]: searchParams.get(cur) || "" };
                }, {} as { [key in T]: string }),
            [searchParams]
        ),
        (params: Partial<{ [key in T]: unknown }>) => {
            const o = filterNullValues({
                ...Object.fromEntries(searchParams),
                ...params,
            });
            return setSearchParams(o);
        },
    ] as const;
};
