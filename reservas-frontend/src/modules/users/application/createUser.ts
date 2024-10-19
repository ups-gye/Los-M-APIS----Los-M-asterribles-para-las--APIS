import { UserRepository } from '../domain/UserRepository';
import { User } from '../domain/User';

export const createUser = (userRepository: UserRepository) => async (userData: Omit<User, 'id'>): Promise<User> => {
  return await userRepository.create(userData);
};
