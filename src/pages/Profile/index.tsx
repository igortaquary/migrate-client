import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Loader } from "../../components/Loader";
import { getProfile } from "../../services/user.service";
import { genderMap, User } from "../../types/user.types";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Profile = () => {
  const userContext = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();

  const handleFetch = async () => {
    try {
      const response = await getProfile();
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  if (loading) return <Loader />;

  if (!user) return <Alert>Ocorreu um erro inesperado</Alert>;

  return (
    <div className='card p-4 my-5'>
      <h1>Meu Perfil</h1>
      <div>
        <b>Nome: </b>
        {user.name}
      </div>
      <div>
        <b>Email: </b>
        {user.email}
      </div>
      <div>
        <b>Telefone: </b>
        {user.phone}
      </div>
      <div>
        <b>Gênero: </b>
        {genderMap[user?.gender!]}
      </div>
      <hr />
      <div className='row row-gap-3'>
        <div className='col-md-6'>
          <Link to='edit' className='btn btn-secondary w-100'>
            Editar Perfil
          </Link>
        </div>
        <div className='col-md-6'>
          <button
            type='button'
            onClick={userContext.logout}
            className='btn btn-danger w-100'
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};
