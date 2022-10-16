import React from 'react';
import { Container } from 'react-bootstrap';
import "../css/loading.css";
import {LoadingProps} from "../interfaces/interfaces"

const Loading :React.FC<LoadingProps> = ({text = ""}) => {

    return(
        <Container className="loadingContainer">
            <div className="spinner-border text-info bigSpinner" role="status"></div>
            <div className="lead">{text}</div>
        </Container>
    );
};

export default Loading;