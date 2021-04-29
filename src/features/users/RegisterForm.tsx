import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Spinner, Form, Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { UserFormValues } from "../../app/models/user";
import { useStore } from "../../app/stores/store";
import { Formik } from "formik";
import * as yup from "yup";

const RegisterForm = () => {
  const { userStore } = useStore();
  const initValues: UserFormValues = {
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: "",
  };

  if (userStore.isLoggedIn) return <Redirect to={"/todos"} />;

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <h1 className="text-center mb- mb-5">
        <span className="text-primary">R</span>egister
      </h1>
      {userStore.error && <Alert variant="danger">{userStore.error}</Alert>}
      <Formik
        initialValues={initValues}
        onSubmit={(values, { resetForm }) => {
          userStore.register({
            email: values.email,
            username: values.username,
            firstName: values.firstName,
            lastName: values.lastName,
            password: values.password,
          });
          resetForm({
            values: {
              ...values,
              email: "",
              password: "",
              passwordConfirm: "",
            },
          });
        }}
        validationSchema={yup.object({
          email: yup.string().email().required(),
          username: yup.string().required(),
          firstName: yup.string(),
          lastName: yup.string(),
          password: yup.string().min(6).required(),
          passwordConfirm: yup
            .string()
            .oneOf([yup.ref("password"), null])
            .required(),
        })}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isSubmitting,
          errors,
          isValid,
          dirty,
        }) => (
          <Form
            style={{ maxWidth: "500px" }}
            className="card w-100 p-3"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="card-body">
              <Form.Group className="required">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  placeholder="Enter email"
                  onChange={handleChange}
                  isValid={touched.email && !errors.email}
                  isInvalid={!!errors.email}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              {console.log(userStore.loading)}
              <Form.Group className="required">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={values.username}
                  placeholder="Enter username"
                  onChange={handleChange}
                  isValid={touched.username && !errors.username}
                  isInvalid={!!errors.username}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={values.firstName!}
                  placeholder="Enter first name"
                  onChange={handleChange}
                  isValid={touched.firstName && !errors.firstName}
                  isInvalid={!!errors.firstName}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={values.lastName!}
                  placeholder="Enter last name"
                  onChange={handleChange}
                  isValid={touched.lastName && !errors.lastName}
                  isInvalid={!!errors.lastName}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="required">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  placeholder="Password"
                  onChange={handleChange}
                  isValid={touched.password && !errors.password}
                  isInvalid={!!errors.password}
                  autoComplete="on"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="required">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="passwordConfirm"
                  value={values.passwordConfirm!}
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  isValid={touched.passwordConfirm && !errors.passwordConfirm}
                  isInvalid={!!errors.passwordConfirm}
                  autoComplete="on"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.passwordConfirm}
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                className="d-block mt-4 ml-auto mr-auto w-100 "
                variant="primary"
                type="submit"
                disabled={!isValid || !dirty || isSubmitting}
              >
                {userStore.loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Loading...</span>
                  </>
                ) : (
                  <span>Submit</span>
                )}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default observer(RegisterForm);
