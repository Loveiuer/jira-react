import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "components/lib";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import { Navigate, Route, Routes } from "react-router-dom";
import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";
import { ProjectModule } from "screens/project-list/project-module";
import { ProjectPopover } from "components/project-popover";

export const AuthentocatedApp = () => {
    return (
        <Container>
            <PageHeader />
            <Main>
                <Routes>
                    <Route
                        path="/projects"
                        element={<ProjectListScreen />}
                    ></Route>
                    <Route
                        path="/projects/:projectId/*"
                        element={<ProjectScreen />}
                    ></Route>
                    <Route
                        path="/"
                        element={<Navigate to="/projects" />}
                    ></Route>
                </Routes>
            </Main>
            <ProjectModule />
        </Container>
    );
};

const PageHeader = () => {
    return (
        <Header between={true}>
            <HeadLeft gap={true}>
                <ButtonNoPadding
                    style={{ padding: 0 }}
                    type={"link"}
                    onClick={resetRoute}
                >
                    <SoftwareLogo width={"18rem"} color={"#2fc1e0"} />
                </ButtonNoPadding>
                <ProjectPopover />
                <span>用户</span>
            </HeadLeft>
            <HeadRight>
                <User />
            </HeadRight>
        </Header>
    );
};

const User = () => {
    const { logout, user } = useAuth();
    return (
        <Dropdown
            overlay={
                <Menu
                    items={[
                        {
                            label: (
                                <Button type={"link"} onClick={logout}>
                                    退出登录
                                </Button>
                            ),
                            key: "logout",
                        },
                    ]}
                />
            }
        >
            <Button type={"link"} onClick={(e) => e.preventDefault()}>
                Hi,{user?.name}
            </Button>
        </Dropdown>
    );
};

const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr 6rem;
    height: 100vh;
`;

// grid-area 用来给grid子元素取名字
const Header = styled(Row)`
    padding: 3.2rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    z-index: 1;
`;
const HeadLeft = styled(Row)``;
const HeadRight = styled.div``;

const Main = styled.main``;
