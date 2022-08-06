import { Project } from "types/project";
import { useRequest } from "utils/http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { filterNullValues } from "utils";
import {
    useAddConfig,
    useDeleteConfig,
    useEditConfig,
} from "utils/use-optimistic-options";

export const useProjects = (params?: Partial<Project>) => {
    const fetchRequest = useRequest();

    return useQuery<Project[]>(["projects", params], () =>
        fetchRequest("/projects", { params: filterNullValues(params) })
    );
};

export const useEditProject = (queryKey: QueryKey) => {
    const fetchRequest = useRequest();
    // const queryKey = ['projects',useProjectsSearchParams()]
    return useMutation(
        (params: Partial<Project>) =>
            fetchRequest(`/projects/${params.id}`, {
                data: params,
                method: "PATCH",
            }),
        useEditConfig(queryKey)
    );
};

export const useAddProject = (queryKey: QueryKey) => {
    const fetchRequest = useRequest();

    return useMutation(
        (params: Partial<Project>) =>
            fetchRequest(`/projects`, {
                data: params,
                method: "POST",
            }),
        useAddConfig(queryKey)
    );
};

export const useDeleteProject = (queryKey: QueryKey) => {
    const fetchRequest = useRequest();
    return useMutation(
        (id: number) =>
            fetchRequest(`/projects/${id}`, {
                method: "DELETE",
            }),
        useDeleteConfig(queryKey)
    );
};

export const useProject = (id: number) => {
    const fetchRequest = useRequest();
    return useQuery<Project>(
        ["project", { id }],
        () => fetchRequest(`/projects/${id}`),
        // id为undefined时不要请求
        { enabled: Boolean(id) }
    );
};
