package com.example.modules.ticket_update;

import com.example.modules.ticket_update.web.TicketUpdateDTO;
import com.example.shared.IMapper;
import org.springframework.stereotype.Component;

@Component
public class TicketUpdateMapper implements IMapper<TicketUpdate, TicketUpdateDTO> {
    @Override
    public TicketUpdateDTO toDto(TicketUpdate ticketUpdate) {
        return null;
    }
    
    @Override
    public void toEntity(TicketUpdateDTO Dto, TicketUpdate ticketUpdate) {
    
    }
}
