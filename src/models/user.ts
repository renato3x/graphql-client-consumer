import { Profile } from './profile';

export interface User {
  id?: number | string;
  name?: string;
  email?: string;
  profiles?: Profile[];
  password?: string;
  token?: string;
}