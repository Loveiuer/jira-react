import styled from "@emotion/styled";
import { Button, Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";
import { isError } from "utils/index";

export const Row = styled.div<{
    gap?: number | undefined | boolean;
    between?: boolean;
    marginBottom?: number;
}>`
    display: flex;
    align-items: center;
    justify-content: ${(props) =>
        props.between ? "space-between" : undefined};
    margin-bottom: ${(props) =>
        typeof props.marginBottom === "number"
            ? props.marginBottom + "rem"
            : props.marginBottom
            ? "2rem"
            : undefined};
    > * {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        margin-right: ${(props) =>
            typeof props.gap === "number"
                ? props.gap + "rem"
                : props.gap
                ? "2rem"
                : undefined};
    }
`;

const FullPage = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
// loading组件
export const FullPageLoading = () => {
    return (
        <FullPage>
            <Spin size={"large"}></Spin>
        </FullPage>
    );
};

// 错误处理组件
export const FullPageErrorFallback = ({ error }: { error: Error | null }) => {
    return (
        <FullPage>
            <DevTools />
            <ErrorBox error={error} />
        </FullPage>
    );
};

// 没有padding的组件
export const ButtonNoPadding = styled(Button)`
    padding: 0;
`;

// 类型为Error是才显示
export const ErrorBox = ({ error }: { error: unknown }) => {
    if (isError(error)) {
        return (
            <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
        );
    }
    return null;
};

export const ScreenContainer = styled.div`
    padding: 3.2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
`;
