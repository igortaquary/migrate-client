import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import {
  ContactInfo,
  Gender,
  DirectionMode,
  LodgeType,
  SpaceType,
} from "../../types/lodge.types";
import { useContext, useEffect, useState } from "react";
import { getAllInstitutions } from "../../services/institution.service";
import {
  LodgeDetails,
  LodgeFormContext,
} from "../../contexts/LodgeFormContext";

interface IErrors {
  title?: string;
  description?: string;
  server?: string;
  price?: string;
  location?: string;
}

export const LodgeDetailsForm = () => {
  const { nextStep, prevStep, changeStepValidity, setDetails, lodgeDetails } =
    useContext(LodgeFormContext);

  const [institutions, setInstitutions] = useState<any[]>([]);
  const [errors, setErrors] = useState<IErrors>({});

  const setDetailProperty = (key: keyof LodgeDetails, value: any) => {
    setDetails({ ...lodgeDetails, [key]: value });
  };

  const {
    title,
    description,
    type,
    space,
    gender,
    contactInfo,
    price,
    directionMode,
    institutionId,
  } = lodgeDetails;

  const setTitle = (value: string) => setDetailProperty("title", value);
  const setDescription = (value: string) =>
    setDetailProperty("description", value);
  const setType = (value: LodgeType) => setDetailProperty("type", value);
  const setSpace = (value: SpaceType) => setDetailProperty("space", value);
  const setGender = (value: Gender) => setDetailProperty("gender", value);

  const setContactInfo = (value: ContactInfo) =>
    setDetailProperty("contactInfo", value);
  const setPrice = (value: number | undefined) =>
    setDetailProperty("price", value);
  const setDirectionMode = (value: DirectionMode) =>
    setDetailProperty("directionMode", value);
  const setInstitution = (value: string) =>
    setDetailProperty("institutionId", value);

  const handleGetInstitutions = async () => {
    const result = await getAllInstitutions();
    setInstitutions(result.data);
  };

  const validate = () => {
    const errs: IErrors = {};
    if (title.length < 5) errs.title = "Título muito curto";
    if (description.length < 20) errs.description = "Descrição muito curta";
    if (price) {
      if (isNaN(price)) {
        errs.price = "O preço deve ser um valor numérico";
      }
    }

    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      changeStepValidity(0, true);
      nextStep();
    } else {
      changeStepValidity(0, false);
    }
  };

  useEffect(() => {
    handleGetInstitutions();
  }, []);

  return (
    <div>
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
            <option value={LodgeType.SHARED_ROOM}>Quarto compartilhado</option>
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
          <InputGroup>
            <InputGroup.Text>R$</InputGroup.Text>
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
          </InputGroup>
          <Form.Control.Feedback type='invalid'>
            {errors.price}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md='12' className='mb-3'>
          <Form.Label>Universidade/Campus</Form.Label>
          <Form.Select
            onChange={(e) => setInstitution(e.target.value)}
            aria-label='Universidade/Campus'
            value={institutionId || undefined}
          >
            <option value={""}>Nenhum</option>
            {institutions.map((institution, i) => (
              <option key={i} value={institution.id}>
                {institution.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {institutionId && (
          <Form.Group as={Col} md='12' className='mb-3'>
            <Form.Label>Forma de transporte mais comum</Form.Label>
            <Form.Select
              onChange={(e) =>
                setDirectionMode(e.target.value as DirectionMode)
              }
              aria-label='Forma de transporte'
              value={directionMode}
            >
              <option value={DirectionMode.TRANSIT}>Transporte público</option>
              <option value={DirectionMode.DRIVING}>Dirigindo</option>
              <option value={DirectionMode.WALKING}>Andando</option>
              <option value={DirectionMode.BICYCLING}>Bicicleta</option>
            </Form.Select>
            <Form.Text>
              Como geralmente você ou quem mora próximo vai desta acomodação
              para a instituição selecionada?
            </Form.Text>
          </Form.Group>
        )}
      </Row>
      <div className='d-flex align-items-center justify-content-end my-3 gap-4'>
        <Button
          onClick={prevStep}
          type='button'
          variant='secondary'
          className='px-5'
        >
          Voltar
        </Button>
        <Button
          onClick={validate}
          type='button'
          variant='primary'
          className='px-5'
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};
