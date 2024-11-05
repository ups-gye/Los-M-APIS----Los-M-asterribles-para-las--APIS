package com.client.rest.clientrest.service;

import com.client.rest.clientrest.model.ClientDto;

import java.util.List;

public interface ClientService {

    public ClientDto createClient(ClientDto clientDto);

    public ClientDto updateClient(String dni, ClientDto clientDto);

    public void deleteClient(String clientId);

    public List<ClientDto> getAllClients();

    public ClientDto getClientDni(String dni);

}
