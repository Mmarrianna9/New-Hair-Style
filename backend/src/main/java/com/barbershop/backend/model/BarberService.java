package com.barbershop.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "services")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BarberService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Integer durationMinutes;

    @Enumerated(EnumType.STRING)
    private ServiceCategory category;

    @ManyToMany(mappedBy = "services")
    @JsonIgnore // Impedisce cicli infiniti durante la conversione in JSON
    private Set<Barber> barbers = new HashSet<>();

    /**
     * Costruttore personalizzato per facilitare il DataInitializer.
     * Esclude il set dei barbieri per evitare l'errore "constructor undefined".
     */
    public BarberService(Long id, String name, String description, Double price, Integer durationMinutes, ServiceCategory category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.durationMinutes = durationMinutes;
        this.category = category;
        this.barbers = new HashSet<>();
    }
}