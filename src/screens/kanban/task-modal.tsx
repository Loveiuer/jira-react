import { Button, Form, Input, Modal } from "antd";
import { TaskTypeSelect } from "components/task-type-select";
import { UserSelect } from "components/user-select";
import { useEffect } from "react";
import { useTasksModal, useTasksQueryKey } from "screens/kanban/util";
import { useDeleteTask, useEditTask } from "utils/task";

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

export const TaskModal = () => {
    const [form] = Form.useForm();
    const { editingTaskId, editingTask, close } = useTasksModal();
    const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
        useTasksQueryKey()
    );
    const { mutate: deleteTask } = useDeleteTask(useTasksQueryKey());

    const onCancel = () => {
        close();
        form.resetFields();
    };

    const onOk = async () => {
        await editTask({ ...editingTask, ...form.getFieldsValue() });
        close();
    };

    const startDelete = () => {
        close();
        Modal.confirm({
            okText: "确定",
            cancelText: "取消",
            title: "确定删除任务吗？",
            onOk() {
                return deleteTask(Number(editingTaskId));
            },
        });
    };

    useEffect(() => {
        form.setFieldsValue(editingTask);
    }, [form, editingTask]);

    return (
        <Modal
            forceRender={true}
            okText="确认"
            cancelText="取消"
            confirmLoading={editLoading}
            title="编辑任务"
            visible={!!editingTaskId}
            onCancel={onCancel}
            onOk={onOk}
        >
            <Form initialValues={editingTask} form={form} {...layout}>
                <Form.Item
                    label="任务名"
                    name={"name"}
                    rules={[{ required: true, message: "请输入任务名" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="经办人" name={"processorId"}>
                    <UserSelect defaultOptionName="经办人" />
                </Form.Item>
                <Form.Item label="类型" name={"typeId"}>
                    <TaskTypeSelect />
                </Form.Item>
            </Form>
            <div style={{ textAlign: "right" }}>
                <Button
                    size="small"
                    style={{ fontSize: "14px" }}
                    onClick={startDelete}
                >
                    删除
                </Button>
            </div>
        </Modal>
    );
};
