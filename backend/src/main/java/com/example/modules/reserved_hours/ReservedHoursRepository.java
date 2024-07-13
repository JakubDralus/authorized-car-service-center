package com.example.modules.reserved_hours;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ReservedHoursRepository extends JpaRepository<ReservedHours, Long> {

    @Query("SELECT r FROM ReservedHours r WHERE r.date = :date")
    List<ReservedHours> findReservedHoursForDate(@Param("date") LocalDate date);
}
