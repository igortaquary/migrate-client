import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className='py-5 text-center'>
      <h1>Página não encontrada</h1>
      <Link to={"/"}>Voltar para o início</Link>
    </div>
  );
};
