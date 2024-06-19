import "./index.scss";
import { RootRouter } from "./routes/root";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <UserProvider>
      <RootRouter />
    </UserProvider>
  );
}

export default App;
