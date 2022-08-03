import { useMemo } from "react";
import { useProject } from "utils/project";
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

export const useProjectsQueryKey = () => {
    const [params] = useProjectsSearchParams();
    return ["projects", params];
};

export const useProjectModal = () => {
    const [{ projectCreate }, setProjectModalOpen] = useURLSearchParams([
        "projectCreate",
    ]);
    const [{ editingProjectId }, setEditingProjectId] = useURLSearchParams([
        "editingProjectId",
    ]);
    const { data: editingProject, isLoading } = useProject(
        Number(editingProjectId)
    );

    const open = () => setProjectModalOpen({ projectCreate: true });
    const close = () => {
        projectCreate && setProjectModalOpen({ projectCreate: undefined });
        editingProjectId &&
            setEditingProjectId({ editingProjectId: undefined });
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
