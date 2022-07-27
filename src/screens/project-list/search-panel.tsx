/** @jsxImportSource @emotion/react */
import { Form, Input, Select } from "antd";
import { UserSelect } from "components/user-select";
import { Project } from "screens/project-list/list";

export interface User {
    id: number;
    name: string;
    email: string;
    title: string;
    organization: string;
    token: string;
}

interface SearchPanelProps {
    params: Partial<Pick<Project, "name" | "personId">>;
    users: User[];
    setParams: (params: SearchPanelProps["params"]) => void;
}

export const SearchPanel = ({ params, users, setParams }: SearchPanelProps) => {
    return (
        <Form css={{ marginBottom: "2rem" }} layout={"inline"}>
            <Form.Item>
                <Input
                    type="text"
                    placeholder="项目名"
                    value={params.name}
                    onChange={(evt) =>
                        setParams({
                            ...params,
                            name: evt.target.value,
                        })
                    }
                />
            </Form.Item>
            <Form.Item>
                <UserSelect
                    value={params.personId}
                    defaultOptionName={"负责人"}
                    onChange={(value) =>
                        setParams({
                            ...params,
                            personId: value,
                        })
                    }
                />
                {/* <Select
                    value={params.personId}
                    onChange={(value) =>
                        setParams({
                            ...params,
                            personId: value,
                        })
                    }
                    defaultValue={undefined}
                >
                    <Select.Option value={""}>负责人</Select.Option>
                    {users.map((user) => (
                        <Select.Option value={String(user.id)} key={user.id}>
                            {user.name}
                        </Select.Option>
                    ))}
                </Select> */}
            </Form.Item>
        </Form>
    );
};
