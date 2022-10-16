import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { UserActionProps } from '../interfaces/interfaces';
import '../css/userconnection.css';
import axios from 'axios';

const RegisterForm: React.FC<UserActionProps> = ({ handleChangeUserAction }) => {

  const [registerState, setRegisterState] = useState<string>("default");

  const [username, setUsername] = useState<string>('');
  const updateSetUsername = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);

  const [password, setPassword] = useState<string>('');
  const updateSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const [address, setAddress] = useState<string>('');
  const updateSetAddress = (e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value);

  const [firstname, setFirstname] = useState<string>('');
  const updateSetFirstname = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFirstname(e.target.value);

  const [lastname, setLastname] = useState<string>('');
  const updateSetLastname = (e: React.ChangeEvent<HTMLInputElement>) => setLastname(e.target.value);

  const [email, setEmail] = useState<string>('');
  const updateSetEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const [phone, setPhone] = useState<string>('');
  const updateSetPhone = (e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const performRegister = (e: React.FormEvent<HTMLFormElement>) => {

    setErrorMessage("");
    setRegisterState("pending");
    e.preventDefault();
    // Request axios
    axios(`${process.env.REACT_APP_SERVER_IP}/register`, {
      method: 'post',
      data: {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        phone: phone,
        address: address
      },
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        'Access-Control-Allow-Credentials': true
      },
      withCredentials: true
    })
      .then((response) => {
        // On success display login form
        handleChangeUserAction('login');
      })
      .catch((error) => {
        setErrorMessage(error.response.data.result.message);
      });
  };

  return (
    <Container fluid className="formContainer fade-in">
      <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => performRegister(e)}>
        {/* Username Input*/}
        <Form.Group className="mb-3" controlId="formName">
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSetUsername(e)}
            required
          />
        </Form.Group>

        {/* Email Input*/}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSetEmail(e)}
            required
          />
        </Form.Group>

        {/* Firstname Input*/}
        <Form.Group className="mb-3" controlId="formBasicFirstname">
          <Form.Control
            type="text"
            placeholder="Enter firstname"
            value={firstname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSetFirstname(e)}
            required
          />
        </Form.Group>

        {/* Lastname Input*/}
        <Form.Group className="mb-3" controlId="formBasicLastname">
          <Form.Control
            type="test"
            placeholder="Enter lastname"
            value={lastname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSetLastname(e)}
            required
          />
        </Form.Group>

        {/* Phone Input */}
        <Form.Group className="mb-3" controlId="fromBasicPhone">
          <Form.Control
            type="tel"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSetPhone(e)}
            pattern="[0-9]{10}"
            required
          />
        </Form.Group>

        {/* Address Input */}
        <Form.Group className="mb-3" controlId="fromBasicAddress">
          <Form.Control
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSetAddress(e)}
            required
          />
        </Form.Group>

        {/* Password input */}
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
          {(registerState === "default" || errorMessage) && <Button
            variant="primary"
            type="submit"
            className="formUserActionButton"
            disabled={
              !username || !password || !address || !email || !firstname || !lastname || !phone
            }>
            Sign in
          </Button>
          }

          {registerState === "pending" && !errorMessage && <Button variant="primary" type="submit" disabled className="formUserActionButton">
             <span className="spinner-border"></span>
          </Button>}


          {errorMessage && <div className="text-danger">{errorMessage}</div>}

          <div className="formQuestionContainer">
            Already have an account?{' '}
            <button
              className="formLink text-primary"
              disabled
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
