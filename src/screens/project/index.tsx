import styled from "@emotion/styled";
import { Menu } from "antd";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { EpicScreen } from "screens/epic";
import { KanbanScreen } from "screens/kanban";

const useRouteType = () => {
    const units = useLocation().pathname.split("/");
    return units[units.length - 1];
};
export const ProjectScreen = () => {
    const routeType = useRouteType();
    const items = [
        { label: <Link to="kanban">看板</Link>, key: "kanban" },
        { label: <Link to="epic">任务组</Link>, key: "epic" },
    ];
    return (
        <Container>
            <Aside>
                <Menu mode="inline" selectedKeys={[routeType]} items={items} />
            </Aside>
            <Main>
                <Routes>
                    <Route path={"kanban"} element={<KanbanScreen />}></Route>
                    <Route path={"epic"} element={<EpicScreen />}></Route>
                    <Route
                        path={""}
                        element={<Navigate to="kanban" replace={true} />}
                    ></Route>
                </Routes>
            </Main>
        </Container>
    );
};

const Aside = styled.aside`
    background-color: rgb(244, 245, 247);
    display: flex;
`;

const Main = styled.div`
    display: flex;
    box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: 16rem 1fr;
    width: 100%;
`;
