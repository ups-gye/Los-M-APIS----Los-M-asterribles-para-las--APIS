package com.client.rest.clientrest.service;

import com.client.rest.clientrest.model.Client;
import com.client.rest.clientrest.model.ClientDto;
import com.client.rest.clientrest.respository.ClientRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ClientServiceImpl implements ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Override
    public ClientDto createClient(ClientDto clientDto) {
        Client client = new Client();
        client.setDni(clientDto.getDni());
        client.setName(clientDto.getName());
        client.setLastName(clientDto.getLastName());
        client.setEmail(clientDto.getEmail());
        client.setBirthDate(clientDto.getBirthDate());
        client.setGender(clientDto.getGender());
        clientRepository.save(client);
        return convertToDto(client);
    }

    @Override
    public ClientDto updateClient(String dni, ClientDto clientDto) {
        if (clientRepository.existsById(dni)) {
            Client client = new Client();
            BeanUtils.copyProperties(clientDto, client);
            client.setDni(dni);
            client = clientRepository.save(client);
            BeanUtils.copyProperties(clientDto, clientDto);
            return clientDto;
        }
        return null;
    }

    @Override
    public void deleteClient(String clientId) {
        clientRepository.deleteById(clientId);
    }

    @Override
    public List<ClientDto> getAllClients() {
        List<Client> client = clientRepository.findAll();
        List<ClientDto> clientDtos = new ArrayList<>();
        for (Client c : client) {
            clientDtos.add(convertToDto(c));
        }
        return clientDtos;
    }

    @Override
    public ClientDto getClientDni(String dni) {


        Optional<Client> client = clientRepository.findById(dni);
        if (client.isPresent()) {
            ClientDto clientDto = new ClientDto();
            BeanUtils.copyProperties(client.get(), clientDto);
            return clientDto;
        } else {
            throw new RuntimeException("Error: Client with DNI " + dni + " not found.");
        }

    }


    public ClientDto convertToDto(Client client) {
        ClientDto clientDto = new ClientDto();
        clientDto.setDni(client.getDni());
        clientDto.setName(client.getName());
        clientDto.setLastName(client.getLastName());
        clientDto.setEmail(client.getEmail());
        clientDto.setBirthDate(client.getBirthDate());
        clientDto.setGender(client.getGender());
        return clientDto;
    }
}
