package com.barbershop.backend.repository;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.barbershop.backend.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    
    // Controlla se il barbiere ha già impegni tra startTime e endTime
    @Query("SELECT COUNT(a) > 0 FROM Appointment a WHERE a.barber.id = :barberId " +
           "AND (:start < a.endTime AND :end > a.startTime)")
    boolean existsOverlappingAppointment(Long barberId, LocalDateTime start, LocalDateTime end);
}


