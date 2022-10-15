import React from "react";
import { Container } from "react-bootstrap";
import ProfileForm from "../components/ProfileForm";
import "../css/dashboard.css"
const Dashboard : React.FC = () => {

    return(
        <Container className="dashboard">
            <ProfileForm/>
        </Container>
    );
}

export default Dashboard;