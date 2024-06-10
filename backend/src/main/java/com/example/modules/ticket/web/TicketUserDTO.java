package com.example.modules.ticket.web;

import com.example.modules.car.web.CarTicketDTO;
import com.example.modules.reserved_hours.web.ReservedHoursDTO;
import com.example.modules.service.web.ServiceTicketDTO;
import com.example.modules.user.web.UserTicketDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class TicketUserDTO {
    private Integer fullCost;
    private String description;
    private ReservedHoursDTO schedule;
    private List<ServiceTicketDTO> services;
    private CarTicketDTO car;
    private UserTicketDTO customer;
}
