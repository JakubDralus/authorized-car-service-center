package com.example.modules.assignment;

import com.example.modules.manager.Manager;
import com.example.modules.mechanic.Mechanic;
import com.example.modules.service.ServiceModel;
import com.example.modules.ticket.Ticket;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "assignment")
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "assignment_id")
    private Long assignmentId;
    
    private String description;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    
    @Enumerated(EnumType.STRING)
    private Ticket.Status status;
    
    @ManyToOne
    @JoinColumn(name="ticket_id")
    private Ticket ticket;
    
    @ManyToOne
    @JoinColumn(name="manager_id")
    private Manager manager;
    
    @ManyToOne
    @JoinColumn(name="mechanic_id")
    private Mechanic mechanic;
    
    // the service that the mechanic is working on
    @ManyToOne
    @JoinColumn(name="working_service_id")
    private ServiceModel service;
}
