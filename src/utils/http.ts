import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

interface RequestConfig extends RequestInit {
    params?: Record<string, string>;
    token?: string;
    data?: object;
}

const methodsNoData = ["DELETE", "GET", "HEAD", "OPTIONS"];

const methodsWithData = ["POST", "PUT", "PATCH"];

export const request = async <T = any>(
    path: string,
    { params, data, token, headers, ...customConfig }: RequestConfig = {}
) => {
    const config: RequestInit = {
        method: "GET",
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        },
        ...customConfig,
    };
    if (data)
        (config.headers as Record<string, string>)["Content-Type"] =
            "application/json";
    if (methodsNoData.includes(config.method!.toUpperCase())) {
        let searchParams = new URLSearchParams(params);
        path = path + "?" + searchParams.toString();
    }
    if (methodsWithData.includes(config.method!.toUpperCase())) {
        config.body = JSON.stringify(data || {});
    }
    try {
        const response = await window.fetch(`${apiUrl}${path}`, config);
        if (response.status === 401) {
            await auth.logout();
            window.location.reload();
            return Promise.reject({ message: "请重新登录" });
        }
        const responseData = await response.json();
        if (response.ok) {
            console.log(responseData);

            return responseData as T;
        } else {
            return Promise.reject(responseData);
        }
    } catch (err) {
        return Promise.reject({ message: "请求出错", error: err });
    }
};

export const useRequest = () => {
    const { user } = useAuth();
    return <T = any>(path: string, config?: RequestConfig) =>
        request<T>(path, { ...config, token: user?.token });
};
