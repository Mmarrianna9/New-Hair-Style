package com.barbershop.backend.controller;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barbershop.backend.model.User;
import com.barbershop.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Permette le chiamate dal frontend React

public class AuthController {
    @Autowired
    private UserRepository userRepository;

    // REGISTRAZIONE
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User newUser) {
        // Controllo validazione: almeno email o telefono devono essere presenti
        if ((newUser.getEmail() == null || newUser.getEmail().trim().isEmpty()) && 
            (newUser.getTelefono() == null || newUser.getTelefono().trim().isEmpty())) {
            return ResponseEntity.badRequest().body("Errore: Devi inserire almeno un'email o un numero di telefono.");
        }

        // Controllo se l'email è già in uso (se inserita)
        if (newUser.getEmail() != null && !newUser.getEmail().trim().isEmpty()) {
            Optional<User> existingEmail = userRepository.findByEmail(newUser.getEmail());
            if (existingEmail.isPresent()) {
                return ResponseEntity.badRequest().body("Errore: Questa email è già registrata.");
            }
        }

        // Impostiamo il ruolo di default a CLIENTE
        newUser.setRuolo(User.Ruolo.CLIENTE);
        
        // NOTA: In un'applicazione reale, qui andrebbe criptata la password con BCryptPasswordEncoder
        // Es: newUser.setPasswordHash(passwordEncoder.encode(newUser.getPasswordHash()));

        User savedUser = userRepository.save(newUser);
        return ResponseEntity.ok(savedUser);
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
        // Il campo "email" nel payload del form di login viene usato come identificativo (email, telefono o nome)
        String identifier = loginRequest.getEmail(); 

        Optional<User> userOpt = userRepository.findByEmailOrTelefonoOrNome(identifier, identifier, identifier);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Verifica della password (controlla se corrisponde al password_hash salvato)
            if (user.getPasswordHash().equals(loginRequest.getPasswordHash())) {
                return ResponseEntity.ok(user);
            }
        }

        return ResponseEntity.status(401).body("Credenziali non valide o utente non trovato.");
    }
}


