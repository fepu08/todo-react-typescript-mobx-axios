import React from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { Route, RouteProps } from "react-router-dom";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite"

interface Props extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}

const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  const {
    userStore: { isLoggedIn },
    commonStore: { isTokenExpired },
  } = useStore();
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn || !isTokenExpired ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default observer(PrivateRoute);
