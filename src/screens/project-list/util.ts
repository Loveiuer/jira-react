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

export const useProjectModal = () => {
    const [{ projectCreate }, setProjectModalOpen] = useURLSearchParams([
        "projectCreate",
    ]);
    const open = () => setProjectModalOpen({ projectCreate: true });
    const close = () => setProjectModalOpen({ projectCreate: undefined });

    return {
        projectModalOpen: projectCreate === "true",
        open,
        close,
    };
};
