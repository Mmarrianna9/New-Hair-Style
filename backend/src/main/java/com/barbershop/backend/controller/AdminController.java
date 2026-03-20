package com.barbershop.backend.controller;

import com.barbershop.backend.model.*;
import com.barbershop.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired private AppointmentRepository appointmentRepo;
    @Autowired private BarberRepository barberRepo;
    @Autowired private BarberServiceRepository barberServiceRepo;

    // --- APPUNTAMENTI ---
    @GetMapping("/appointments")
    public List<Appointment> getApps() { return appointmentRepo.findAll(); }

    @DeleteMapping("/appointments/{id}")
    public void deleteApp(@PathVariable Long id) { appointmentRepo.deleteById(id); }

    // --- STAFF (BARBIERI) ---
    @GetMapping("/barbers")
    public List<Barber> getBarbers() { return barberRepo.findAll(); }

    @PostMapping("/barbers")
    public Barber saveBarber(@RequestBody Barber barber) { 
        return barberRepo.save(barber); 
    }

    @DeleteMapping("/barbers/{id}")
    public void deleteBarber(@PathVariable Long id) { barberRepo.deleteById(id); }

    // --- SERVIZI (LISTINO) ---
    @GetMapping("/services")
    public List<BarberService> getServices() { return barberServiceRepo.findAll(); }

    @PostMapping("/services")
    public ResponseEntity<BarberService> saveService(@RequestBody BarberService service) {
        // Spring Boot mapperà automaticamente durationMinutes e category (Enum)
        BarberService saved = barberServiceRepo.save(service);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/services/{id}")
    public void deleteService(@PathVariable Long id) { barberServiceRepo.deleteById(id); }
}