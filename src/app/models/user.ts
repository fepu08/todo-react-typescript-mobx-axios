export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  firstName?: string | null;
  lastName?: string | null;
  age?: number | null;
  accessToken?: string;
}

export interface UserFormValues {
  email: string;
  username?: string;
  password: string;
  passwordConfirm?: string;
  firstName?: string | null;
  lastName?: string | null;
  age?: number | null;
}
