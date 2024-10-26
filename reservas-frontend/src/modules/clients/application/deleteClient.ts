import { ClientRepository } from '../domain/ClientRepository';

export const deleteClient = (clientRepository: ClientRepository) => async (dni: string): Promise<void> => {
  return await clientRepository.delete(dni);
};