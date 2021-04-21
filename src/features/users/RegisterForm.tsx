import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { UserFormValues } from "../../app/models/user";
import { useStore } from "../../app/stores/store";

const RegisterForm = () => {
  const { userStore } = useStore();
  const [user, setUser] = useState<UserFormValues>({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: "",
  });

  const handleSubmit = () => {
    if (
      user.email === "" ||
      user.password === "" ||
      user.passwordConfirm === "" ||
      user.username === ""
    ) {
      console.log("empty fields");
    } else if (user.password !== user.passwordConfirm) {
      console.log("passwords do not match");
    } else {
      const regParam = {
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
      };
      userStore.register(regParam);
      //setUser;{ email: "", password: "" }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <h1 className="text-center mb- mb-5">
        <span className="text-primary">R</span>egister
      </h1>
      <Form style={{ maxWidth: "500px" }} className="card w-100 p-3">
        <div className="card-body">
          <Form.Group className="required">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={user.email}
              placeholder="Enter email"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="required">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={user.username}
              placeholder="Enter username"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={user.firstName!}
              placeholder="Enter first name"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={user.lastName!}
              placeholder="Enter last name"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="required">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={user.password}
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="required">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="passwordConfirm"
              value={user.passwordConfirm!}
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button
            className="d-block mt-4 ml-auto mr-auto w-100 "
            variant="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default observer(RegisterForm);
