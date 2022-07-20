import { AuthentocatedApp } from "authenticated-app";
import { useAuth } from "context/auth-context";
import { UnauthenticatedApp } from "unauthenticated-app";

function App() {
    const { user } = useAuth();
    return (
        <div className="App">
            {user ? <AuthentocatedApp /> : <UnauthenticatedApp />}
        </div>
    );
}

export default App;
