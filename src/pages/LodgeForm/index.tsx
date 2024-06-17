import { FormEvent, useState } from "react";
import Alert from "react-bootstrap/esm/Alert";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import { Link, useLocation } from "react-router-dom";

import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { createLodge } from "../../services/lodge.service";

interface IErrors {
  title?: string;
  description?: string;
  server?: string;
}

enum LodgeType {
  ENTIRE = 0,
  ROOM = 1,
  SHARED_ROOM = 2,
}

enum SpaceType {
  APARTMENT = 0,
  HOUSE = 1,
  OTHER = 2,
}

export const LodgeForm = () => {
  const { state } = useLocation();
  const lodgeToEdit = state?.lodge;

  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<IErrors>({});

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<LodgeType>(0);
  const [space, setSpace] = useState<SpaceType>(0);

  const [location, setLocation] = useState<any>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createLodge({
        title,
        description,
        space,
        type,
        institutionId: "57109e45-4061-483d-8e9f-8e308eb37d8d",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
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
        </Row>
        <hr className='my-5' />
        <h2 className='mb-3'>Localização</h2>
        <GooglePlacesAutocomplete
          apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          apiOptions={{
            language: "pt-BR",
            region: "BR",
          }}
          selectProps={{
            placeholder: "Selecione...",
            value: location,
            onChange: setLocation,
          }}
        />

        {JSON.stringify(location)}

        <hr className='my-5' />
        <h2 className='mb-3'>Fotos</h2>

        {!!errors.server && <Alert variant='danger'>{errors.server}</Alert>}

        <div className='d-flex flex-column align-items-center my-3'>
          <Button type='submit' variant='secondary' className='px-5 mb-3'>
            Criar Anúncio
          </Button>
          <Link to={".."} relative='path' className='btn btn-link'>
            Cancelar
          </Link>
        </div>
      </Form>
    </main>
  );
};
