package com.example.modules.assignment.web;

import com.example.modules.manager.web.ManagerReadDTO;
import com.example.modules.mechanic.web.MechanicReadDTO;
import com.example.modules.service.web.ServiceReadDTO;
import com.example.modules.ticket.Ticket;
import com.example.modules.ticket.web.TicketReadDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
//@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class AssignmentReadDTO {
    private Long assignmentId;
    private String description;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Ticket.Status status;
    private TicketReadDTO ticket;
    private ManagerReadDTO manager;
    private MechanicReadDTO mechanic;
    private ServiceReadDTO service;
}
