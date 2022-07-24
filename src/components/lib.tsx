import styled from "@emotion/styled";
import { Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";

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

export const FullPageErrorFallback = ({ error }: { error: Error }) => {
    return (
        <FullPage>
            <DevTools />
            <Typography.Text type={"danger"}>{error.message}</Typography.Text>
        </FullPage>
    );
};
