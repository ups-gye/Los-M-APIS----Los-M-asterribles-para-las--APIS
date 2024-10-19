import { UserRepository } from '../domain/UserRepository';
import { User } from '../domain/User';

export const loginUser = (userRepository: UserRepository) => async (credentials: { userName: string; userPassword: string }): Promise<User> => {
  return await userRepository.login(credentials);
};