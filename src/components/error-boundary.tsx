import { Component } from "react";

interface FallbackRender {
    (props: { error: Error }): React.ReactElement;
}

export class ErrorBoundary extends Component<
    React.PropsWithChildren<{ fallbackRender: FallbackRender }>
> {
    state = { error: null };

    // 当子组件抛出异常，这里会接收到并且调用
    static getDerivedStateFromError(error: Error) {
        return { error };
    }

    render() {
        const { error } = this.state;
        const { fallbackRender, children } = this.props;
        if (error) {
            return fallbackRender({ error });
        }
        return children;
    }
}
