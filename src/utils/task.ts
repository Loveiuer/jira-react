import { useQuery } from "react-query";
import { Task } from "types/task";
import { filterNullValues } from "utils";
import { useRequest } from "utils/http";

export const useTasks = (params?: Partial<Task>) => {
    const fetchRequest = useRequest();

    return useQuery<Task[]>(["tasks", params], () =>
        fetchRequest("/tasks", { params: filterNullValues(params) })
    );
};
