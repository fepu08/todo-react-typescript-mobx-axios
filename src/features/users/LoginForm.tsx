import React from "react";
import { Button, Form } from "react-bootstrap";

const LoginForm = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <h1 className="text-center mb- mb-5">
        <span className="text-primary">L</span>og&nbsp;
        <span className="text-primary">I</span>n
      </h1>
      <Form style={{ maxWidth: "500px" }} className="card w-100 p-3">
        <div className="card-body">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required />
          </Form.Group>
          <Button
            className="d-block mt-4 ml-auto mr-auto w-100 "
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
