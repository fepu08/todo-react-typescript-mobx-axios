import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import TodoStore from "./todoStore";
import UserStore from "./userStore";

interface Store {
  commonStore: CommonStore;
  userStore: UserStore;
  todoStore: TodoStore;
}

export const store: Store = {
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  todoStore: new TodoStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
