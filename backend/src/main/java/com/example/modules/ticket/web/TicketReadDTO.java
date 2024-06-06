package com.example.modules.ticket.web;

import com.example.modules.car.web.CarReadDTO;
import com.example.modules.service.web.ServiceReadDTO;
import com.example.modules.ticket.Ticket;
import com.example.modules.user.web.UserReadDTO;
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
//@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class TicketReadDTO {
    private Long ticketId;
    private String description;
    private Integer fullCost;
    private Ticket.Status status;
    private LocalDateTime createdAt;
    private LocalDateTime lastUpdatedAt;
//    private Long customerId;
//    private Long carId;
    private UserReadDTO user;
    private CarReadDTO car;
    private List<ServiceReadDTO> services; // one task for each service
}