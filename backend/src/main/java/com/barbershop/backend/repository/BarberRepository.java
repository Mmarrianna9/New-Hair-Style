package com.barbershop.backend.repository;
import com.barbershop.backend.model.Barber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BarberRepository extends JpaRepository<Barber, Long> {
    // Qui puoi aggiungere metodi di ricerca personalizzati in futuro, 
    // ma per ora JpaRepository ti dà già tutto quello che serve (save, findAll, delete, ecc.)


}
