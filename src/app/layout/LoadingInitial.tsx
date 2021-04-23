import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingInitial = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Spinner animation="border" role="status" className="my-4"></Spinner>
      <h6>Loading Content ... </h6>
    </div>
  );
};

export default LoadingInitial;
