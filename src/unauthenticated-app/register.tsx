import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";

export const RegisterScreen = ({
    setError,
}: {
    setError: (err: Error | null) => void;
}) => {
    const { register } = useAuth();
    const { run, isLoading } = useAsync(undefined, { throwError: true });

    const handleSubmit = async ({
        cpassword,
        ...values
    }: {
        username: string;
        password: string;
        cpassword: string;
    }) => {
        if (values.password !== cpassword) {
            setError(new Error("两次输入密码不一致"));
        } else {
            try {
                await run(register(values));
            } catch (e) {
                setError(e as Error);
            }
        }
    };

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item
                name={"username"}
                rules={[{ required: true, message: "请输入用户名" }]}
            >
                <Input placeholder={"用户名"} type="text" id="username" />
            </Form.Item>
            <Form.Item
                name={"password"}
                rules={[{ required: true, message: "请输入密码" }]}
            >
                <Input placeholder={"密码"} type="password" id="password" />
            </Form.Item>
            <Form.Item
                name={"cpassword"}
                rules={[{ required: true, message: "请确认密码" }]}
            >
                <Input
                    placeholder={"确认密码"}
                    type="password"
                    id="cpassword"
                />
            </Form.Item>
            <Form.Item>
                <LongButton
                    loading={isLoading}
                    htmlType={"submit"}
                    type={"primary"}
                >
                    注册
                </LongButton>
            </Form.Item>
        </Form>
    );
};
