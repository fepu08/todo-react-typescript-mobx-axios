export interface Todo {
  id: string;
  user_id: string;
  title: string;
  description: string;
  created_at: Date | string;
  done: boolean;
}
