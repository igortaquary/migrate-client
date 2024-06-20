import { FormEvent, useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { Form } from "react-bootstrap";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const userContext = useContext(UserContext);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await userContext.login({ email, password });
  };

  if (userContext.user) {
    return <Navigate to={"/profile"} />;
  }

  return (
    <div className='card px-4 py-4 my-5'>
      <h1>Entrar</h1>
      <Form onSubmit={handleSubmit}>
        <Form.FloatingLabel label='Email' className='my-3'>
          <Form.Control
            type='email'
            className='form-control'
            placeholder='E-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.FloatingLabel>
        <div className='invalid-feedback'>E-mail inválido</div>

        <Form.FloatingLabel label='Senha' className='my-3'>
          <Form.Control
            type='password'
            className='form-control'
            placeholder='Senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.FloatingLabel>
        <div className='invalid-feedback'>Preencha a senha</div>

        <div className='d-flex justify-content-center my-4'>
          <button type='submit' className='btn w-100 btn-secondary px-5'>
            Entrar
          </button>
        </div>

        <hr />

        <div className='d-flex justify-content-center'>
          <Link to={"/sign-up"}>Criar conta</Link>
        </div>
      </Form>
    </div>
  );
};
