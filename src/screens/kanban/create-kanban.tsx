import { useState } from "react";
import { useKanbanQueryKey, useProjectIdInUrl } from "screens/kanban/util";
import { useAddKanban } from "utils/kanban";
import { Input } from "antd";
import { Container } from "screens/kanban/kanban-cloumn";

export const CreateKanban = () => {
    const [name, setName] = useState("");
    const projectId = useProjectIdInUrl();
    const { mutateAsync: addKanban } = useAddKanban(useKanbanQueryKey());

    const submit = async () => {
        await addKanban({ name, projectId });
        setName("");
    };

    return (
        <Container>
            <Input
                size="large"
                placeholder="新建看板"
                onPressEnter={submit}
                value={name}
                onChange={(evt) => setName(evt.target.value)}
            />
        </Container>
    );
};
