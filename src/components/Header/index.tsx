import { Link, NavLink } from "react-router-dom";
import "./index.scss";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Button, Dropdown } from "react-bootstrap";

export const Header = () => {
  const userContext = useContext(UserContext);

  const isMobile = window.screen.width < 768;

  const loggedLinks = userContext.user
    ? [
        { to: "/profile", title: "Minha Conta" },
        { to: "/profile", title: "Meus Anúncios" },
      ]
    : [{ to: "/login", title: "Entrar" }];
  const links = [{ to: "/lodges", title: "Explorar" }, ...loggedLinks];

  return (
    <header className='header-wrapper'>
      <div className='container'>
        <div className='content'>
          <Link to={"/"}>
            <h1>Migrate</h1>
          </Link>
          {isMobile ? (
            <Dropdown align={"end"}>
              <Dropdown.Toggle className='menu-button'>
                <i className='bi bi-list'></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {links.map((link, i) => (
                  <Dropdown.Item>
                    <NavLink
                      key={"navlink-" + i}
                      to={link.to}
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      {link.title}
                    </NavLink>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <nav className='text-lowercase'>
              {links.map((link, i) => (
                <NavLink
                  key={"navlink-" + i}
                  to={link.to}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {link.title}
                </NavLink>
              ))}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};
