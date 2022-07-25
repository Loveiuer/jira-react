import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

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
        setSearchParams,
    ] as const;
};
