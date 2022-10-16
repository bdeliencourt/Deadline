import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './css/App.css';
import './css/animation.css';
import Dashboard from './views/Dashboard';
import Welcome from './views/Welcome';
import Menu from './components/Menu';
import UserContext from './contexts/UserContext';
import Loading from './components/Loading';
import axios from 'axios';

const App: React.FC = () => {

  const [userToken, setUserToken] = useState<string>("");
  const [finishedRequest, setFinishedRequest] = useState<boolean>(false);
  // Get the user token if session exists
  useEffect( () => {
    axios(`${process.env.REACT_APP_SERVER_IP}/get-user`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      withCredentials: true
    })
    .then((response) => {
      // Load profile into component
      setFinishedRequest(true);
      setUserToken(response.data.result.token);
    })
    .catch((error) => {
      setFinishedRequest(true);
    });
  }, []);

  return (
    <Router>
      <Container fluid className="App">
      <UserContext.Provider value={{ userToken: userToken, setUserToken: setUserToken }}>
        {/* Wait while fetching user */}
        {!finishedRequest && <Loading/>}
        {/* Protect menu */}
        {userToken && <Menu />}
        {finishedRequest && <Routes>
              <Route path="/" element={(userToken)?<Dashboard />:<Welcome/>} />
              <Route path="/dashboard" element={(userToken)? <Dashboard />: <Navigate to="/"/>} />
              <Route path="*" element={<Navigate to="/"/>} />
          </Routes>
        }
        </UserContext.Provider>
      </Container>
    </Router>
  );
};

export default App;
