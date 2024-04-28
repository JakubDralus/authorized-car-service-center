package com.example.modules.ticket.web;

import com.example.modules.ticket.Ticket;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class TicketReadDTO {
    private Long ticketId;
    private String description;
    private Integer fullCost;
    private Ticket.Status status;
    private LocalDateTime createdAt;
    private LocalDateTime lastUpdatedAt;
    private Long customerId;
    private Long carId;
}