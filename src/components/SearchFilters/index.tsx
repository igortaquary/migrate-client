import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { Gender, LodgeType, SpaceType } from "../../types/lodge.types";
import { useEffect, useState } from "react";
import { BR_STATES } from "../../types/location.types";
import { getAllInstitutions } from "../../services/institution.service";
import { Institution } from "../../types/institution.types";

interface LodgeSearchParams {
  type?: LodgeType;
  space?: SpaceType;
  gender?: Gender;
  state?: string;
  institutionId?: string;
}

export const SearchFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [institutions, setInstitutions] = useState<Institution[]>([]);

  const [textSearch, setTextSearch] = useState(
    searchParams.get("textSearch") || ""
  );
  const [space, setSpace] = useState(searchParams.get("space") || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [gender, setGender] = useState(searchParams.get("gender") || "");
  const [state, setState] = useState(searchParams.get("state") || "");
  const [institutionId, setInstitutionId] = useState(
    searchParams.get("institutionId") || ""
  );

  const handleSearch = () => {
    const params: any = {};

    const page = searchParams.get("page");
    if (textSearch) params.textSearch = textSearch.trim();
    if (page) params.page = page;
    if (space) params.space = space;
    if (type) params.type = type;
    if (gender) params.gender = gender;
    if (state) params.state = state;
    if (institutionId) params.institutionId = institutionId;

    setSearchParams(params);
  };

  const handleGetInstitutions = async () => {
    const result = await getAllInstitutions();
    setInstitutions(result.data);
  };

  useEffect(() => {
    handleGetInstitutions();
  }, []);

  return (
    <Card className='p-3 mb-4'>
      <Row className='row-gap-3'>
        <Form.Group as={Col} lg='12' md='12' sm='12'>
          <Form.FloatingLabel label='Buscar'>
            <Form.Control
              type='text'
              placeholder='Buscar por nome ou descrição'
              value={textSearch}
              onChange={(e) => setTextSearch(e.target.value)}
            />
          </Form.FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} lg='2' md='4' sm='6'>
          <Form.FloatingLabel label='Instituição'>
            <Form.Select
              onChange={(e) => setInstitutionId(e.target.value)}
              aria-label='Instituição'
              value={institutionId}
            >
              <option value={""}>Todas</option>
              {institutions.map((institution) => (
                <option value={institution.id} key={institution.id}>
                  {institution.name}
                </option>
              ))}
            </Form.Select>
          </Form.FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} lg='2' md='4' sm='6'>
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
        <Form.Group as={Col} lg='2' md='4' sm='6'>
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
        <Form.Group as={Col} lg='2' md='4' sm='6'>
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
        <Form.Group as={Col} lg='2' md='4' sm='6'>
          <Form.FloatingLabel label='Estado'>
            <Form.Select
              onChange={(e) => setState(e.target.value)}
              aria-label='Estado'
              value={state}
            >
              <option value={""}>Todos</option>
              {BR_STATES.map((state) => (
                <option value={state} key={state}>
                  {state}
                </option>
              ))}
            </Form.Select>
          </Form.FloatingLabel>
        </Form.Group>
        <Form.Group
          as={Col}
          lg='2'
          md='4'
          sm='6'
          className='d-flex align-items-center justify-content-center'
        >
          <Button
            onClick={handleSearch}
            variant='secondary'
            className='btn w-100'
          >
            <i className='bi bi-search'></i>
            &nbsp; Filtrar
          </Button>
        </Form.Group>
      </Row>
    </Card>
  );
};
