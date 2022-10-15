import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/App.css';
import './css/animation.css';
import Dashboard from './views/Dashboard';
import Welcome from './views/Welcome';

const App: React.FC = () => {
  return (
    <Router>
      <Container fluid className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
