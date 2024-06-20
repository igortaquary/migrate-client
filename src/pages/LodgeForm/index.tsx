import { FormEvent, useEffect, useState } from "react";
import Alert from "react-bootstrap/esm/Alert";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import { Link, Navigate, useLocation } from "react-router-dom";

import { createLodge, updateLodge } from "../../services/lodge.service";
import { getAddessByCep } from "../../services/viacep";
import {
  ContactInfo,
  Gender,
  Lodge,
  LodgeType,
  SpaceType,
} from "../../types/lodge.types";
import { Location } from "../../types/location.types";
import { getAllInstitutions } from "../../services/institution.service";

interface IErrors {
  title?: string;
  description?: string;
  server?: string;
  price?: string;
}

interface IErrorsLocation extends Partial<Location> {}

export const LodgeForm = () => {
  const { state } = useLocation();
  const lodgeToEdit = state?.lodge as Lodge;

  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<IErrors>({});
  const [locationErrors, setLocationErrors] = useState<IErrorsLocation>({});

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
  const [gender, setGender] = useState<Gender>(lodgeToEdit?.gender || "any");
  const [contactInfo, setContactInfo] = useState<ContactInfo>(
    lodgeToEdit?.contactInfo || "all"
  );
  const [price, setPrice] = useState<number | undefined>(
    lodgeToEdit?.price || undefined
  );

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
    let err = locationErrors;

    if (/^\d{8}$/.test(zipCode)) {
      console.log("zipCode");
      err.zipCode = "";
      if (lastZipCode !== zipCode) {
        setLastZipCode(zipCode);
        const result = await getAddessByCep(zipCode);
        if (result) setLocationObj(result);
      }
    } else {
      err.zipCode = "CEP inválido. Apenas números";
    }
    setLocationErrors(err);
  };

  const validate = () => {
    const err: IErrors = {};
    const locErr: IErrorsLocation = {};
    if (title.length < 5)
      err.title = "O título do seu anúncio está muito curto";
    if (description.length < 20)
      err.description = "A descrição do seu anúncio está muito curta";
    if (!location) err.server = "Preencha a localização da acomodação";

    if (location) {
      if (!location.address)
        locErr.address = "Preencha o endereço da acomodação";
      if (!location.district)
        locErr.district = "Preencha o bairro da acomodação";
      if (!location.city) locErr.city = "Preencha a cidade da acomodação";
      if (!location.state) locErr.state = "Preencha a UF da acomodação";
    }

    setErrors(err);
    setLocationErrors(locErr);
    return Object.keys({ ...err, ...locErr }).length === 0;
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
          gender,
          contactInfo,
          price,
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

        <Row>
          <Form.Group as={Col} md='12' className='mb-3'>
            <Form.Label>CEP</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='Digite o CEP (apenas números)'
              onChange={(e) => setZipCode(e.target.value)}
              value={zipCode}
              isInvalid={!!locationErrors?.zipCode}
              onBlur={handleZipCode}
            />
            <Form.Control.Feedback type='invalid'>
              {locationErrors?.zipCode}
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
              isInvalid={!!locationErrors?.address}
            />
            <Form.Control.Feedback type='invalid'>
              {locationErrors?.address}
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
              isInvalid={!!locationErrors?.district}
            />
            <Form.Control.Feedback type='invalid'>
              {locationErrors?.district}
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
              isInvalid={!!locationErrors?.city}
            />
            <Form.Control.Feedback type='invalid'>
              {locationErrors?.city}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md='6' className='mb-3'>
            <Form.Label>Estado</Form.Label>
            <Form.Control
              required
              type='text'
              maxLength={2}
              placeholder='UF'
              onChange={(e) =>
                setLocation("state", e.target.value.toUpperCase())
              }
              value={location.state}
              isInvalid={!!locationErrors?.state}
            />
            <Form.Control.Feedback type='invalid'>
              {locationErrors?.state}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

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
                //const str = e.target.value;
                //const res = str.replace(/\D/g, "");
                //Number(res).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
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
        </Row>

        {Object.keys(locationErrors).map((errKey, i) => (
          <Alert variant='danger' key={i}>
            <i className='bi bi-x-circle'></i>{" "}
            {locationErrors[errKey as keyof IErrorsLocation]}
          </Alert>
        ))}

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
