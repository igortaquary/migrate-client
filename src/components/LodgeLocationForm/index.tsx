import { useContext, useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { getAddessByCep } from "../../services/viacep";
import { Location } from "../../types/location.types";
import { LodgeFormContext } from "../../contexts/LodgeFormContext";

interface IErrorsLocation extends Partial<Location> {}

export const LodgeLocationForm = () => {
  const { prevStep, nextStep, location, setLocationObj, changeStepValidity } =
    useContext(LodgeFormContext);

  const [locationErrors, setLocationErrors] = useState<IErrorsLocation>({});

  const [lastZipCode, setLastZipCode] = useState("-");

  const setLocation = (attribute: keyof Location, value: string) => {
    setLocationObj({ ...location, [attribute]: value });
  };

  const handleZipCode = async () => {
    let err = locationErrors;
    const zipCode = location.zipCode || "";
    if (/^\d{8}$/.test(zipCode)) {
      err.zipCode = "";
      if (lastZipCode !== zipCode) {
        setLastZipCode(zipCode);
        const result = await getAddessByCep(zipCode);
        if (result) setLocationObj(result);
      }
    } else {
      err.zipCode = "CEP inválido. Apenas números";
    }
    setLastZipCode(zipCode);
    setLocationErrors(err);
  };

  const validate = () => {
    const locErr: IErrorsLocation = {};
    if (!location.zipCode) locErr.zipCode = "Preencha o CEP da acomodação";
    if (!location.address) locErr.address = "Preencha o endereço da acomodação";
    if (!location.district) locErr.district = "Preencha o bairro da acomodação";
    if (!location.city) locErr.city = "Preencha a cidade da acomodação";
    if (!location.state) locErr.state = "Preencha a UF da acomodação";

    setLocationErrors(locErr);
    if (Object.keys(locErr).length === 0) {
      changeStepValidity(1, true);
      nextStep();
    } else {
      changeStepValidity(1, false);
    }
  };

  return (
    <Form>
      <h2 className='mb-3'>Localização</h2>
      <Row>
        <Form.Group as={Col} md='12' className='mb-3'>
          <Form.Label>CEP</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Digite o CEP (apenas números)'
            onChange={(e) => setLocation("zipCode", e.target.value)}
            value={location.zipCode}
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
            onChange={(e) => setLocation("state", e.target.value.toUpperCase())}
            value={location.state}
            isInvalid={!!locationErrors?.state}
          />
          <Form.Control.Feedback type='invalid'>
            {locationErrors?.state}
          </Form.Control.Feedback>
        </Form.Group>
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
    </Form>
  );
};
