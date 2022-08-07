import { useQuery } from "react-query";
import { User } from "types/project";
import { useRequest } from "utils/http";

export const useUser = () => {
    const fetchRequest = useRequest();

    return useQuery<User[]>(["users"], () => fetchRequest("/users"));
};
