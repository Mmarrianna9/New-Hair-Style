package com.barbershop.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.barbershop.backend.model.Service;

public interface ServiceRepository extends JpaRepository<Service, Long> {}