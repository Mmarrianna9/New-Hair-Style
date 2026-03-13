package com.barbershop.backend.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/barbers")
// Permette al tuo frontend React (su porta 5173) di comunicare con il backend
@CrossOrigin(origins = "http://localhost:5173") 
public class BarberController {

    // Esempio di dati fittizi (Mock Data)
    // In futuro, qui inietterai il BarberService per leggere dal database
    @GetMapping
    public List<String> getAllBarbers() {
        return Arrays.asList("Marco il Barbiere", "Alessandro", "Luca", "Giovanni");
    }

    // Esempio per ottenere un singolo barbiere tramite ID
    @GetMapping("/{id}")
    public String getBarberById(@PathVariable Long id) {
        return "Barbiere con ID: " + id;
    }

}
