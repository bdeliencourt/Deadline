import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { UserActionProps } from '../interfaces/interfaces';
import '../css/userconnection.css';

const RegisterForm: React.FC<UserActionProps> = ({ handleChangeUserAction }) => {
  const [displayErrorMessage, setDisplayErrorMessage] = useState<boolean>(false);

  const [username, setUsername] = useState<string>('');
  const updateSetUsername = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);

  const [password, setPassword] = useState<string>('');
  const updateSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const [email, setEmail] = useState<string>('');
  const updateSetEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const [phone, setPhone] = useState<string>('');
  const updateSetPhone = (e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value);

  const performRegister = (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <Container fluid className="formContainer fade-in">
      <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => performRegister(e)}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSetUsername(e)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSetEmail(e)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="fromBasicPhone">
          <Form.Control
            type="tel"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSetPhone(e)}
            pattern="[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSetPassword(e)}
            required
          />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" type="submit" className="formUserActionButton">
            Sign in
          </Button>

          {displayErrorMessage && (
            <div className="text-danger">Your email or password is incorrect./</div>
          )}

          <div className="formQuestionContainer">
            Already have an account?{' '}
            <button
              className="formLink text-primary"
              onClick={() => handleChangeUserAction('login')}>
              Sign-up
            </button>
          </div>
        </div>
      </Form>
    </Container>
  );
};

export default RegisterForm;
