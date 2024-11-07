import { usersApi } from '../../../interceptors/users'
import { User } from '../domain/User'
import { UserRepository } from '../domain/UserRepository';

//url viene por defecto de usersApi
const BASE_URL = ''

//const API_BASE_URL = 'http://185.209.230.19:8081';

export class ApiUserRepository implements UserRepository {
  async getAll(): Promise<User[]> {
    const response = await usersApi.get<User[]>(`${BASE_URL}`);
    return response.data;
  }

  async create(userData: Omit<User, 'id'>): Promise<User> {
    const response = await usersApi.post<User>(`${BASE_URL}`, userData);
    return response.data;
  }

  async update(userData: Partial<User>): Promise<void> {
    await usersApi.patch(`${BASE_URL}`, userData);
  }

  async login(credentials: { userName: string; userPassword: string }): Promise<User> {
    const response = await usersApi.post<User>(`${BASE_URL}/login`, credentials);
    return response.data;
  }
}