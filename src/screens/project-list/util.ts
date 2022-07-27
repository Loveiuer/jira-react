import { useMemo } from "react";
import { useURLSearchParams } from "utils/url";

export const useProjectsSearchParams = () => {
    const [params, setParams] = useURLSearchParams(["name", "personId"]);
    return [
        useMemo(
            () => ({
                ...params,
                personId: Number(params.personId) || undefined,
            }),
            [params]
        ),
        setParams,
    ] as const;
};
