package com.barbershop.backend.repository;
import com.barbershop.backend.model.BarberService;
import com.barbershop.backend.model.ServiceCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface BarberServiceRepository extends JpaRepository<BarberService, Long>{

List<BarberService> findByCategory(ServiceCategory category);
}
