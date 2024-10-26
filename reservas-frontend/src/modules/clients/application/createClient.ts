
import { ClientRepository } from '../domain/ClientRepository';
import { Client } from '../domain/Client';

export const createClient = (clientRepository: ClientRepository) => async (clientData: Client): Promise<Client> => {
  return await clientRepository.create(clientData);
};