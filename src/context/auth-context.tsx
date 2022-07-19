import React, { ReactNode, useContext, useState } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-panel";
import { request } from "utils/http";
import { useMount } from "utils";

const AuthContext = React.createContext<
    | {
          user: User | null;
          login: (form: AuthForm) => Promise<void>;
          register: (form: AuthForm) => Promise<void>;
          logout: () => Promise<void>;
      }
    | undefined
>(undefined);

interface AuthForm {
    username: string;
    password: string;
}

// 初始化user状态
const initUser = async () => {
    let user = null;
    const token = auth.getToken();
    if (token) {
        const data = await request("/me", { token });
        user = data.user;
    }
    return user;
};

AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (form: AuthForm) => auth.login(form).then(setUser);
    const register = (form: AuthForm) => auth.register(form).then(setUser);
    const logout = () => auth.logout().then(() => setUser(null));

    useMount(() => {
        initUser().then(setUser);
    });

    return (
        <AuthContext.Provider
            value={{ user, login, register, logout }}
            children={children}
        />
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth必须在AuthProvider中使用");
    }
    return context;
};
