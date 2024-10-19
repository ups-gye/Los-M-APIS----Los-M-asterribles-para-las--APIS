import { UserRepository } from '../domain/UserRepository';
import { User } from '../domain/User';

export const getUsers = (userRepository: UserRepository) => async (): Promise<User[]> => {
  return await userRepository.getAll();
};
