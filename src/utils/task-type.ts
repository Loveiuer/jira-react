import { useQuery } from "react-query";
import { TaskType } from "types/task-type";
import { useRequest } from "utils/http";

export const useTaskTypes = () => {
    const fetchRequest = useRequest();

    return useQuery<TaskType[]>(["taskTypes"], () =>
        fetchRequest("/taskTypes")
    );
};
