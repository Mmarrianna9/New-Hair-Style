package com.barbershop.backend.config;

import com.barbershop.backend.model.Barber;
import com.barbershop.backend.model.BarberService;
import com.barbershop.backend.model.ServiceCategory;
import com.barbershop.backend.repository.BarberRepository;
import com.barbershop.backend.repository.BarberServiceRepository; // Assicurati di aver creato questo
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(BarberRepository barberRepository, 
                                   BarberServiceRepository serviceRepository) {
        return args -> {
            // 1. Inizializzazione Barbieri
            if (barberRepository.count() == 0) {
                List<String> nomiBarbieri = Arrays.asList("Monica", "Dany", "Rebecca", "Alice", "Marco");
                nomiBarbieri.forEach(nome -> {
                    Barber barber = new Barber();
                    barber.setName(nome);
                    barberRepository.save(barber);
                });
                System.out.println(">> Database: 5 Barbieri aggiunti.");
            }

            // 2. Inizializzazione Servizi (Trattamenti)
            if (serviceRepository.count() == 0) {
                // Utilizzo il costruttore @AllArgsConstructor di Lombok che hai nell'Entity
                serviceRepository.save(new BarberService(null, "Taglio Uomo", "Taglio classico o sfumato", 25.0, 30, ServiceCategory.UOMO));
                serviceRepository.save(new BarberService(null, "Barba", "Regolazione e panno caldo", 15.0, 20, ServiceCategory.UOMO));
                serviceRepository.save(new BarberService(null, "Colore Donna", "Trattamento colore professionale", 50.0, 90, ServiceCategory.DONNA));
                serviceRepository.save(new BarberService(null, "Taglio Bimbo", "Sotto i 12 anni", 18.0, 25, ServiceCategory.BAMBINO));

                System.out.println(">> Database: Servizi di base aggiunti.");
            }
        };
    }
}