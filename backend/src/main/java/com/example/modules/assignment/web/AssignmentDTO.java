package com.example.modules.assignment.web;

import com.example.modules.manager.web.ManagerDTO;
import com.example.modules.mechanic.web.MechanicDTO;
import com.example.modules.service.web.ServiceDTO;
import com.example.modules.ticket.web.TicketDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class AssignmentDTO {
    private Long assignmentId;
    private String description;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private TicketDTO ticket;
    private ManagerDTO manager;
    private MechanicDTO mechanic;
    private ServiceDTO service;
}
