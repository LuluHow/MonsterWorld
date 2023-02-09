import { Roles as Role } from './roles';

export interface Monster {
  login?: string;
  password?: string;
  role?: string,
  id?: string,
  friends?: Array<string>
}