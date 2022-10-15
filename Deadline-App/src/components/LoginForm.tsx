import React, { useState } from 'react';
import '../css/userconnection.css';
import { UserActionProps } from '../interfaces/interfaces';
import { Button, Container, Form } from 'react-bootstrap';

const LoginForm: React.FC<UserActionProps> = ({ handleChangeUserAction }) => {
  const [username, setUsername] = useState<string>('');
  const updateSetUsername = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);

  const [password, setPassword] = useState<string>('');
  const updateSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleUserLogin = (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <Container fluid className="formContainer fade-in">
      <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleUserLogin(e)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSetUsername(e)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSetPassword(e)}
          />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" type="submit" className="formUserActionButton">
            Sign up
          </Button>

          <div className="formQuestionContainer">
            Not registered yet?{' '}
            <button
              className="formLink text-primary"
              onClick={() => handleChangeUserAction('register')}>
              Sign-in
            </button>
          </div>
        </div>
      </Form>
    </Container>
  );
};

export default LoginForm;
