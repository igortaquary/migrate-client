import { FormEvent, useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Alert from "react-bootstrap/esm/Alert";
import { getProfile, updateProfile } from "../../services/user.service";
import { User } from "../../types/user.types";

interface IErrors {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  gender?: string;
  server?: string;
}

export const EditProfile = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const [errors, setErrors] = useState<IErrors>({});

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    gender: "",
  });

  const setUserValue = (key: keyof User, value: any) =>
    setUser((prev) => ({ ...prev, [key]: value }));

  const handleFetch = async () => {
    try {
      const response = await getProfile();
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const validateForm = () => {
    const validationErros: IErrors = {};

    if (!user.name) validationErros.name = "Preencha o seu nome";
    if (!user.email) validationErros.email = "Preencha o seu email";
    if (!user.phone) validationErros.phone = "Número de telefone inválido";

    setErrors(validationErros);
    return Object.keys(validationErros).length === 0;
  };

  const handleError = (err: any) => {
    console.log(err);
    let message =
      "Não foi possível editar sua conta. Verifique os dados e tente novamente.";
    if (err.statusCode === 409)
      message =
        "Não foi possível criar a conta. O email já esta sendo utilizado.";
    setErrors({
      server: message,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      try {
        await updateProfile(user);
        navigate("/profile");
      } catch (error) {
        handleError(error);
      }
    }
  };

  return (
    <div className='card p-5 my-5'>
      <h1 className='mb-4'>Editar Conta</h1>
      <Form noValidate onSubmit={handleSubmit}>
        <Row>
          <Form.Group as={Col} md='12' className='mb-3'>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='Nome completo'
              onChange={(e) => setUserValue("name", e.target.value)}
              value={user.name}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='12' className='mb-3'>
            <Form.Label>Genêro</Form.Label>
            <Form.Select
              onChange={(e) => setUserValue("gender", e.target.value)}
              aria-label='Gênero'
              value={user.gender}
            >
              <option value='male'>Homem</option>
              <option value='female'>Mulher</option>
              <option value='other'>Outro</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} md='12' className='mb-3'>
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='(61) 99999-9999'
              onChange={(e) => setUserValue("phone", e.target.value)}
              value={user.phone}
              isInvalid={!!errors.phone}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.phone}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='12' className='mb-3'>
            <Form.Label>E-mail</Form.Label>
            <Form.Control required type='email' disabled value={user.email} />
          </Form.Group>
          {/* <Form.Group as={Col} md='12' className='mb-3'>
            <Form.Label>Senha</Form.Label>
            <Form.Control
              required
              type='password'
              placeholder='Senha'
              onChange={(e) => setUserValue("password", e.target.value)}
              value={user.password}
              isInvalid={!!errors.password}
              isValid={false}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group> */}

          {!!errors.server && <Alert variant='danger'>{errors.server}</Alert>}

          <div className='row row-gap-3 mt-4'>
            <div className='col-md-6'>
              <Button
                type='submit'
                variant='secondary'
                className='px-5 w-100'
                disabled={loading}
              >
                Salvar
              </Button>
            </div>
            <div className='col-md-6'>
              <Link to='/profile' className='btn btn-outline-secondary w-100'>
                Cancelar
              </Link>
            </div>
          </div>
        </Row>
      </Form>
    </div>
  );
};
