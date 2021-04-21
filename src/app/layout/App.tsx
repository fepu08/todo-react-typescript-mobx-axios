import React, { Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import LoginForm from "../../features/users/LoginForm";
import RegisterForm from "../../features/users/RegisterForm";
import NavBar from "./NavBar";
import "../../style/App.css";
import TodoDashboard from "../../features/todos/dashboard/TodoDashboard";
import { useStore } from "../stores/store";

function App() {
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore
        .getUserFromToken(commonStore.token)
        .finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  //if (!commonStore.appLoaded) return <LoadingComponent />;

  return (
    <Fragment>
      <NavBar />
      <Container fluid>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/register" component={RegisterForm} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/todos" component={TodoDashboard} />
        </Switch>
      </Container>
    </Fragment>
  );
}

export default App;
