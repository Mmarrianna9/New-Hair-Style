package com.barbershop.backend.controller;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barbershop.backend.model.BarberService;
import com.barbershop.backend.model.ServiceCategory;
import com.barbershop.backend.repository.BarberServiceRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class BarberServiceController {
private final BarberServiceRepository repository;

    @GetMapping
    public List<BarberService> getAllServices() {
        return repository.findAll();
    }

    @GetMapping("/category/{category}")
    public List<BarberService> getByCategory(@PathVariable ServiceCategory category) {
        return repository.findByCategory(category);
    }
}
