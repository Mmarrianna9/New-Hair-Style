package com.barbershop.backend.config;

import com.barbershop.backend.model.Barber;
import com.barbershop.backend.model.BarberService;
import com.barbershop.backend.model.ServiceCategory;
import com.barbershop.backend.repository.BarberRepository;
import com.barbershop.backend.repository.BarberServiceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(BarberRepository barberRepository, 
                                   BarberServiceRepository serviceRepository) {
        return args -> {
            // 1. CREAZIONE SERVIZI (Se la tabella è vuota)
            if (serviceRepository.count() == 0) {
                List<BarberService> services = Arrays.asList(
                    // Generali
                    new BarberService(null, "Shampoo Relax", "Lavaggio con massaggio cutaneo", 10.0, 15, ServiceCategory.UOMO),
                    new BarberService(null, "Taglio Uomo", "Taglio classico o sfumatura moderna", 25.0, 30, ServiceCategory.UOMO),
                    new BarberService(null, "Taglio Donna", "Taglio e piega base", 35.0, 45, ServiceCategory.DONNA),
                    new BarberService(null, "Taglio Bimbo", "Taglio veloce per i più piccoli", 18.0, 25, ServiceCategory.BAMBINO),
                    
                    // Specialistici
                    new BarberService(null, "Barba Luxury", "Modellatura con panno caldo e olio", 15.0, 20, ServiceCategory.UOMO),
                    new BarberService(null, "Colore Permanente", "Colorazione professionale", 45.0, 60, ServiceCategory.COLORE),
                    new BarberService(null, "Meches / Shatush", "Schiariture personalizzate", 60.0, 90, ServiceCategory.COLORE),
                    new BarberService(null, "Trattamento Cheratina", "Effetto liscio e anti-crespo", 120.0, 150, ServiceCategory.TRATTAMENTO, null)
                );
                serviceRepository.saveAll(services);
                System.out.println(">> Database: Servizi caricati.");
            }

            // 2. CREAZIONE BARBIERI E ASSEGNAZIONE SERVIZI
            if (barberRepository.count() == 0) {
                // Recuperiamo tutti i servizi dal DB per associarli
                List<BarberService> allServices = serviceRepository.findAll();
                
                // Mappa rapida per filtrare i servizi per nome
                Map<String, BarberService> s = allServices.stream()
                    .collect(Collectors.toMap(BarberService::getName, service -> service));

                // Definiamo i 5 Barbieri con le loro specializzazioni
                createBarber(barberRepository, "Monica", new HashSet<>(Arrays.asList(
                    s.get("Shampoo Relax"), s.get("Taglio Uomo"), s.get("Taglio Donna"), s.get("Taglio Bimbo"), 
                    s.get("Colore Permanente"), s.get("Meches / Shatush"), s.get("Trattamento Cheratina")
                )));

                createBarber(barberRepository, "Dany", new HashSet<>(Arrays.asList(
                    s.get("Shampoo Relax"), s.get("Taglio Uomo"), s.get("Taglio Bimbo"), s.get("Barba Luxury")
                )));

                createBarber(barberRepository, "Rebecca", new HashSet<>(Arrays.asList(
                    s.get("Shampoo Relax"), s.get("Taglio Uomo"), s.get("Taglio Donna"), s.get("Taglio Bimbo"), s.get("Colore Permanente")
                )));

                createBarber(barberRepository, "Alice", new HashSet<>(Arrays.asList(
                    s.get("Shampoo Relax"), s.get("Taglio Uomo"), s.get("Taglio Donna"), s.get("Taglio Bimbo")
                )));

                createBarber(barberRepository, "Marco", new HashSet<>(Arrays.asList(
                    s.get("Shampoo Relax"), s.get("Taglio Uomo"), s.get("Barba Luxury")
                )));

                System.out.println(">> Database: 5 Barbieri configurati con specializzazioni.");
            }
        };
    }

    // Metodo helper per salvare il barbiere con i suoi servizi
    private void createBarber(BarberRepository repo, String name, HashSet<BarberService> services) {
        Barber b = new Barber();
        b.setName(name);
        b.setServices(services);
        repo.save(b);
    }
}