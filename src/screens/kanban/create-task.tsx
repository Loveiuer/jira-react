import { Card } from "antd";
import Input from "rc-input";
import { useEffect, useState } from "react";
import { useProjectIdInUrl, useTasksQueryKey } from "screens/kanban/util";
import { useAddTask } from "utils/task";

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
    const [name, setName] = useState("");
    const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());
    const projectId = useProjectIdInUrl();
    const [inputMode, setInputMode] = useState(false);

    const submit = async () => {
        await addTask({ projectId, name, kanbanId });
        setInputMode(false);
        setName("");
    };

    const toggle = () => setInputMode((mode) => !mode);
    useEffect(() => {
        if (!inputMode) {
            setName("");
        }
    }, [inputMode]);

    if (!inputMode) {
        return <div onClick={toggle}>+创建事务</div>;
    }

    return (
        <Card>
            <Input
                onBlur={toggle}
                placeholder="需要做点什么"
                autoFocus={true}
                onPressEnter={submit}
                value={name}
                onChange={(evt) => setName(evt.target.value)}
            />
        </Card>
    );
};
