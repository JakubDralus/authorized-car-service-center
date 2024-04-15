package com.example.modules.car;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository extends JpaRepository<Long,Car> {
}
