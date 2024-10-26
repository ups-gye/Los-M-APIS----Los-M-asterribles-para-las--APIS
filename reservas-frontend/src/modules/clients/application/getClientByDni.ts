
import { ClientRepository } from '../domain/ClientRepository';
import { Client } from '../domain/Client';

export const getClientByDni = (clientRepository: ClientRepository) => async (dni: string): Promise<Client> => {
  return await clientRepository.getByDni(dni);
};