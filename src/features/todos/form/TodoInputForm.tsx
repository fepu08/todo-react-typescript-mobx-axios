import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Col, Form } from "react-bootstrap";
import { TodoFormValues } from "../../../app/models/todo";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";
import { Formik } from "formik";

const TodoInputForm = () => {
  const { userStore, todoStore } = useStore();

  const validationSchema = Yup.object({
    title: Yup.string().required("Can't be empty"),
  });

  const handleFormSubmit = (values: TodoFormValues) => {
    todoStore.addTodo(values);
  };

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        handleFormSubmit(values);
        resetForm();
      }}
      initialValues={
        new TodoFormValues({ title: "", userId: userStore.user.id })
      }
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} sm="10" md="11" controlId="validationFormik01">
              <Form.Control
                type="text"
                name="title"
                placeholder="New task"
                value={values.title}
                onChange={handleChange}
                isValid={touched.title && !errors.title}
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} sm="2" md="1">
              <Button type="submit" variant={"success"} className="btn-block">
                Submit
              </Button>
            </Form.Group>
          </Form.Row>
        </Form>
      )}
    </Formik>
  );
};

export default observer(TodoInputForm);
