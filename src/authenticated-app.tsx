import styled from "@emotion/styled";
import { Row } from "components/lib";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";

export const AuthentocatedApp = () => {
    const { logout, user } = useAuth();

    return (
        <Container>
            <Header between={true}>
                <HeadLeft gap={true}>
                    <SoftwareLogo
                        width={"18rem"}
                        color={"#2fc1e0"}
                    ></SoftwareLogo>
                    <h2>项目</h2>
                    <h2>用户</h2>
                </HeadLeft>
                <HeadRight>
                    <Dropdown
                        overlay={
                            <Menu
                                items={[
                                    {
                                        label: (
                                            <Button
                                                type={"link"}
                                                onClick={logout}
                                            >
                                                退出登录
                                            </Button>
                                        ),
                                        key: "logout",
                                    },
                                ]}
                            />
                        }
                    >
                        <Button
                            type={"link"}
                            onClick={(e) => e.preventDefault()}
                        >
                            Hi,{user?.name}
                        </Button>
                    </Dropdown>
                </HeadRight>
            </Header>
            <Main>
                <ProjectListScreen />
            </Main>
        </Container>
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
