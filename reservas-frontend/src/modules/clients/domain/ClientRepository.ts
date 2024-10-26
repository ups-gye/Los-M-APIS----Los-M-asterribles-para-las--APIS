
import { Client } from './Client';

export interface ClientRepository {
  getAll: () => Promise<Client[]>;
  getByDni: (dni: string) => Promise<Client>;
  create: (clientData: Client) => Promise<Client>;
  update: (dni: string, clientData: Client) => Promise<Client>;
  delete: (dni: string) => Promise<void>;
}