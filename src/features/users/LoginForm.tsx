import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Form, Spinner, Alert } from "react-bootstrap";
import { UserFormValues } from "../../app/models/user";
import { Redirect } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { Formik } from "formik";
import * as yup from "yup";

const LoginForm = () => {
  const { userStore } = useStore();

  const initialValues: UserFormValues = {
    email: "",
    password: "",
  };

  useEffect(() => {}, [userStore.loading, userStore.error]);

  if (userStore.isLoggedIn) return <Redirect to={"/todos"} />;

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <h1 className="text-center mb- mb-5">
        <span className="text-primary">L</span>og&nbsp;
        <span className="text-primary">I</span>n
      </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          userStore.login(values);
          resetForm({
            values: {
              email: values.email,
              password: "",
            },
          });
        }}
        validationSchema={yup.object({
          email: yup.string().email().required(),
          password: yup.string().required(),
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
              {userStore.error && (
                <Alert variant="danger">{userStore.error}</Alert>
              )}
              <Form.Group controlId="formBasicEmail">
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

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  placeholder="Password"
                  onChange={handleChange}
                  autoComplete="on"
                  isValid={touched.email && !errors.password}
                  isInvalid={!!errors.password}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
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
                  <>Submit</>
                )}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default observer(LoginForm);
