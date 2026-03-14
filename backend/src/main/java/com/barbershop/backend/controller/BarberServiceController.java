package com.barbershop.backend.controller;

import com.barbershop.backend.model.BarberService;
import com.barbershop.backend.model.ServiceCategory;
import com.barbershop.backend.repository.BarberServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // Per React/Vite
public class BarberServiceController {

    private final BarberServiceRepository repository;

    // Recupera tutti i servizi (es: per la listona prezzi)
    @GetMapping
    public List<BarberService> getAllServices() {
        return repository.findAll();
    }

    // Recupera servizi per categoria (es: solo UOMO o solo COLORE)
    @GetMapping("/category/{category}")
    public List<BarberService> getByCategory(@PathVariable ServiceCategory category) {
        return repository.findByCategory(category);
    }

    // Recupera un singolo servizio per ID (utile per i dettagli)
    @GetMapping("/{id}")
    public ResponseEntity<BarberService> getServiceById(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}