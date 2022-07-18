import { FormEvent } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
    const login = (params: { username: string; password: string }) => {
        fetch(`${apiUrl}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(params),
        }).then(async (response) => {
            if (response.ok) {
            }
        });
    };

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
            <button>注册</button>
        </form>
    );
};
