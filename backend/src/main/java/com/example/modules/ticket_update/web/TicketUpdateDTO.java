package com.example.modules.ticket_update.web;

import com.example.modules.ticket.web.TicketReadDTO;
import com.example.modules.ticket_update.TicketUpdate;
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
public class TicketUpdateDTO {
    private Long ticketUpdateId;
    private String description;
    private TicketUpdate.Severity severity;
    private LocalDateTime createdAt;
    private TicketReadDTO ticket;
}
