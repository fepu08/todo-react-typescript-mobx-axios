export interface Todo {
  id: number;
  userId: number;
  title: string;
  created_at?: Date | string;
  done?: boolean;
}

export class Todo implements Todo {
  constructor(init?: TodoFormValues) {
    Object.assign(this, init);
  }
}
export class TodoFormValues {
  id?: number = undefined;
  userId: number = -1;
  title: string = "";
  created_at?: string | Date = new Date();
  done?: boolean = false;

  constructor(todo?: TodoFormValues) {
    if (todo) {
      this.id = todo.id;
      this.userId = todo.userId;
      this.title = todo.title;
      this.created_at = new Date();
      this.done = todo.done;
    }
  }
}
