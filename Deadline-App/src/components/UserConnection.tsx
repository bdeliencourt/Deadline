import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import '../css/userconnection.css';
const UserConnection: React.FC = () => {
  const [userAction, setUserAction] = useState<string>('login');
  const handleChangeUserAction = (action: string) => setUserAction(action);

  return (
    <Container className="fade-in">
      {userAction === 'login' && <LoginForm handleChangeUserAction={handleChangeUserAction} />}
      {userAction !== 'login' && <RegisterForm handleChangeUserAction={handleChangeUserAction} />}
    </Container>
  );
};

export default UserConnection;
