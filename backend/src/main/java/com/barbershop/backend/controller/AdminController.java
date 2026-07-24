package com.barbershop.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barbershop.backend.model.Appointment;
import com.barbershop.backend.model.Master;
import com.barbershop.backend.model.Service;
import com.barbershop.backend.repository.AppointmentRepository;
import com.barbershop.backend.repository.MasterRepository;
import com.barbershop.backend.repository.ServiceRepository;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final AppointmentRepository appointmentRepo;
    private final MasterRepository masterRepo;
    private final ServiceRepository serviceRepo;

    // Costruttore per l'iniezione delle dipendenze (risolve il warning)
    public AdminController(AppointmentRepository appointmentRepo, MasterRepository masterRepo, ServiceRepository serviceRepo) {
        this.appointmentRepo = appointmentRepo;
        this.masterRepo = masterRepo;
        this.serviceRepo = serviceRepo;
    }

    // --- APPUNTAMENTI ---
    @GetMapping("/appointments")
    public List<Appointment> getApps() { return appointmentRepo.findAll(); }

    @DeleteMapping("/appointments/{id}")
    public void deleteApp(@PathVariable Long id) { appointmentRepo.deleteById(id); }

    // --- STAFF (MASTERS) ---
    @GetMapping("/barbers")
    public List<Master> getBarbers() { return masterRepo.findAll(); }

    @PostMapping("/barbers")
    public Master saveBarber(@RequestBody Master master) { 
        return masterRepo.save(master); 
    }

    @DeleteMapping("/barbers/{id}")
    public void deleteBarber(@PathVariable Long id) { masterRepo.deleteById(id); }

    // --- SERVIZI (LISTINO) ---
    @GetMapping("/services")
    public List<Service> getServices() { return serviceRepo.findAll(); }

    @PostMapping("/services")
    public ResponseEntity<Service> saveService(@RequestBody Service service) {
        Service saved = serviceRepo.save(service);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/services/{id}")
    public void deleteService(@PathVariable Long id) { serviceRepo.deleteById(id); }
}