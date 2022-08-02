/** @jsxImportSource @emotion/react */
import { Form, Input } from "antd";
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

export const SearchPanel = ({ params, setParams }: SearchPanelProps) => {
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
            </Form.Item>
        </Form>
    );
};
