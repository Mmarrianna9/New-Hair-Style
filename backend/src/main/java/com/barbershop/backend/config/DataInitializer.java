package com.barbershop.backend.config;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.barbershop.backend.model.Master;
import com.barbershop.backend.model.Service;
import com.barbershop.backend.repository.MasterRepository;
import com.barbershop.backend.repository.ServiceRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(MasterRepository masterRepository, 
                                   ServiceRepository serviceRepository) {
        return args -> {
            // 1. CREAZIONE SERVIZI (Se la tabella è vuota)
            if (serviceRepository.count() == 0) {
                List<Service> services = Arrays.asList(
                    createService("Shampoo Relax", "Lavaggio con massaggio cutaneo", new BigDecimal("10.00"), 15),
                    createService("Taglio Uomo", "Taglio classico o sfumatura moderna", new BigDecimal("25.00"), 30),
                    createService("Taglio Donna", "Taglio e piega base", new BigDecimal("35.00"), 45),
                    createService("Taglio Bimbo", "Taglio veloce per i più piccoli", new BigDecimal("18.00"), 25),
                    createService("Barba Luxury", "Modellatura con panno caldo e olio", new BigDecimal("15.00"), 20),
                    createService("Colore Permanente", "Colorazione professionale", new BigDecimal("45.00"), 60),
                    createService("Meches / Shatush", "Schiariture personalizzate", new BigDecimal("60.00"), 90),
                    createService("Trattamento Cheratina", "Effetto liscio e anti-crespo", new BigDecimal("120.00"), 150)
                );
                serviceRepository.saveAll(services);
                System.out.println(">> Database: Servizi caricati.");
            }

            // 2. CREAZIONE MASTERS (Se la tabella è vuota)
            if (masterRepository.count() == 0) {
                createMaster(masterRepository, "Monica", "Maestra dello stile contemporaneo e trattamenti.", "/images/barbers/monica.jpg");
                createMaster(masterRepository, "Dany", "Esperto di tagli tradizionali e barba luxury.", "/images/barbers/dany.jpg");
                createMaster(masterRepository, "Rebecca", "Specialista in look di tendenza e sfumature.", "/images/barbers/rebecca.jpg");
                createMaster(masterRepository, "Alice", "Tagli moderni e styling creativo.", "/images/barbers/alice.jpg");
                createMaster(masterRepository, "Marco", "Master Barber con oltre 15 anni di esperienza.", "/images/barbers/marco.jpg");

                System.out.println(">> Database: 5 Masters configurati.");
            }
        };
    }

    private Service createService(String titolo, String descrizione, BigDecimal prezzo, int durataMinuti) {
        Service s = new Service();
        s.setTitolo(titolo);
        s.setDescrizione(descrizione);
        s.setPrezzo(prezzo);
        s.setDurataMinuti(durataMinuti);
        return s;
    }

    private void createMaster(MasterRepository repo, String nome, String biografia, String fotoUrl) {
        Master m = new Master();
        m.setNome(nome);
        m.setBiografia(biografia);
        m.setFotoUrl(fotoUrl);
        repo.save(m);
    }
}