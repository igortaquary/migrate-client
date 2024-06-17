import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Loader } from "../../components/Loader";
import { getProfile } from "../../services/user.service";

export const Profile = () => {
  const userContext = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

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

  return (
    <div className='card p-4 my-5'>
      <h1>Meu Perfil</h1>
      {JSON.stringify(user)}
      <button onClick={userContext.logout} className='btn btn-danger'>
        Sair
      </button>
    </div>
  );
};
