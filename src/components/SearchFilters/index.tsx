import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { Gender, LodgeType, SpaceType } from "../../types/lodge.types";
import { useState } from "react";

interface LodgeSearchParams {
  type?: LodgeType;
  space?: SpaceType;
  gender?: Gender;
  state?: string;
  institutionId?: string;
}
export const SearchFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [space, setSpace] = useState(searchParams.get("space") || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [gender, setGender] = useState(searchParams.get("gender") || "");

  const handleSearch = () => {
    const params: any = {};

    if (space) params.space = space;
    if (type) params.type = type;
    if (gender) params.gender = gender;

    setSearchParams((prev) => {
      return { ...prev, ...params };
    });
  };

  return (
    <Card className='p-3 mb-4'>
      <Row>
        <Form.Group as={Col} md='3'>
          <Form.FloatingLabel label='Tipo de espaço'>
            <Form.Select
              onChange={(e) => setSpace(e.target.value)}
              aria-label='Tipo de espaço'
              value={space}
            >
              <option value={""}>Todos</option>
              <option value={SpaceType.APARTMENT}>Apartamento</option>
              <option value={SpaceType.HOUSE}>Casa</option>
              <option value={SpaceType.OTHER}>Outro</option>
            </Form.Select>
          </Form.FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md='3'>
          <Form.FloatingLabel label='Acomodação'>
            <Form.Select
              onChange={(e) => setType(e.target.value)}
              aria-label='Tipo de acomodação'
              value={type}
            >
              <option value={""}>Todos</option>
              <option value={LodgeType.ENTIRE}>Espaço inteiro</option>
              <option value={LodgeType.ROOM}>Quarto inteiro</option>
              <option value={LodgeType.SHARED_ROOM}>
                Quarto compartilhado
              </option>
            </Form.Select>
          </Form.FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md='3'>
          <Form.FloatingLabel label='Gênero'>
            <Form.Select
              onChange={(e) => setGender(e.target.value)}
              aria-label='Gênero'
              value={gender}
            >
              <option value={""}>Todos</option>
              <option value={Gender.ANY}>Qualquer um</option>
              <option value={Gender.MALE}>Apenas homens</option>
              <option value={Gender.FEMALE}>Apenas mulheres</option>
            </Form.Select>
          </Form.FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md='3' className='d-flex align-items-center'>
          <Button
            onClick={handleSearch}
            variant='secondary'
            className='btn-sm w-100'
          >
            Filtrar
          </Button>
        </Form.Group>
      </Row>
    </Card>
  );
};
