import { ReactElement, useContext, useEffect, useState } from "react";
import { Gender, Lodge, LodgeType, SpaceType } from "../../types/lodge.types";
import { Loader } from "../../components/Loader";
import showNotification from "../../components/GlobalAlert";
import { useParams } from "react-router-dom";
import { getLodge, getLodgeContactInfo } from "../../services/lodge.service";
import { Alert, Button, Card, Col, Row } from "react-bootstrap";
import { Map } from "../../components/Map";
import { UserContext } from "../../contexts/UserContext";

interface ILoading {
  lodge: boolean;
  contactInfo: boolean;
  map: boolean;
}

export const LodgePage = () => {
  const userContext = useContext(UserContext);
  const params = useParams();

  const [lodge, setLodge] = useState<Lodge>();
  const [loading, setLoading] = useState<ILoading>({
    lodge: true,
    contactInfo: false,
    map: false,
  });

  const handleSetLoading = (key: keyof ILoading, value: boolean) => {
    setLoading((p) => ({ ...p, [key]: value }));
  };

  const [showMap, setShowMap] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [contactInfo, setContactInfo] = useState({ email: "", phone: "" });

  const handleLodge = async (id: string) => {
    try {
      const res = await getLodge(id);
      setLodge(res.data);
      handleSetLoading("lodge", false);
    } catch (error) {
      showNotification("danger", "Erro ao buscar a acomodação");
    }
  };

  const handleShowMap = () => {
    handleSetLoading("map", true);
    if (userContext.user) {
      setShowMap(true);
    } else {
      userContext.displayLogInModal();
    }
    handleSetLoading("map", false);
  };

  const handleShowContactInfo = async () => {
    if (userContext.user && lodge?.id) {
      handleSetLoading("contactInfo", true);
      try {
        const res = await getLodgeContactInfo(lodge.id);
        setContactInfo(res.data);
      } catch (error) {
        showNotification("danger", "Erro ao recuperar informações de contato");
      }
      setShowContactInfo(true);
      handleSetLoading("contactInfo", false);
    } else {
      userContext.displayLogInModal();
    }
  };

  const renderGender = (): ReactElement => {
    switch (lodge?.gender) {
      case "male":
        return (
          <div className='mb-3'>
            <i className='bi bi-person-standing'></i> Apenas homens
          </div>
        );
      case "female":
        return (
          <div>
            <i className='bi bi-person-standing-dress'></i> Apenas mulheres
          </div>
        );
      default:
        return <></>;
    }
  };

  const renderLocation = () => {
    const location = lodge?.location;
    if (location)
      return (
        <div>
          <i className='bi bi-geo-alt'></i>
          {" " + location.address + ", " + location.district} <br />
          {location.city + " " + location.state}
        </div>
      );
  };

  const renderPrice = () => {
    if (lodge?.price)
      return (
        <div>
          <b style={{ fontSize: "1.2rem" }}>
            R$ {lodge.price.toFixed(2).replace(".", ",")}
          </b>
        </div>
      );
  };

  const renderType = {
    [LodgeType.ENTIRE]: "Espaço inteiro",
    [LodgeType.ROOM]: "Quarto inteiro",
    [LodgeType.SHARED_ROOM]: "Quarto compartilhado",
  };

  const renderSpace = {
    [SpaceType.HOUSE]: "Casa",
    [SpaceType.APARTMENT]: "Apartamento",
    [SpaceType.OTHER]: "",
  };

  useEffect(() => {
    if (params.id) handleLodge(params.id);
  }, [params]);

  if (loading.lodge) return <Loader />;

  if (!lodge) return <Alert>Ocorreu um erro ao buscar esta acomodação!</Alert>;

  return (
    <main className='py-3'>
      <h1>{lodge.title}</h1>
      <Row>
        <Col md={7} className='mb-3'>
          <Card className='p-3 h-100'></Card>
        </Col>
        <Col md={5} className='mb-3'>
          <Card className='p-3 h-100 gap-3'>
            {renderPrice()}
            {renderLocation()}
            <div>
              {renderSpace[lodge.space]} <br />
              {renderType[lodge.type]}
            </div>
            {renderGender()}

            <div>
              {showContactInfo ? (
                <div>
                  {!!contactInfo.email && (
                    <div>
                      <i className='bi bi-envelope-fill'></i>&nbsp;
                      {contactInfo.email}
                    </div>
                  )}
                  {!!contactInfo.phone && (
                    <div>
                      <i className='bi bi-telephone-fill'></i>&nbsp;
                      {contactInfo.phone.slice(0, 2) +
                        " " +
                        contactInfo.phone.slice(2)}
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  variant='secondary'
                  className='w-100'
                  onClick={handleShowContactInfo}
                  disabled={loading.contactInfo}
                >
                  Informações de contato
                </Button>
              )}
            </div>
          </Card>
        </Col>
        <Col md={12} className='mb-3'>
          <Card className='p-3 h-100'>{lodge.description}</Card>
        </Col>
      </Row>
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
            disabled={loading.map}
          >
            Mostrar mapa
          </Button>
        ))}
    </main>
  );
};
