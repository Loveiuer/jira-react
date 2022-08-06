import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { filterNullValues } from "utils";
import { useRequest } from "utils/http";
import { useAddConfig, useDeleteConfig } from "utils/use-optimistic-options";

export const useKanbans = (params?: Partial<Kanban>) => {
    const fetchRequest = useRequest();

    return useQuery<Kanban[]>(["kanbans", params], () =>
        fetchRequest("/kanbans", { params: filterNullValues(params) })
    );
};

export const useAddKanban = (queryKey: QueryKey) => {
    const fetchRequest = useRequest();

    return useMutation(
        (params: Partial<Kanban>) =>
            fetchRequest(`/kanbans`, {
                data: params,
                method: "POST",
            }),
        useAddConfig(queryKey)
    );
};

export const useDeleteKanban = (queryKey: QueryKey) => {
    const fetchRequest = useRequest();
    return useMutation(
        (id: number) =>
            fetchRequest(`/kanbans/${id}`, {
                method: "DELETE",
            }),
        useDeleteConfig(queryKey)
    );
};
