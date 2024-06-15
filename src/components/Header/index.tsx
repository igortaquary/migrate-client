import { Link } from "react-router-dom";
import "./index.scss";

export const Header = () => {
  return (
    <header className='header-wrapper'>
      <div className='container'>
        <div className='content'>
          <Link to={"/"}>
            <h1>Migrate</h1>
          </Link>
          <div>
            <Link to={"/login"} className='btn btn-dark'>
              Entrar
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
