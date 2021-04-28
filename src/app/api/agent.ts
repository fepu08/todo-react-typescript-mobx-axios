import axios, { AxiosError, AxiosResponse } from "axios";
import { history } from "../..";
import { User, UserFormValues } from "../models/user";
import { Todo, TodoFormValues } from "../models/todo";
import { store } from "../stores/store";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

// We send the token w every request if we have the token
axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    // set sleep for testing
    await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
      case 400:
        if (typeof data === "string") {
          //TODO: set alert here
        }
        // TODO: id not found
        if (config.method === "get" && false) {
          history.push("/not-found");
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        }
        break;
      case 401:
        //TODO: set alert here
        console.log("unauthorized");
        break;
      case 404:
        history.push("/not-found");
        break;
      case 500:
        store.commonStore.setServerError(data);
        history.push("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  getById: <T>(url: string, id: number) =>
    axios.get<T>(url + "/" + id).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Account = {
  current: (id: number) => requests.getById<User>("/users", id),
  login: (user: UserFormValues) => requests.post<User>("/login", user),
  register: (user: UserFormValues) => requests.post<User>("/register", user),
};

const Todos = {
  get: () => requests.get<Todo[]>("/todos"),
  getById: (id: number) => requests.getById<Todo>("/todos", id),
  create: (todo: TodoFormValues) => requests.post("/todos", todo),
  edit: (todo: Todo) => requests.put<Todo>(`/todos/${todo.id}`, todo),
  delete: (id: number) => requests.delete<Todo>(`/todos/${id}`),
};

const agent = {
  Account,
  Todos,
};

export default agent;
