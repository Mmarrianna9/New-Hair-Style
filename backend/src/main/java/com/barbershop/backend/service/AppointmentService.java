
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

    // Metodo per la lista (che mancava)
    public List<Appointment> findAll() {
        return appointmentRepository.findAll();
    }

    // Metodo per il salvataggio con controllo sovrapposizione
    public Appointment save(Appointment appointment) {
        boolean isOccupied = appointmentRepository.existsOverlappingAppointment(
            appointment.getBarber().getId(), 
            appointment.getStartTime(), 
            appointment.getEndTime()
        );

        if (isOccupied) {
            throw new RuntimeException("Il barbiere è già occupato in questo orario!");
        }

        return appointmentRepository.save(appointment);
    }
}