import { RouterProvider } from "react-router-dom";
import "./index.scss";
import { Layout } from "./components/Layout";
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
