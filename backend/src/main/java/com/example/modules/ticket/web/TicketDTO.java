package com.example.modules.ticket.web;

import com.example.modules.car.web.CarDTO;
import com.example.modules.service.web.ServiceDTO;
import com.example.modules.ticket.Ticket;
import com.example.modules.user.web.UserDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class TicketDTO {
    private Long ticketId;
    private String description;
    private Integer fullCost;
    private Ticket.Status status;
    private LocalDateTime createdAt;
    private LocalDateTime lastUpdatedAt;
    private LocalDateTime finishedAt;
    
    private UserDTO customer;
    private CarDTO car;
    private List<ServiceDTO> services;
}
