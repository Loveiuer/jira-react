import { Table, TableProps } from "antd";
import { User } from "screens/project-list/search-panel";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export interface Project {
    id: string;
    name: string;
    personId: string;
    pin: boolean;
    organization: string;
    created: number;
}

interface ListProps extends TableProps<Project> {
    users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
    return (
        <Table
            pagination={false}
            rowKey={(record) => record.id}
            columns={[
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
            ]}
            {...props}
        ></Table>
    );
};
