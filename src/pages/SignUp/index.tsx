import { FormEvent, useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Alert from "react-bootstrap/esm/Alert";

interface IErrors {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  gender?: string;
  server?: string;
}

export const SignUp = () => {
  const userContext = useContext(UserContext);

  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<IErrors>({});

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const validateForm = () => {
    const validationErros: IErrors = {};

    if (!name) validationErros.name = "Preencha o seu nome";
    if (!email) validationErros.email = "Preencha o seu email";
    if (!phone) validationErros.phone = "Número de telefone inválido";
    if (password.length < 5) validationErros.password = "Senha muito curta";

    setErrors(validationErros);
    return Object.keys(validationErros).length === 0;
  };

  const handleError = (err: any) => {
    console.log(err);
    let message =
      "Não foi possível criar sua conta. Verifique os dados e tente novamente.";
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
      console.log("validado");
      await userContext.signUp(
        { email, password, name, phone, gender },
        () => setSuccess(true),
        handleError
      );
    }
  };

  if (userContext.user) {
    return <Navigate to={"/profile"} />;
  }

  if (success) {
    return (
      <div className='card p-5 my-5'>
        <h1 className='mb-4'>Criar Conta</h1>
        <Alert variant='success'>Conta criada com sucesso!</Alert>
        <div className='d-flex justify-content-center my-3'>
          <Link to={"/login"} className='btn btn-primary px-5'>
            Entrar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='card p-5 my-5'>
      <h1 className='mb-4'>Criar Conta</h1>
      <Form noValidate onSubmit={handleSubmit}>
        <Row className='mb-3'>
          <Form.Group as={Col} md='12' className='mb-3'>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='Nome completo'
              onChange={(e) => setName(e.target.value)}
              value={name}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='12' className='mb-3'>
            <Form.Label>Genêro</Form.Label>
            <Form.Select
              onChange={(e) => setGender(e.target.value)}
              aria-label='Gênero'
              value={gender}
            >
              <option>Selecione</option>
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
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              isInvalid={!!errors.phone}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.phone}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='12' className='mb-3'>
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              required
              type='email'
              placeholder='E-mail'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='12' className='mb-3'>
            <Form.Label>Senha</Form.Label>
            <Form.Control
              required
              type='password'
              placeholder='Senha'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              isInvalid={!!errors.password}
              isValid={false}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Check
              required
              label='Concordo com os Termos de Uso'
              feedback='You must agree before submitting.'
              feedbackType='invalid'
            />
          </Form.Group>

          {!!errors.server && <Alert variant='danger'>{errors.server}</Alert>}

          <div className='d-flex justify-content-center my-3'>
            <Button type='submit' variant='secondary' className='px-5'>
              Criar conta
            </Button>
          </div>
        </Row>
      </Form>

      <hr />

      <div className='d-flex justify-content-center'>
        <Link to={"/login"}>Já tenho uma conta</Link>
      </div>
    </div>
  );
};
