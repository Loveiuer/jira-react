import { User } from "./search-panel";

interface Project {
    id: number;
    name: string;
    personId: number;
    created: number;
    organization: string;
}

interface ListProps {
    list: Project[];
    users: User[];
}

export const List: React.FC<ListProps> = ({ list, users }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>名称</th>
                    <th>负责人</th>
                </tr>
            </thead>
            <tbody>
                {list.map((item) => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>
                            {users.find((user) => user.id === item.personId)
                                ?.name || "未知"}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
