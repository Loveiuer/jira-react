import styled from "@emotion/styled";
import { useState } from "react";

import { List } from "screens/project-list/list";
import { SearchPanel } from "screens/project-list/search-panel";
import { useDebounce, useDocumentTitle } from "utils";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUser } from "utils/user";

export const ProjectListScreen = () => {
    const [params, setParams] = useState<{
        name: string;
        personId: number | undefined;
    }>({
        name: "",
        personId: undefined,
    });

    const debouncedParams = useDebounce(params, 200);
    const { isLoading, error, data: list } = useProjects(debouncedParams);

    const { data: users } = useUser();

    useDocumentTitle("项目列表", false);
    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel
                params={params}
                users={users || []}
                setParams={setParams}
            />
            {error ? (
                <Typography.Text type={"danger"}>
                    {error.message}
                </Typography.Text>
            ) : null}
            <List
                dataSource={list || []}
                users={users || []}
                loading={isLoading}
            />
        </Container>
    );
};

const Container = styled.div`
    padding: 3.2rem;
`;
