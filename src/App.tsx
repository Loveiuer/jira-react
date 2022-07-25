import { AuthentocatedApp } from "authenticated-app";
import { useAuth } from "context/auth-context";
import { UnauthenticatedApp } from "unauthenticated-app";
import "App.css";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallback } from "components/lib";
import { BrowserRouter } from "react-router-dom";

function App() {
    const { user } = useAuth();
    return (
        <div className="App">
            <ErrorBoundary fallbackRender={FullPageErrorFallback}>
                <BrowserRouter>
                    {user ? <AuthentocatedApp /> : <UnauthenticatedApp />}
                </BrowserRouter>
            </ErrorBoundary>
        </div>
    );
}

export default App;
