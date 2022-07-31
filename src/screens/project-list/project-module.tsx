import { Button, Drawer } from "antd";
import { useProjectModal } from "./util";

// Drawer抽屉
export const ProjectModule = () => {
    const { projectModalOpen, close } = useProjectModal();
    return (
        <Drawer visible={projectModalOpen} width={"100%"} onClose={close}>
            <h1>Project Module</h1>
            <Button onClick={close}>关闭</Button>
        </Drawer>
    );
};
