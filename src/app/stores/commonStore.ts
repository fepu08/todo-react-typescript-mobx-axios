import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";
import jwt_decode from "jwt-decode";
import { Token } from "../models/token";
import { store } from "./store";
export default class CommonStore {
  error: ServerError | null = null;
  token: string | null = window.localStorage.getItem("jwt");
  appLoaded = false;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem("jwt", token);
          store.userStore.setUserWithToken(token);
        } else {
          window.localStorage.removeItem("jwt");
        }
      }
    );
  }

  setServerError = (error: ServerError) => {
    this.error = error;
  };

  setToken = (token: string | null) => {
    this.token = token;
  };

  setAppLoaded = () => {
    this.appLoaded = true;
  };

  isTokenExpired = (token: string) => {
    let isExpired = false;
    const decodedToken = jwt_decode(token) as Token;
    const dateNow = new Date();

    if (decodedToken.exp < dateNow.getTime()) isExpired = true;

    return isExpired;
  };
}
