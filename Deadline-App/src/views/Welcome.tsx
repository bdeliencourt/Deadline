import React from 'react';
import '../css/welcome.css';
import UserConnection from '../components/UserConnection';
import { Container, Row, Col } from 'react-bootstrap';

const Welcome: React.FC = () => {
  return (
    <Container fluid className="welcomeContainer">
      <Row className="fade-in">
        <Col>
          <h3 className="display-1">
            <b>Deadline</b>
          </h3>
          <blockquote className="blockquote">Let's build together</blockquote>
        </Col>
      </Row>

      <Row>
        <UserConnection />
      </Row>
    </Container>
  );
};

export default Welcome;
