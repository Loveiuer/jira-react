/** @jsxImportSource @emotion/react */
import { Form, Input, Select } from "antd";

export interface User {
    id: string;
    name: string;
    email: string;
    title: string;
    organization: string;
    token: string;
}

interface SearchPanelProps {
    params: {
        name: string;
        personId: string;
    };
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
                <Select
                    value={params.personId}
                    onChange={(value) =>
                        setParams({
                            ...params,
                            personId: value,
                        })
                    }
                >
                    <Select.Option value={""}>负责人</Select.Option>
                    {users.map((user) => (
                        <Select.Option value={user.id} key={user.id}>
                            {user.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </Form>
    );
};
