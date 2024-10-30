import Home from "./Components/Home";
import Login from "./Components/Login";
import { AuthProvider } from "./Context/authContext";
import { useSession } from "./Hooks/useSession";

function AppContent() {
  const { session } = useSession();
  return session ? <Home /> : <Login />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
