package com.example.modules.ticket_update;

import com.example.modules.ticket.Ticket;
import com.example.modules.ticket.TicketMapper;
import com.example.modules.ticket.TicketRepository;
import com.example.modules.ticket_update.web.TicketUpdateDTO;
import com.example.shared.IMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TicketUpdateMapper implements IMapper<TicketUpdate, TicketUpdateDTO> {
    
    private final TicketRepository ticketRepository;
    private final TicketMapper ticketMapper;
    
    @Override
    public TicketUpdateDTO toDto(TicketUpdate ticketUpdate) {
        return TicketUpdateDTO.builder()
                .ticketUpdateId(ticketUpdate.getTicketUpdateId())
                .description(ticketUpdate.getDescription())
                .createdAt(ticketUpdate.getCreatedAt())
                .ticket(ticketMapper.toReadDto(ticketUpdate.getTicket()))
                .build();
    }
    
    @Override
    public void toEntity(TicketUpdateDTO ticketUpdateDTO, TicketUpdate ticketUpdate) {
        ticketUpdate.setDescription(ticketUpdateDTO.getDescription());
        ticketUpdate.setSeverity(ticketUpdateDTO.getSeverity());
        if (ticketUpdateDTO.getTicket() != null) setTicket(ticketUpdateDTO, ticketUpdate);
    }
    
    private void setTicket(TicketUpdateDTO ticketUpdateDTO, TicketUpdate ticketUpdate) {
        Ticket ticket = ticketRepository.findById(ticketUpdateDTO.getTicket().getTicketId()).orElseThrow();
        ticketUpdate.setTicket(ticket);
    }
}
