import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Layout } from "../components/Layout";
import { NotFound } from "../pages/NotFound";
import { Profile } from "../pages/Profile";
import { ProtectedRoute } from "./protected";
import { SignUp } from "../pages/SignUp";
import { UserLodges } from "../pages/UserLodges";
import { Lodges } from "../pages/Lodges";
import { LodgeForm } from "../pages/LodgeForm";
import { LodgePage } from "../pages/Lodge";
import { EditProfile } from "../pages/EditProfile";
import { LodgeFormProvider } from "../contexts/LodgeFormContext";

export const RootRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/lodges' element={<Lodges />} />
          <Route path='/lodge/:id' element={<LodgePage />} />
          <Route element={<ProtectedRoute />}>
            {/* Rotas protegidas */}
            <Route path='/profile' element={<Profile />} />
            <Route path='/profile/edit' element={<EditProfile />} />
            <Route path='/my-lodges' element={<UserLodges />} />
            {["/my-lodges/create", "/my-lodges/edit"].map((path, i) => (
              <Route
                key={i}
                path={path}
                element={<LodgeFormProvider children={<LodgeForm />} />}
              />
            ))}
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
