import { Project } from "screens/project-list/list";
import { useRequest } from "utils/http";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { filterNullValues } from "utils";

export const useProjects = (params?: Partial<Project>) => {
    const fetchRequest = useRequest();

    return useQuery<Project[]>(["projects", params], () =>
        fetchRequest("/projects", { params: filterNullValues(params) })
    );
};

export const useEditProject = () => {
    const fetchRequest = useRequest();
    const queryClient = useQueryClient();
    return useMutation(
        (params: Partial<Project>) =>
            fetchRequest(`/projects/${params.id}`, {
                data: params,
                method: "PATCH",
            }),
        {
            // 成功的时候刷新列表
            onSuccess: () => queryClient.invalidateQueries("projects"),
        }
    );
};

export const useAddProject = () => {
    const fetchRequest = useRequest();
    const queryClient = useQueryClient();
    return useMutation(
        (params: Partial<Project>) =>
            fetchRequest(`/projects`, {
                data: params,
                method: "POST",
            }),
        {
            onSuccess: () => queryClient.invalidateQueries("projects"),
        }
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
