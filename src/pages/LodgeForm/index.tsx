import { FormEvent, useEffect, useState } from "react";
import Alert from "react-bootstrap/esm/Alert";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import { Link, Navigate, useLocation } from "react-router-dom";

import { createLodge, updateLodge } from "../../services/lodge.service";
import {
  ContactInfo,
  DirectionMode,
  Gender,
  Lodge,
  LodgeType,
  SpaceType,
} from "../../types/lodge.types";
import { Location } from "../../types/location.types";
import { getAllInstitutions } from "../../services/institution.service";
import { LodgeImageUpload } from "../../components/LodgeImageUpload";
import { LodgeLocationForm } from "../../components/LodgeLocationForm";
import { Photo, PhotoToUpload } from "../../types/photo.type";

interface IErrors {
  title?: string;
  description?: string;
  server?: string;
  price?: string;
  location?: string;
}

export const LodgeForm = () => {
  const { state } = useLocation();
  const lodgeToEdit = state?.lodge as Lodge | undefined;

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<IErrors>({});

  const [institutions, setInstitutions] = useState<any[]>([]);

  const [title, setTitle] = useState(lodgeToEdit?.title || "");
  const [description, setDescription] = useState(
    lodgeToEdit?.description || ""
  );
  const [institution, setInstitution] = useState(
    lodgeToEdit?.institution?.id || ""
  );
  const [type, setType] = useState<LodgeType>(lodgeToEdit?.type || 1);
  const [space, setSpace] = useState<SpaceType>(lodgeToEdit?.space || 1);
  const [gender, setGender] = useState<Gender>(
    lodgeToEdit?.gender || Gender.ANY
  );
  const [contactInfo, setContactInfo] = useState<ContactInfo>(
    lodgeToEdit?.contactInfo || ContactInfo.ALL
  );
  const [price, setPrice] = useState<number | undefined>(
    lodgeToEdit?.price || undefined
  );
  const [directionMode, setDirectionMode] = useState(
    lodgeToEdit?.directionMode || ""
  );

  const [location, setLocationObj] = useState<Partial<Location>>(
    lodgeToEdit?.location || {}
  );
  const [isValidLocation, setIsValidLocation] = useState<boolean>(false);

  const [photos, setPhotos] = useState<PhotoToUpload[]>(
    lodgeToEdit?.photos || []
  );
  const [isValidPhotos, setIsValidPhotos] = useState<boolean>(false);

  const handleGetInstitutions = async () => {
    const result = await getAllInstitutions();
    setInstitutions(result.data);
  };

  const validate = () => {
    const err: IErrors = {};
    if (title.length < 5)
      err.title = "O título do seu anúncio está muito curto";
    if (description.length < 20)
      err.description = "A descrição do seu anúncio está muito curta";
    if (!location) err.server = "Preencha a localização da acomodação";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      setSubmitting(true);
    }
  };

  const send = async () => {
    if (!validate()) return setSubmitting(false);
    try {
      const payload = {
        title,
        description,
        space,
        type,
        gender,
        contactInfo,
        price,
        location: { ...location } as Location,
        photos,
        institutionId: institution || null,
      };
      if (lodgeToEdit) {
        await updateLodge(lodgeToEdit.id, payload);
      } else {
        await createLodge(payload);
      }
      setSuccess(true);
    } catch (error: any) {
      setErrors({
        server: "Não foi possível salvar. Verifique os dados e tente novamente",
      });
      setSubmitting(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (submitting) {
      if (isValidLocation && isValidPhotos) send();
    } else setSubmitting(false);
  }, [isValidLocation, isValidPhotos, submitting]);

  useEffect(() => {
    handleGetInstitutions();
  }, []);

  if (success) return <Navigate to={"/my-lodges"} />;

  return (
    <main className='py-3'>
      <h1 className='my-3'>Anunciar acomodação</h1>

      <Form noValidate onSubmit={handleSubmit}>
        <Row className='mb-3'>
          <Form.Group as={Col} md='12' className='mb-3'>
            <Form.Label>Título</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='Insira um título atraente para seu anúncio'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md='6' className='mb-3'>
            <Form.Label>Tipo de espaço</Form.Label>
            <Form.Select
              onChange={(e) => setSpace(Number(e.target.value))}
              aria-label='Tipo de espaço'
              value={space}
            >
              <option value={SpaceType.APARTMENT}>Apartamento</option>
              <option value={SpaceType.HOUSE}>Casa</option>
              <option value={SpaceType.OTHER}>Outro</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} md='6' className='mb-3'>
            <Form.Label>Tipo de acomodação</Form.Label>
            <Form.Select
              onChange={(e) => setType(Number(e.target.value))}
              aria-label='Tipo de acomodação'
              value={type}
            >
              <option value={LodgeType.ENTIRE}>Espaço inteiro</option>
              <option value={LodgeType.ROOM}>Quarto inteiro</option>
              <option value={LodgeType.SHARED_ROOM}>
                Quarto compartilhado
              </option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} md='12' className='mb-3'>
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              required
              as='textarea'
              rows={3}
              type='text'
              placeholder='Descreva sua propriedade de forma detalhada'
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <hr className='my-5' />
        <h2 className='mb-3'>Localização</h2>
        <LodgeLocationForm
          submitting={submitting}
          location={location}
          setLocationObj={setLocationObj}
          setIsValidLocation={setIsValidLocation}
        />

        <hr className='my-5' />
        <h2 className='mb-3'>Informações adicionais</h2>
        <Row>
          <Form.Group as={Col} md='12' className='mb-3'>
            <Form.Label>Contato</Form.Label> <br />
            <Form.Text>
              Qual informação de contato devemos mostrar no seu anúncio?
            </Form.Text>
            <Form.Select
              onChange={(e) => setContactInfo(e.target.value as ContactInfo)}
              aria-label='contact'
              value={contactInfo}
            >
              <option value={ContactInfo.EMAIL}>Apenas Email</option>
              <option value={ContactInfo.PHONE}>Apenas Telefone</option>
              <option value={ContactInfo.ALL}>Email e Telefone</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} md='6' className='mb-3'>
            <Form.Label>Aceita</Form.Label>
            <Form.Select
              onChange={(e) => setGender(e.target.value as Gender)}
              aria-label='Genêro'
              value={gender}
            >
              <option value={Gender.ANY}>Todos</option>
              <option value={Gender.MALE}>Apenas homens</option>
              <option value={Gender.FEMALE}>Apenas mulheres</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} md='6' className='mb-3'>
            <Form.Label>Preço (opcional)</Form.Label>
            <Form.Control
              required
              type='number'
              placeholder='Valor mensal'
              onChange={(e) => {
                setPrice(Number(e.target.value));
              }}
              value={price}
              isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.price}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md='12' className='mb-3'>
            <Form.Label>Universidade/Campus</Form.Label>
            <Form.Select
              onChange={(e) => setInstitution(e.target.value)}
              aria-label='Universidade/Campus'
              value={institution}
            >
              <option value={""}>Nenhum</option>
              {institutions.map((institution, i) => (
                <option key={i} value={institution.id}>
                  {institution.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {institution && (
            <Form.Group as={Col} md='12' className='mb-3'>
              <Form.Label>Forma de transporte mais comum</Form.Label>
              <Form.Text>
                Como geralmente você ou quem mora próximo vai desta acomodação
                para a instituição selecionada?
              </Form.Text>
              <Form.Select
                onChange={(e) => setDirectionMode(e.target.value)}
                aria-label='Forma de transporte'
                value={directionMode}
              >
                <option value={DirectionMode.TRANSIT}>
                  Transporte público
                </option>
                <option value={DirectionMode.DRIVING}>Dirigindo</option>
                <option value={DirectionMode.WALKING}>Andando</option>
                <option value={DirectionMode.BICYCLING}>Bicicleta</option>
              </Form.Select>
            </Form.Group>
          )}
        </Row>

        <hr className='my-5' />
        <h2 className='mb-3'>Fotos</h2>
        <p>Adicione algumas fotos da acomodação</p>
        <LodgeImageUpload
          submitting={submitting}
          photos={photos}
          setIsValid={setIsValidPhotos}
          setPhotos={setPhotos}
        />

        {Object.keys(errors).map((errKey, i) => (
          <Alert variant='danger' key={i}>
            <i className='bi bi-x-circle'></i> {errors[errKey as keyof IErrors]}
          </Alert>
        ))}

        <div className='d-flex flex-column align-items-center my-3'>
          <Button type='submit' variant='secondary' className='px-5 mb-3'>
            {lodgeToEdit ? "Editar" : "Criar"} Anúncio
          </Button>
          <Link to={".."} relative='path' className='btn btn-link'>
            Cancelar
          </Link>
        </div>
      </Form>
    </main>
  );
};
