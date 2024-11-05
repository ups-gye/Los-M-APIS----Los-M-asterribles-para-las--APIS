package com.client.rest.clientrest.respository;

import com.client.rest.clientrest.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, String> {
}
