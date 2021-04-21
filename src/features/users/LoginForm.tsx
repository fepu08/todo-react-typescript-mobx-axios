import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { UserFormValues } from "../../app/models/user";
import { useStore } from "../../app/stores/store";

const LoginForm = () => {
  const { userStore } = useStore();
  const [user, setUser] = useState<UserFormValues>({ email: "", password: "" });

  const handleSubmit = () => {
    if (user.email === "" || user.password === "") {
      console.log("empty fields");
    } else {
      userStore.login(user);
      //setUser({ email: "", password: "" });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <h1 className="text-center mb- mb-5">
        <span className="text-primary">L</span>og&nbsp;
        <span className="text-primary">I</span>n
      </h1>
      <Form style={{ maxWidth: "500px" }} className="card w-100 p-3">
        <div className="card-body">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={user.email}
              placeholder="Enter email"
              onChange={handleChange}
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
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

export default observer(LoginForm);
