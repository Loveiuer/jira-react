import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "types/task";
import { filterNullValues } from "utils";
import { useRequest } from "utils/http";
import {
    useAddConfig,
    useDeleteConfig,
    useEditConfig,
} from "utils/use-optimistic-options";

export const useTasks = (params?: Partial<Task>) => {
    const fetchRequest = useRequest();

    return useQuery<Task[]>(["tasks", params], () =>
        fetchRequest("/tasks", { params: filterNullValues(params) })
    );
};

export const useAddTask = (queryKey: QueryKey) => {
    const fetchRequest = useRequest();

    return useMutation(
        (params: Partial<Task>) =>
            fetchRequest(`/tasks`, {
                data: params,
                method: "POST",
            }),
        useAddConfig(queryKey)
    );
};

export const useTask = (id: number) => {
    const fetchRequest = useRequest();
    return useQuery<Task>(
        ["task", { id }],
        () => fetchRequest(`/tasks/${id}`),
        // id为undefined时不要请求
        { enabled: Boolean(id) }
    );
};

export const useEditTask = (queryKey: QueryKey) => {
    const fetchRequest = useRequest();

    return useMutation(
        (params: Partial<Task>) =>
            fetchRequest(`/tasks/${params.id}`, {
                data: params,
                method: "PATCH",
            }),
        useEditConfig(queryKey)
    );
};

export const useDeleteTask = (queryKey: QueryKey) => {
    const fetchRequest = useRequest();
    return useMutation(
        (id: number) =>
            fetchRequest(`/tasks/${id}`, {
                method: "DELETE",
            }),
        useDeleteConfig(queryKey)
    );
};
