import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const LoadingComponent = (props) => (
    <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
    </Spinner>
);

export default LoadingComponent;