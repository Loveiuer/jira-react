import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from "antd";
import { useProjects } from "utils/project";
import { ButtonNoPadding } from "components/lib";
import { useProjectModal } from "screens/project-list/util";

// 鼠标放上去显示  不用点击
export const ProjectPopover = () => {
    const { data: project } = useProjects();
    const pinnedProjects = project?.filter((project) => project.pin);
    const { open } = useProjectModal();

    const content = (
        <ContentContainer>
            <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
            <List>
                {pinnedProjects?.map((project) => (
                    <List.Item key={project.id}>
                        <List.Item.Meta title={project.name} />
                    </List.Item>
                ))}
            </List>
            <Divider />
            <ButtonNoPadding type={"link"} onClick={open}>
                创建项目
            </ButtonNoPadding>
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
