import { useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { filterNullValues } from "utils";
import { useRequest } from "utils/http";

export const useKanbans = (params?: Partial<Kanban>) => {
    const fetchRequest = useRequest();

    return useQuery<Kanban[]>(["kanbans", params], () =>
        fetchRequest("/kanbans", { params: filterNullValues(params) })
    );
};
