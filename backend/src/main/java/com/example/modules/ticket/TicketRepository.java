package com.example.modules.ticket;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findTicketsByStatus(Ticket.Status status);
    
    List<Ticket> findAllByCustomerEmail(String email);
}
