package com.barbershop.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. Disabilitiamo CSRF per le chiamate API REST (standard con React)
            .csrf(AbstractHttpConfigurer::disable)
            
            // 2. Configurazione dei permessi
            .authorizeHttpRequests(auth -> auth
                // Permettiamo l'accesso a tutte le tue rotte /api/barbers e /api/services
                .requestMatchers("/api/**").permitAll() 
                // Qualsiasi altra richiesta richiede autenticazione (o puoi mettere permitAll se sei in pieno sviluppo)
                .anyRequest().authenticated()
            );

        return http.build();
    }
}
