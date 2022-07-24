import { AuthentocatedApp } from "authenticated-app";
import { useAuth } from "context/auth-context";
import { UnauthenticatedApp } from "unauthenticated-app";
import "App.css";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallback } from "components/lib";

function App() {
    const { user } = useAuth();
    return (
        <div className="App">
            <ErrorBoundary fallbackRender={FullPageErrorFallback}>
                {user ? <AuthentocatedApp /> : <UnauthenticatedApp />}
            </ErrorBoundary>
        </div>
    );
}

export default App;
