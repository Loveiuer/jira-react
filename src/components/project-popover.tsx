import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from "antd";
import { useProjects } from "utils/project";
import { ButtonNoPadding } from "components/lib";

// 鼠标放上去显示  不用点击
export const ProjectPopover = (props: { createProjectButton: JSX.Element }) => {
    const { data: project, isLoading } = useProjects();
    const pinnedProjects = project?.filter((project) => project.pin);

    const content = (
        <ContentContainer>
            <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
            <List>
                {pinnedProjects?.map((project) => (
                    <List.Item>
                        <List.Item.Meta title={project.name} />
                    </List.Item>
                ))}
            </List>
            <Divider />
            {props.createProjectButton}
            {/* <ButtonNoPadding
                type={"link"}
                onClick={() => props.setProjectModalOpen(true)}
            >
                创建项目
            </ButtonNoPadding> */}
        </ContentContainer>
    );
    return (
        <Popover placement={"bottom"} content={content}>
            <span>项目</span>
        </Popover>
    );
};

const ContentContainer = styled.div`
    min-width: 30rem;
`;
