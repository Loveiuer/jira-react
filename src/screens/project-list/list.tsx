import { Dropdown, Menu, Modal, Table, TableProps } from "antd";
import { User } from "screens/project-list/search-panel";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useDeleteProject, useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/lib";
import {
    useProjectModal,
    useProjectsQueryKey,
} from "screens/project-list/util";

export interface Project {
    id: number;
    name: string;
    personId: number;
    pin: boolean;
    organization: string;
    created: number;
}

interface ListProps extends TableProps<Project> {
    users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
    const { mutate } = useEditProject(useProjectsQueryKey());
    return (
        <Table
            pagination={false}
            rowKey={(record) => record.id || -1}
            columns={[
                {
                    title: <Pin checked={true} disabled={true} />,
                    render(_, project) {
                        return (
                            <Pin
                                checked={project.pin}
                                onCheckedChange={(pin) => {
                                    mutate({ id: project.id, pin });
                                }}
                            />
                        );
                    },
                },
                {
                    title: "名称",
                    sorter: (a, b) => a.name.localeCompare(b.name),
                    render(_, project) {
                        return <Link to={`${project.id}`}>{project.name}</Link>;
                    },
                },
                {
                    title: "部门",
                    dataIndex: "organization",
                },
                {
                    title: "负责人",
                    render(_, project) {
                        return (
                            <span>
                                {users.find(
                                    (user) => user.id === project.personId
                                )?.name || "未知"}
                            </span>
                        );
                    },
                },
                {
                    title: "创建时间",
                    render(_, project) {
                        return (
                            <span>
                                {project.created
                                    ? dayjs(project.created).format(
                                          "YYYY-MM-DD"
                                      )
                                    : "无"}
                            </span>
                        );
                    },
                },
                {
                    render(_, project) {
                        return <More project={project} />;
                    },
                },
            ]}
            {...props}
        ></Table>
    );
};

const More = ({ project }: { project: Project }) => {
    const { startEdit } = useProjectModal();
    const editProject = (id: number) => () => startEdit(id);
    const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey());
    const confirmDeleteProject = (id: number) => {
        Modal.confirm({
            title: "确定删除这个项目吗？",
            content: "点击确认删除",
            okText: "确定",
            onOk() {
                deleteProject(id);
            },
        });
    };
    return (
        <Dropdown
            overlay={
                <Menu
                    items={[
                        {
                            label: (
                                <ButtonNoPadding
                                    type={"link"}
                                    onClick={editProject(project.id)}
                                >
                                    编辑
                                </ButtonNoPadding>
                            ),
                            key: "edit",
                        },
                        {
                            label: (
                                <ButtonNoPadding
                                    type={"link"}
                                    onClick={() =>
                                        confirmDeleteProject(project.id)
                                    }
                                >
                                    删除
                                </ButtonNoPadding>
                            ),
                            key: "delete",
                        },
                    ]}
                />
            }
        >
            <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
        </Dropdown>
    );
};
