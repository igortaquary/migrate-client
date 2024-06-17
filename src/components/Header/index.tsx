import { Link, NavLink } from "react-router-dom";
import "./index.scss";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export const Header = () => {
  const userContext = useContext(UserContext);

  return (
    <header className='header-wrapper'>
      <div className='container'>
        <div className='content'>
          <Link to={"/"}>
            <h1>Migrate</h1>
          </Link>
          <nav className='text-lowercase'>
            <NavLink
              to={"/lodges"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Explorar
            </NavLink>
            {userContext.user ? (
              <>
                <NavLink
                  to={"/profile"}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Minha Conta
                </NavLink>
                <NavLink
                  to={"/my-lodges"}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Meus Anúncios
                </NavLink>
              </>
            ) : (
              <NavLink
                to={"/login"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Entrar
              </NavLink>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
