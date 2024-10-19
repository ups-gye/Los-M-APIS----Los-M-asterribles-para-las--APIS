import { UserRepository } from '../domain/UserRepository';
import { User } from '../domain/User';

export const updateUser = (userRepository: UserRepository) => async (userData: Partial<User> & { id: number }): Promise<User> => {
  return await userRepository.update(userData);
};