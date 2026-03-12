package com.barbershop.backend.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private String name; // es: "Taglio Sfumato", "Colore Permanente"

    private String description; // es: "Lavaggio incluso"

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Integer durationMinutes; // es: 30, 60, 120

    @Enumerated(EnumType.STRING)
    private ServiceCategory category;

}
