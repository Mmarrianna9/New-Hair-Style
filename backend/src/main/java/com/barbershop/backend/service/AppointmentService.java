package com.barbershop.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.barbershop.backend.model.Appointment;
import com.barbershop.backend.repository.AppointmentRepository;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    // Metodo per la lista degli appuntamenti
    public List<Appointment> findAll() {
        return appointmentRepository.findAll();
    }

    // Metodo per il salvataggio con controllo sovrapposizione/orario
    public Appointment save(Appointment appointment) {
        boolean isOccupied = appointmentRepository.existsByMasterAndDataOra(
            appointment.getMaster().getId(), 
            appointment.getDataOraAppuntamento()
        );

        if (isOccupied) {
            throw new RuntimeException("Il master è già occupato in questo orario!");
        }

        return appointmentRepository.save(appointment);
    }
}