import { UserRepository } from '../domain/UserRepository';
import { User } from '../domain/User';

export const updateUser = 
(userRepository: UserRepository) => 
  async (userData: Partial<User> & { id: number }): Promise<void> => {
  return await userRepository.update(userData);
};