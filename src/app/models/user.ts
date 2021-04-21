export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  firstName?: string | null;
  lastName?: string | null;
  age?: number | null;
  token: string;
}

export interface UserFormValues {
  id: string;
  email: string;
  username: string;
  password: string;
  firstName?: string | null;
  lastName?: string | null;
  age?: number | null;
}
