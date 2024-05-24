import Login from "./Login";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
function App() {
    return (
        <GoogleOAuthProvider clientId={clientId}>
            <Login />
        </GoogleOAuthProvider>
    );
}

export default App;
