
import { ClientRepository } from '../domain/ClientRepository';
import { Client } from '../domain/Client';

export const updateClient = (clientRepository: ClientRepository) => async (dni: string, clientData: Client): Promise<Client> => {
  return await clientRepository.update(dni, clientData);
};