import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "types/task";
import { filterNullValues } from "utils";
import { useRequest } from "utils/http";
import { useAddConfig } from "utils/use-optimistic-options";

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
