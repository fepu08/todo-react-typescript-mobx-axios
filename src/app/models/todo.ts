export interface Todo {
  id: string;
  user_id: string;
  title: string;
  created_at: Date | string;
  done: boolean;
}
