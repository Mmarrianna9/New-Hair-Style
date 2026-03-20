
package com.barbershop.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. Disabilita CSRF (fondamentale per far funzionare i POST/DELETE da React)
            .csrf(AbstractHttpConfigurer::disable)
            
            // 2. Abilita e configura i CORS direttamente qui
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            
            // 3. Configurazione dei permessi
            .authorizeHttpRequests(auth -> auth
                // Permettiamo TUTTO quello che inizia con /api/
                .requestMatchers("/api/**").permitAll() 
                // Per ora, permettiamo tutto il resto per evitare il 403
                .anyRequest().permitAll() 
            );

        return http.build();
    }

    // Configurazione specifica per i CORS
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173")); // Il tuo frontend Vite/React
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}