import { useCallback, useMemo } from "react";
import { useLocation } from "react-router";
import { useProject } from "utils/project";
import { useTask } from "utils/task";
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
    const [params] = useURLSearchParams([
        "name",
        "typeId",
        "processorId",
        "tagId",
    ]);
    const projectId = useProjectIdInUrl();
    // const debouncedName = useDebounce(params.name, 200)
    return useMemo(
        () => ({
            projectId,
            typeId: Number(params.typeId) || undefined,
            processorId: Number(params.processorId) || undefined,
            tagId: Number(params.tagId) || undefined,
            name: params.name,
            // name: debouncedName
        }),
        [projectId, params]
    );
};

export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];

export const useTasksModal = () => {
    const [{ editingTaskId }, setEditingTasId] = useURLSearchParams([
        "editingTaskId",
    ]);
    const { data: editingTask, isLoading } = useTask(Number(editingTaskId));
    const startEdit = useCallback(
        (id: number) => {
            setEditingTasId({ editingTaskId: id });
        },
        [setEditingTasId]
    );
    const close = useCallback(() => {
        setEditingTasId({ editingTaskId: "" });
    }, [setEditingTasId]);
    return {
        editingTaskId,
        editingTask,
        startEdit,
        close,
        isLoading,
    };
};
