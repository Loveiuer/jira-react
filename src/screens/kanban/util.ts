import { useMemo } from "react";
import { useLocation } from "react-router";
import { useProject } from "utils/project";
import { useURLSearchParams } from "utils/url";

export const useProjectIdInUrl = () => {
    const { pathname } = useLocation();
    const id = pathname.match(/projects\/(\d+)/)?.[1];
    return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useKanbanQueryKey = () => ["kanbans", useKanbanSearchParams()];

export const useTasksSearchParams = () => {
    const [params, setParam] = useURLSearchParams([
        "name",
        "typeId",
        "processorId",
        "tagId",
    ]);
    const projectId = useProjectIdInUrl();
    return useMemo(
        () => ({
            projectId,
            typeId: Number(params.typeId) || undefined,
            processorId: Number(params.processorId) || undefined,
            tagId: Number(params.tagId) || undefined,
            name: params.name,
        }),
        [projectId, params]
    );
};

export const useTasksQueryKey = () => ["kanbans", useTasksSearchParams()];
