package com.barbershop.backend.repository;
import com.barbershop.backend.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    
    // Metodo utile per cercare tutti i turni di uno specifico master tramite il suo ID
    List<Schedule> findByMasterId(Long masterId);

}
