package com.example.modules.ticket;

import com.example.modules.ticket.web.TicketDTO;
import com.example.modules.ticket.web.TicketReadDTO;
import com.example.shared.CrudService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketService implements CrudService<TicketDTO> {
    
    private final TicketRepository ticketRepository;
    private final ModelMapper modelMapper;
    private final TicketMapper ticketMapper;
    
    public List<TicketReadDTO> getAll() {
        return ticketRepository.findAll()
                .stream()
                .map(ticketMapper::toReadDto)
                .toList();
    }
    
    public List<TicketReadDTO> getAllByStatus(Ticket.Status status) {
        return ticketRepository.findTicketsByStatus(status)
                .stream()
                .map(ticketMapper::toReadDto)
                .toList();
    }
    
    @Override
    public TicketDTO get(Long id) {
        Ticket ticket = ticketRepository.findById(id).orElse(null);
        if (ticket == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No match for id: " + id);
        return ticketMapper.toDto(ticket);
    }
    
    @Transactional
    @Override
    public TicketDTO create(TicketDTO ticketDTO) {
        Ticket ticket = new Ticket();
        ticketMapper.toEntity(ticketDTO, ticket);
        ticket.setStatus(Ticket.Status.REQUESTED);
        ticket = ticketRepository.save(ticket);
        return modelMapper.map(ticket, TicketDTO.class);
    }
    
    @Transactional
    @Override
    public TicketDTO update(TicketDTO ticketDTO) {
        Ticket ticket = ticketRepository.getReferenceById(ticketDTO.getTicketId());
        ticketMapper.toEntity(ticketDTO, ticket);
        ticket = ticketRepository.save(ticket);
        return modelMapper.map(ticket, TicketDTO.class);
    }
    
    @Override
    public void delete(Long id) {
        if (ticketRepository.existsById(id)) ticketRepository.deleteById(id);
        else throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Couldn't find the ticket.");
    }
}
