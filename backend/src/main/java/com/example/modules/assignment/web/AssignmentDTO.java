package com.example.modules.assignment.web;

import com.example.modules.manager.web.ManagerDTO;
import com.example.modules.mechanic.web.MechanicDTO;
import com.example.modules.service.web.ServiceDTO;
import com.example.modules.ticket.Ticket;
import com.example.modules.ticket.web.TicketDTO;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AssignmentDTO {
    private Long assignmentId;
    private String description;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Ticket.Status status;
    private TicketDTO ticket;
    private ManagerDTO manager;
    private MechanicDTO mechanic;
    private ServiceDTO service;
}
