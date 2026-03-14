package com.barbershop.backend.controller;

import com.barbershop.backend.model.Barber;
import com.barbershop.backend.repository.BarberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/barbers")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class BarberController {

    private final BarberRepository repository;


    @GetMapping
    public List<Barber> getAllBarbers() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Barber> getBarberById(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}