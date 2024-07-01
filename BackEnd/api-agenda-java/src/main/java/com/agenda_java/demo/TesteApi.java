package com.agenda_java.demo;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import models.Agenda;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class TesteApi {

	@Autowired
	TestRestTemplate restTemplate;
	
	@Test
	void testaCrudAgendas() {
		Agenda novaAgenda = new Agenda();
		novaAgenda.setId(1);
	    novaAgenda.setUsuarioId(1);
	    novaAgenda.setNome("Agenda Teste");
	    novaAgenda.setAtivo(true);
	    
	    ResponseEntity<String> postResponse = restTemplate.postForEntity("/agendas", novaAgenda, String.class);
        assertEquals(HttpStatus.OK, postResponse.getStatusCode());
		
		ResponseEntity<List<Agenda>> getResponse = restTemplate.exchange(
                "/agendas",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Agenda>>() {}
        );
        assertEquals(HttpStatus.OK, getResponse.getStatusCode());
        assertFalse(getResponse.getBody().isEmpty());
        
        novaAgenda.setNome("Nova agenda");
        HttpEntity<Agenda> request = new HttpEntity<>(novaAgenda);
        ResponseEntity<String> putResponse = restTemplate.exchange("/agendas", HttpMethod.PUT, request, String.class);
        assertEquals(HttpStatus.OK, putResponse.getStatusCode());
        
        restTemplate.delete("/agendas?id=1");
        
        ResponseEntity<Agenda> deleteResponse = restTemplate.getForEntity("/agendas/id?id=1", Agenda.class);
        assertEquals(HttpStatus.NOT_FOUND, deleteResponse.getStatusCode());
	}
}
