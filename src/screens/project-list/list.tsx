import { Table } from "antd";
import { User } from "screens/project-list/search-panel";

export interface Project {
    id: number;
    name: string;
    personId: string;
    pin: boolean;
    organization: string;
    created: number;
}

interface ListProps {
    list: Project[];
    users: User[];
}

export const List: React.FC<ListProps> = ({ list, users }) => {
    return (
        <Table
            pagination={false}
            columns={[
                {
                    title: "名称",
                    dataIndex: "name",
                    sorter: (a, b) => a.name.localeCompare(b.name),
                },
                {
                    title: "负责人",
                    render(value, project) {
                        return (
                            <span>
                                {users.find(
                                    (user) => user.id === project.personId
                                )?.name || "未知"}
                            </span>
                        );
                    },
                },
            ]}
            dataSource={list}
        ></Table>
    );
};
