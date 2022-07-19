import { useEffect, useState } from "react";

import { List } from "screens/project-list/list";
import { SearchPanel } from "screens/project-list/search-panel";
import { filterNullValues, useDebounce, useMount } from "utils";
import { useRequest } from "utils/http";

export const ProjectListScreen = () => {
    const [params, setParams] = useState({
        name: "",
        personId: "",
    });
    const debouncedParams = useDebounce(params, 200);
    const [users, setUsers] = useState([]);
    const [list, setList] = useState([]);
    const fetchRequest = useRequest();
    useMount(() => {
        fetchRequest("/users").then(setUsers);
    });
    useEffect(() => {
        fetchRequest("/projects", {
            params: filterNullValues(debouncedParams),
        }).then(setList);
    }, [debouncedParams]);
    return (
        <div>
            <SearchPanel params={params} users={users} setParams={setParams} />
            <List list={list} users={users} />
        </div>
    );
};
