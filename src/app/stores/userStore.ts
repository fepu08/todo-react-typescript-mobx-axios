import { makeAutoObservable, reaction, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";
import jwt from "jwt-decode";
import { Token } from "../models/token";

export default class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
    reaction(
      () => this.user,
      () => {
        if (this.user) store.todoStore.loadTodos(this.user.id);
        else store.todoStore.setTodos();
      }
    );
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: UserFormValues) => {
    try {
      const res = await agent.Account.login(creds);
      store.commonStore.setToken(res.accessToken!);
      const user = await this.getUserFromToken(res.accessToken!);
      runInAction(() => (this.user = user));
      history.push("/todos");
    } catch (err) {
      throw err;
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem("jwt");
    this.user = null;
    history.push("/");
  };

  register = async (creds: UserFormValues) => {
    try {
      const res = await agent.Account.register(creds);
      const token = res.accessToken;
      const user = await this.getUserFromToken(token!);
      store.commonStore.setToken(token!);
      runInAction(() => (this.user = user));
      history.push("/todos");
    } catch (err) {
      throw err;
    }
  };

  getUserFromToken = async (token: string) => {
    const decodedToken: Token = jwt(token!);
    const userId = decodedToken.sub;
    try {
      const user = await agent.Account.current(userId);
      return user;
    } catch (err) {
      throw err;
    }
  };

  setUserWithToken = async (token: string) => {
    try {
      const user = await this.getUserFromToken(token);
      runInAction(() => (user ? (this.user = user) : (this.user = null)));
    } catch (err) {
      throw err;
    }
  };
}
