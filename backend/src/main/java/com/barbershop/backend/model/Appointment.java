
package com.barbershop.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "master_id", nullable = false)
    private Master master;

    @ManyToOne
    @JoinColumn(name = "service_id", nullable = false)
    private Service service;

    @Column(name = "data_ora_appuntamento", nullable = false)
    private LocalDateTime dataOraAppuntamento;

    @Column(name = "recapito_contatto", nullable = false)
    private String recapitoContatto;

    @Enumerated(EnumType.STRING)
    private Stato stato = Stato.CONFERMATO;

    public enum Stato {
        CONFERMATO, CANCELLATO, COMPLETATO
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Master getMaster() { return master; }
    public void setMaster(Master master) { this.master = master; }
    public Service getService() { return service; }
    public void setService(Service service) { this.service = service; }
    public LocalDateTime getDataOraAppuntamento() { return dataOraAppuntamento; }
    public void setDataOraAppuntamento(LocalDateTime dataOraAppuntamento) { this.dataOraAppuntamento = dataOraAppuntamento; }
    public String getRecapitoContatto() { return recapitoContatto; }
    public void setRecapitoContatto(String recapitoContatto) { this.recapitoContatto = recapitoContatto; }
    public Stato getStato() { return stato; }
    public void setStato(Stato stato) { this.stato = stato; }
}