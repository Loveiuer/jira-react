import { useMemo } from "react";
import { useProject } from "utils/project";
import { useSetURLSearchParams, useURLSearchParams } from "utils/url";

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

export const useProjectsQueryKey = () => {
    const [params] = useProjectsSearchParams();
    return ["projects", params];
};

export const useProjectModal = () => {
    const [{ projectCreate }] = useURLSearchParams(["projectCreate"]);
    const [{ editingProjectId }, setEditingProjectId] = useURLSearchParams([
        "editingProjectId",
    ]);
    const setURLParams = useSetURLSearchParams();
    const { data: editingProject, isLoading } = useProject(
        Number(editingProjectId)
    );

    const open = () => setURLParams({ projectCreate: true });
    const close = () => {
        projectCreate && setURLParams({ projectCreate: undefined });
        editingProjectId && setURLParams({ editingProjectId: undefined });
    };
    const startEdit = (id: number) =>
        setEditingProjectId({ editingProjectId: id });
    return {
        projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
        open,
        close,
        startEdit,
        editingProject,
        isLoading,
    };
};
