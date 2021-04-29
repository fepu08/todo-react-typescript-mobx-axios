import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";
import jwt from "jwt-decode";
import { Token } from "../models/token";

export default class UserStore {
  user: User | null = null;
  error: string | null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: UserFormValues) => {
    this.loading = true;
    try {
      const res = await agent.Account.login(creds);
      store.commonStore.setToken(res.accessToken!);
      const user = await this.getUserFromToken(res.accessToken!);
      runInAction(() => {
        this.user = user;
        this.loading = false;
        this.error = null;
      });
      history.push("/todos");
    } catch (err) {
      this.loading = false;
      this.error = err.response.data;
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem("jwt");
    this.user = null;
    history.push("/");
  };

  register = async (creds: UserFormValues) => {
    this.loading = true;
    try {
      const res = await agent.Account.register(creds);
      runInAction(() => {
        const token = res.accessToken;
        store.commonStore.setToken(token!);
        this.error = null;
        this.loading = false;
      });
    } catch (err) {
      this.loading = false;
      this.error = err.response.data;
    }
  };

  getUser = async () => {
    if (store.commonStore.token)
      try {
        return await this.getUserFromToken(store.commonStore.token);
      } catch (err) {
        throw err;
      }
    else return null;
  };

  getUserFromToken = async (token: string) => {
    const decodedToken: Token = jwt(token!);
    const userId = decodedToken.sub;
    try {
      const user = await agent.Account.current(parseInt(userId));
      return user;
    } catch (err) {
      throw err;
    }
  };

  setUserWithToken = async (token: string) => {
    try {
      const user = await this.getUserFromToken(token);
      runInAction(() => (this.user = user));
    } catch (err) {
      throw err;
    }
  };
}
