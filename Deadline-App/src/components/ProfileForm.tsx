import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import '../css/profileform.css';
const ProfileForm: React.FC = () => {
  const [email, setEmail] = useState<string>('email');
  const handleEmailUpdate = (e: React.ChangeEvent<HTMLInputElement>) => true;

  return (
    <Container fluid>
      <Row className="profileContainer">
        {/*Avatar */}
        <Row>
          {/* Col to force centering */}
          <Col>
            <img
              className="imageProfile"
              src="https://ui-avatars.com/api/?name=John+Doe?size=512"
            />
          </Col>
        </Row>

        {/* Display name */}
        <Row className="display-5">
          <strong>DELIENCOURT</strong>
        </Row>
        {/* Display firstname */}
        <Row>
          <small>
            <strong>Firstname</strong>
          </small>
          <Form.Control
            type="text"
            className="inputProfile"
            placeholder="My boulder"
            disabled
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEmailUpdate(e)}
          />
        </Row>
        {/* Display lastname */}
        <Row>
          <small>
            <strong>Lastname</strong>
          </small>
          <Form.Control
            type="text"
            className="inputProfile"
            placeholder="My boulder"
            value={email}
            disabled
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEmailUpdate(e)}
          />
        </Row>
        {/* Display email */}
        <Row>
          <small>
            <strong>Email</strong>
          </small>
          <Form.Control
            type="text"
            className="inputProfile"
            placeholder="My boulder"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEmailUpdate(e)}
          />
        </Row>
        {/* Display address */}
        <Row>
          <small>
            <strong>Address</strong>
          </small>
          <Form.Control
            type="text"
            className="inputProfile"
            placeholder="My boulder"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEmailUpdate(e)}
          />
        </Row>
        {/* Display phone number */}
        <Row>
          <small>
            <strong>Phone number</strong>
          </small>
          <Form.Control
            type="text"
            className="inputProfile"
            placeholder="My boulder"
            disabled
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEmailUpdate(e)}
          />
        </Row>
      </Row>
      <Row>
        <div className="d-grid gap-2">
          <Button variant="outline-primary disabled">Save changes</Button>
        </div>
      </Row>
    </Container>
  );
};

export default ProfileForm;
