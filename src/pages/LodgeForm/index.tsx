import { FormEvent, useEffect, useState } from "react";
import Alert from "react-bootstrap/esm/Alert";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import { Link, Navigate, useLocation } from "react-router-dom";

import { createLodge, updateLodge } from "../../services/lodge.service";
import { getAddessByCep } from "../../services/viacep";
import { LodgeType, SpaceType } from "../../types/lodge.types";
import { Location } from "../../types/location.types";
import { getAllInstitutions } from "../../services/institution.service";

interface IErrors {
  title?: string;
  description?: string;
  server?: string;

  location?: Partial<Location>;
}

export const LodgeForm = () => {
  const { state } = useLocation();
  const lodgeToEdit = state?.lodge;

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
  const [type, setType] = useState<LodgeType>(lodgeToEdit?.type || 0);
  const [space, setSpace] = useState<SpaceType>(lodgeToEdit?.space || 0);

  const [location, setLocationObj] = useState<Partial<Location>>(
    lodgeToEdit?.location || {}
  );
  const [zipCode, setZipCode] = useState(lodgeToEdit?.location?.zipCode || "");
  const [lastZipCode, setLastZipCode] = useState("-");

  const setLocation = (attribute: keyof Location, value: string) => {
    setLocationObj({ ...location, [attribute]: value });
  };

  const handleGetInstitutions = async () => {
    const result = await getAllInstitutions();
    setInstitutions(result.data);
  };

  const handleZipCode = async () => {
    console.log(zipCode);
    let err = errors;
    err.location = err.location || {};
    if (/^\d{8}$/.test(zipCode)) {
      console.log("zipCode");
      err.location.zipCode = "";
      if (lastZipCode !== zipCode) {
        setLastZipCode(zipCode);
        const result = await getAddessByCep(zipCode);
        if (result) setLocationObj(result);
      }
    } else {
      err.location.zipCode = "CEP inválido. Apenas números";
    }
    setErrors(err);
  };

  const validate = () => {
    let err: IErrors = {};
    err.location = errors.location || {};
    if (!title) err.title = "Preencha o titulo";
    if (!location) err.server = "Forneça a localização da acomodação";

    setErrors(err);
    return Object.keys(err).length === 1;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (validate()) {
        const payload = {
          title,
          description,
          space,
          type,
          location: { ...location } as Location,
          institutionId: institution || null,
        };
        if (lodgeToEdit) {
          await updateLodge(lodgeToEdit.id, payload);
        } else {
          await createLodge(payload);
        }
        setSuccess(true);
      }
    } catch (error: any) {
      setErrors({
        server: "Não foi possível salvar. Verifique os dados e tente novamente",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetInstitutions();
  }, []);

  if (success) return <Navigate to={"/my-lodges"} />;

  return (
    <main className='py-3'>
      <h1 className='my-3'>Anúncio</h1>

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

          <Form.Group as={Col} md='12' className='mb-3'>
            <Form.Label>Universidade/Campus</Form.Label>
            <Form.Select
              onChange={(e) => setInstitution(e.target.value)}
              aria-label='Tipo de acomodação'
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
        </Row>
        <hr className='my-5' />
        <h2 className='mb-3'>Localização</h2>

        <Row>
          <Form.Group as={Col} md='12' className='mb-3'>
            <Form.Label>CEP</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='Digite o CEP (apenas números)'
              onChange={(e) => setZipCode(e.target.value)}
              value={zipCode}
              isInvalid={!!errors.location?.zipCode}
              onBlur={handleZipCode}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.location?.zipCode}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md='6' className='mb-3'>
            <Form.Label>Endereço</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='Rua, avenida, etc.'
              onChange={(e) => setLocation("address", e.target.value)}
              value={location.address}
              isInvalid={!!errors.location?.address}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.location?.address}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md='6' className='mb-3'>
            <Form.Label>Bairro</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='Seu bairro'
              onChange={(e) => setLocation("district", e.target.value)}
              value={location.district}
              isInvalid={!!errors.location?.district}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.location?.district}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md='6' className='mb-3'>
            <Form.Label>Cidade</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='Brasília'
              onChange={(e) => setLocation("city", e.target.value)}
              value={location.city}
              isInvalid={!!errors.location?.city}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.location?.city}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md='6' className='mb-3'>
            <Form.Label>Estado</Form.Label>
            <Form.Control
              required
              type='text'
              maxLength={2}
              placeholder='UF'
              onChange={(e) => setLocation("state", e.target.value)}
              value={location.state}
              isInvalid={!!errors.location?.state}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.location?.state}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <hr className='my-5' />
        <h2 className='mb-3'></h2>

        {!!errors.server && <Alert variant='danger'>{errors.server}</Alert>}

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
