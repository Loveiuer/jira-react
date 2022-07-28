import { useEffect } from "react";
import { Project } from "screens/project-list/list";
import { filterNullValues } from "utils";
import { useAsync } from "utils/use-async";
import { useRequest } from "utils/http";

export const useProjects = (params: Partial<Project>) => {
    const fetchRequest = useRequest();
    const { run, ...result } = useAsync<Project[]>();
    const fetchProject = () =>
        fetchRequest<Project[]>("/projects", {
            params: filterNullValues(params),
        });
    useEffect(() => {
        run(fetchProject(), { retry: fetchProject });
    }, [params]);

    return result;
};

export const useEditProject = () => {
    const fetchRequest = useRequest();
    const { run, ...asyncResult } = useAsync();
    const mutate = (params: Partial<Project>) => {
        return run(
            fetchRequest(`/projects/${params.id}`, {
                data: params,
                method: "PATCH",
            })
        );
    };
    return { mutate, ...asyncResult };
};

export const useAddProject = () => {
    const fetchRequest = useRequest();
    const { run, ...asyncResult } = useAsync();
    const mutate = (params: Partial<Project>) => {
        return run(
            fetchRequest(`/projects/${params.id}`, {
                data: params,
                method: "POST",
            })
        );
    };
    return { mutate, ...asyncResult };
};
