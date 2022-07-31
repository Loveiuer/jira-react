import styled from "@emotion/styled";

import { List } from "screens/project-list/list";
import { SearchPanel } from "screens/project-list/search-panel";
import { useDebounce, useDocumentTitle } from "utils";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUser } from "utils/user";
import {
    useProjectModal,
    useProjectsSearchParams,
} from "screens/project-list/util";
import { ButtonNoPadding, Row } from "components/lib";

export const ProjectListScreen = () => {
    const [params, setParams] = useProjectsSearchParams();
    const debouncedParams = useDebounce(params, 200);
    const {
        isLoading,
        error,
        data: list,
        retry,
    } = useProjects(debouncedParams);

    const { data: users } = useUser();
    const { open } = useProjectModal();

    useDocumentTitle("项目列表", false);
    return (
        <Container>
            <Row between={true}>
                <h1>项目列表</h1>
                <ButtonNoPadding type={"link"} onClick={open}>
                    创建项目
                </ButtonNoPadding>
            </Row>

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
                refresh={retry}
            />
        </Container>
    );
};

const Container = styled.div`
    padding: 3.2rem;
`;
