import { useAuth } from "context/auth-context";
import { FormEvent } from "react";

export const LoginScreen = () => {
    const { login } = useAuth();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // HTMLFormElement.elements返回一个 HTMLFormControlsCollection (en-US) (HTMLCollection) 其中包含 FORM 的所有控件
        const username = (event.currentTarget.elements[0] as HTMLInputElement)
            .value;
        const password = (event.currentTarget.elements[1] as HTMLInputElement)
            .value;
        login({ username, password });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">用户名：</label>
                <input type="text" id="username" />
            </div>
            <div>
                <label htmlFor="password">密码：</label>
                <input type="password" id="password" />
            </div>
            <button>登录</button>
        </form>
    );
};
