

package com.barbershop.backend.repository;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.barbershop.backend.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    
    // Controlla se il master ha già un appuntamento nello stesso orario
    @Query("SELECT COUNT(a) > 0 FROM Appointment a WHERE a.master.id = :masterId " +
           "AND a.dataOraAppuntamento = :oraAppuntamento AND a.stato = 'CONFERMATO'")
    boolean existsByMasterAndDataOra(@Param("masterId") Long masterId, @Param("oraAppuntamento") LocalDateTime oraAppuntamento);
}
