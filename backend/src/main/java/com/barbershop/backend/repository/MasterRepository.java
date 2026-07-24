package com.barbershop.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.barbershop.backend.model.Master;

public interface MasterRepository extends JpaRepository<Master, Long> {}