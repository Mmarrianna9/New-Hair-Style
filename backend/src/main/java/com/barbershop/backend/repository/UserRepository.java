package com.barbershop.backend.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.barbershop.backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    
    // Per verificare se esiste già un'email o un telefono
    Optional<User> findByEmail(String email);
    Optional<User> findByTelefono(String telefono);

    // Per il Login: cerca l'utente tramite email oppure telefono oppure nome
    Optional<User> findByEmailOrTelefonoOrNome(String email, String telefono, String nome);
}
