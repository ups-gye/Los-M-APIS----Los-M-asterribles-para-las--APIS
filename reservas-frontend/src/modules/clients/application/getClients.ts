import { ClientRepository } from '../domain/ClientRepository';
import { Client } from '../domain/Client';

export const getClients = (clientRepository: ClientRepository) => async (): Promise<Client[]> => {
  return await clientRepository.getAll();
};