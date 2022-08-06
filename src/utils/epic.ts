import { QueryKey, useMutation, useQuery } from "react-query";
import { Epic } from "types/epic";
import { filterNullValues } from "utils";
import { useRequest } from "utils/http";
import { useAddConfig, useDeleteConfig } from "utils/use-optimistic-options";

export const useEpics = (params?: Partial<Epic>) => {
    const fetchRequest = useRequest();

    return useQuery<Epic[]>(["epics", params], () =>
        fetchRequest("/epics", { params: filterNullValues(params) })
    );
};

export const useAddEpic = (queryKey: QueryKey) => {
    const fetchRequest = useRequest();

    return useMutation(
        (params: Partial<Epic>) =>
            fetchRequest(`/epics`, {
                data: params,
                method: "POST",
            }),
        useAddConfig(queryKey)
    );
};

export const useDeleteEpic = (queryKey: QueryKey) => {
    const fetchRequest = useRequest();
    return useMutation(
        (id: number) =>
            fetchRequest(`/epics/${id}`, {
                method: "DELETE",
            }),
        useDeleteConfig(queryKey)
    );
};
