import { User } from './User';

export interface UserRepository {
  getAll: () => Promise<User[]>;
  create: (userData: Omit<User, 'id'>) => Promise<User>;
  update: (userData: Partial<User>) => Promise<void>;
  login: (credentials: { userName: string; userPassword: string }) => Promise<User>;
}
