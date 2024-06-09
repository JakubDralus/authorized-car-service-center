package com.example.modules.assignment;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findByTicketTicketId(Long ticketId);
    List<Assignment> findAllByMechanic_UserEmail(String email);
}
