export interface Todo {
  id: string;
  user_id: string;
  title: string;
  created_at: Date | string;
  done: boolean;
}

export class TodoFormValues {
  id?: string = undefined;
  user_id: string | undefined = undefined;
  title: string = "";
  created_at?: Date | string = new Date();
  done?: boolean = false;

  constructor(todo?: TodoFormValues) {
    if (todo) {
      this.id = todo.id;
      this.user_id = todo.user_id;
      this.title = todo.title;
      this.created_at = todo.created_at;
      this.done = todo.done;
    }
  }
}
