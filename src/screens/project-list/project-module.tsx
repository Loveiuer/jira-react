import { Button, Drawer } from "antd";

interface ProjectModuleProps {
    projectModuleOpen: boolean;
    onClose: () => void;
}

// Drawer抽屉
export const ProjectModule = (props: ProjectModuleProps) => {
    return (
        <Drawer
            visible={props.projectModuleOpen}
            width={"100%"}
            onClose={props.onClose}
        >
            <h1>Project Module</h1>
            <Button onClick={props.onClose}>关闭</Button>
        </Drawer>
    );
};
