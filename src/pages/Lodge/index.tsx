import { useContext, useEffect, useState } from "react";
import { Lodge } from "../../types/lodge.types";
import { Loader } from "../../components/Loader";
import showNotification from "../../components/GlobalAlert";
import { useParams } from "react-router-dom";
import { getLodge } from "../../services/lodge.service";
import { Alert, Button } from "react-bootstrap";
import { Map } from "../../components/Map";
import { UserContext } from "../../contexts/UserContext";

export const LodgePage = () => {
  const userContext = useContext(UserContext);
  const params = useParams();

  const [lodge, setLodge] = useState<Lodge>();
  const [loading, setLoading] = useState(true);

  const [showMap, setShowMap] = useState(false);

  const handleLodge = async (id: string) => {
    try {
      const res = await getLodge(id);
      setLodge(res.data);
      setLoading(false);
    } catch (error) {
      showNotification("danger", "Erro ao buscar a acomodação");
    }
  };

  const handleShowMap = () => {
    if (userContext.user) setShowMap(true);
    userContext.displayLogInModal();
  };

  useEffect(() => {
    if (params.id) handleLodge(params.id);
  }, [params]);

  if (loading) return <Loader />;

  if (!lodge) return <Alert>Ocorreu um erro ao buscar esta acomodação!</Alert>;

  return (
    <main className='py-3'>
      <h1>{lodge.title}</h1>
      {!!lodge.location &&
        (showMap ? (
          <Map
            origin={lodge.location}
            destination={lodge.institution?.location}
          />
        ) : (
          <Button
            onClick={handleShowMap}
            variant='primary'
            className='text-white d-block w-100'
          >
            Mostrar mapa
          </Button>
        ))}
    </main>
  );
};
