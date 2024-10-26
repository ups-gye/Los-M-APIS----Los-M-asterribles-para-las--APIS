import { clientsApi } from '../../../interceptors/clients'
import { Client } from '../domain/Client';
import { ClientRepository } from '../domain/ClientRepository';

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL_CLIENT}/v1/client`;

export class ApiClientRepository implements ClientRepository {
  async getAll(): Promise<Client[]> {
    const response = await clientsApi.get<Client[]>(`${BASE_URL}/getAll`);
    return response.data;
  }

  async getByDni(dni: string): Promise<Client> {
    const response = await clientsApi.get<Client>(`${BASE_URL}/getByDni`, {
      params: { dni }
    });
    return response.data;
  }

  async create(clientData: Client): Promise<Client> {
    const response = await clientsApi.post<Client>(`${BASE_URL}/createClient`, clientData);
    return response.data;
  }

  async update(dni: string, clientData: Client): Promise<Client> {
    const response = await clientsApi.put<Client>(`${BASE_URL}/updateClient`, clientData, {
      params: { dni }
    });
    return response.data;
  }

  async delete(dni: string): Promise<void> {
    await clientsApi.delete(`${BASE_URL}/deleteClient`, {
      params: { dni }
    });
  }
}