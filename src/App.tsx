import { RouterProvider } from "react-router-dom";
import "./App.scss";
import { Layout } from "./components/Layout";
import { router } from "./routes/root";

function App() {
  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  );
}

export default App;
