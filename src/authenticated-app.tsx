import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";

export const AuthentocatedApp = () => {
    const { logout } = useAuth();
    return (
        <div>
            <button onClick={logout}>退出登录</button>
            <ProjectListScreen />
        </div>
    );
};
