import React, { useState, useContext} from 'react';
import '../css/userconnection.css';
import { UserActionProps } from '../interfaces/interfaces';
import { Button, Container, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const LoginForm: React.FC<UserActionProps> = ({ handleChangeUserAction }) => {

  const { setUserToken} = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const updateSetUsername = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);

  const [password, setPassword] = useState<string>('');
  const updateSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleUserLogin = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    // Request axios
    axios(`${process.env.REACT_APP_SERVER_IP}/login`, {
      method: "post",
      data:{
        username: username,
        password: password
      },
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      withCredentials: true
    })
    .then((response) => {
      // On success display login form
      console.log(response.data.result["token"]);
      setUserToken && setUserToken(response.data.result["token"]);
      navigate("/dashboard");
    })
    .catch((error) => {setErrorMessage("Invalid credentials.")});
  };

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

          {errorMessage && <div className = "text-danger">{errorMessage}</div>}


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
