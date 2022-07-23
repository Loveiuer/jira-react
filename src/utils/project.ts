import { useEffect } from "react";
import { Project } from "screens/project-list/list";
import { filterNullValues } from "utils";
import { useAsync } from "utils/use-async";
import { useRequest } from "utils/http";

export const useProjects = (params: Partial<Project>) => {
    const fetchRequest = useRequest();
    const { run, ...result } = useAsync<Project[]>();
    useEffect(() => {
        run(
            fetchRequest<Project[]>("/projects", {
                params: filterNullValues(params),
            })
        );
    }, [params]);

    return result;
};
