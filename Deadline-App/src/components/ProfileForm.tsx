import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import '../css/profileform.css';
import {UserProfile} from "../interfaces/interfaces"
import UserContext from '../contexts/UserContext';
import axios from 'axios';
import { redirect, useNavigate } from 'react-router-dom';

const ProfileForm: React.FC = () => {


  const navigate = useNavigate();
  const {userToken} = useContext(UserContext);

  // Store response from query
  const [userProfile, setUserProfile] = useState<UserProfile>({});

  // Hook for mail
  const [email, setEmail] = useState<string>("");
  const [emailUpdated, setEmailUpdated] = useState<boolean>(false);
  const handleEmailUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailUpdated(e.target.value !== userProfile["email"]);
  };

  // Hook for address
  const [address, setAddress] = useState<string>("");
  const [addressUpdated, setAddressUpdated] = useState<boolean>(false);

  const handleAddressUpdate = (e: React.ChangeEvent<HTMLInputElement>) =>
  {
    setAddress(e.target.value);
    setAddressUpdated(e.target.value !== userProfile["address"]);
  };

  // Retrieve user infos on amount
  useEffect(() => {

    axios(`${process.env.REACT_APP_SERVER_IP}/get-profile`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Authorization" : `Bearer ${userToken}`
      },
      withCredentials: true
    })
    .then((response) => {
      // Load profile into component
      setUserProfile({...response.data.result});
      setEmail(response.data.result["email"]);
      setAddress(response.data.result["address"]);
      redirect("/dashboard");
    })
    .catch((error) => {});
  }, [userToken]);


  const handleUpdateProfile = () => {
    
    axios(`${process.env.REACT_APP_SERVER_IP}/update-profile`, {
      method: "post",
      data:{
        email: email,
        address: address
      },
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Authorization" : `Bearer ${userToken}`
      },
      withCredentials: true
    })
    .then((response) => {
      // On success refresh the page
      navigate(0);
    })
    .catch((error) => {console.log(error)});

  };

  return (
    <Container fluid>
      <Row className="profileContainer">
        {/*Avatar */}
        <Row>
          {/* Col to force centering */}
          <Col>
            <img
              className="imageProfile"
              src={require("../assets/images/background.png")} alt="Avatar"
            />
          </Col>
        </Row>

        {/* Display name */}
        <Row className="display-5">
          <strong>{userProfile["username"]}</strong>
        </Row>
        {/* Display firstname */}
        <Row>
          <small>
            <strong>Firstname</strong>
          </small>
          <Form.Control
            type="text"
            className="inputProfile"
            placeholder="Firstname"
            disabled
            value={userProfile["firstname"]}
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
            placeholder="Lastname"
            value={userProfile["lastname"]}
            disabled
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
            placeholder="Email"
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
            placeholder="Address"
            value={address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAddressUpdate(e)}
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
            placeholder="Phone"
            disabled
            value={userProfile["phone"]}
          />
        </Row>
      </Row>
      <Row>
        <div className="d-grid gap-2">
          {/* Unlock save button only if email or address changed from initial value */}
          <Button variant="outline-primary" disabled={!addressUpdated && !emailUpdated} 
          onClick={() => handleUpdateProfile()}>Save changes</Button>
        </div>
      </Row>
    </Container>
  );
};

export default ProfileForm;
