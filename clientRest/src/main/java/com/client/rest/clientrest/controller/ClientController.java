package com.client.rest.clientrest.controller;

import com.client.rest.clientrest.model.ClientDto;
import com.client.rest.clientrest.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/v1/client")

public class ClientController {


    @Autowired
    private ClientService clientService;

    @PostMapping("/createClient")
    public ResponseEntity<ClientDto> addClient(@RequestBody ClientDto clientDto) {
        ClientDto newClient = clientService.createClient(clientDto);
        return new ResponseEntity<>(newClient, HttpStatus.CREATED);
    }


    @GetMapping("/getByDni")
    public ResponseEntity<ClientDto> getClientByDni(@RequestParam String dni) {
        ClientDto client = clientService.getClientDni(dni);
        return new ResponseEntity<>(client, HttpStatus.OK);

    }

    @DeleteMapping("/deleteClient")
    public ResponseEntity<Void> deleteClient(@RequestParam String dni) {
        if (clientService.getClientDni(dni) != null) {
            clientService.deleteClient(dni);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PutMapping("/updateClient")
    public ResponseEntity<ClientDto> updateClient(@RequestParam String dni, @RequestBody ClientDto clientDto) {
        if (!dni.equals(clientDto.getDni())) {
            return ResponseEntity.badRequest().build();
        }
        ClientDto client = clientService.updateClient(dni, clientDto);
        return client == null ? new ResponseEntity<>(HttpStatus.NOT_FOUND) : new ResponseEntity<>(client, HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<ClientDto>> getAllClients() {
        return ResponseEntity.ok(clientService.getAllClients());
    }


}


