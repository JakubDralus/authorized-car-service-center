package com.example.modules.ticket;

import com.example.modules.ticket.web.TicketDTO;
import com.example.modules.ticket.web.TicketReadDTO;
import com.example.modules.user.User;
import com.example.modules.user.UserMapper;
import com.example.modules.user.UserRepository;
import com.example.shared.IMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TicketMapper implements IMapper<Ticket, TicketDTO> {
    
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    
    @Override
    public TicketDTO toDto(Ticket ticket) {
        return TicketDTO.builder()
                .ticketId(ticket.getTicketId())
                .description(ticket.getDescription())
                .status(ticket.getStatus())
                .fullCost(ticket.getFullCost())
                .createdAt(ticket.getCreatedAt())
                .lastUpdatedAt(ticket.getLastUpdatedAt())
                .customer(userMapper.toDto(ticket.getCustomer()))
                .build();
    }
    
    public TicketReadDTO toReadDto(Ticket ticket) {
        return TicketReadDTO.builder()
                .ticketId(ticket.getTicketId())
                .status(ticket.getStatus())
                .fullCost(ticket.getFullCost())
                .createdAt(ticket.getCreatedAt())
                .lastUpdatedAt(ticket.getLastUpdatedAt())
                .customerId(ticket.getCustomer().getUserId())
                .build();
    }
    
    @Override
    public void toEntity(TicketDTO ticketDTO, Ticket ticket) {
        ticket.setDescription(ticketDTO.getDescription());
        ticket.setFullCost(ticketDTO.getFullCost());
        ticket.setStatus(ticketDTO.getStatus());
        ticket.setFinishedAt(ticketDTO.getFinishedAt());
        if (ticketDTO.getCustomer() != null) setCustomer(ticketDTO, ticket);
    }
    
    private void setCustomer(TicketDTO ticketDTO, Ticket ticket) {
        User user = userRepository.getReferenceById(ticketDTO.getCustomer().getUserId());
        ticket.setCustomer(user);
    }
}
