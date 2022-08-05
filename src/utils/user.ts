import { User } from "types/project";
import { useMount } from "utils";
import { useRequest } from "utils/http";
import { useAsync } from "./use-async";

export const useUser = () => {
    const fetchRequest = useRequest();
    const { run, ...result } = useAsync<User[]>();

    useMount(() => {
        run(fetchRequest<User[]>("/users"));
    });

    return result;
};
