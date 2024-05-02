package com.example.modules.ticket_update;

import com.example.modules.ticket_update.web.TicketUpdateDTO;
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
public class TicketUpdateService implements CrudService<TicketUpdateDTO> {
    
    private final TicketUpdateRepository ticketUpdateRepository;
    private final TicketUpdateMapper ticketUpdateMapper;
    private final ModelMapper modelMapper;
    
    public List<TicketUpdateDTO> getAll() {
        return ticketUpdateRepository.findAll()
                .stream()
                .map(ticketUpdate -> modelMapper.map(ticketUpdate, TicketUpdateDTO.class))
                .toList();
    }
    
    @Override
    public TicketUpdateDTO get(Long id) {
        TicketUpdate ticketUpdate = ticketUpdateRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No ticket with id: " + id + " found.")
        );
        return ticketUpdateMapper.toDto(ticketUpdate);
    }
    
    @Override
    @Transactional
    public TicketUpdateDTO create(TicketUpdateDTO ticketDTO) {
        TicketUpdate ticketUpdate = new TicketUpdate();
        ticketUpdateMapper.toEntity(ticketDTO, ticketUpdate);
        ticketUpdate = ticketUpdateRepository.save(ticketUpdate);
        return modelMapper.map(ticketUpdate, TicketUpdateDTO.class);
    }
    
    @Override
    @Transactional
    public TicketUpdateDTO update(TicketUpdateDTO ticketDTO) {
        TicketUpdate ticketUpdate = ticketUpdateRepository.findById(ticketDTO.getTicketUpdateId()).orElseThrow(
                () -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "No ticket with id: " + ticketDTO.getTicketUpdateId() + " found.")
                );
        ticketUpdateMapper.toEntity(ticketDTO, ticketUpdate);
        ticketUpdate = ticketUpdateRepository.save(ticketUpdate);
        return modelMapper.map(ticketUpdate, TicketUpdateDTO.class);
    }
    
    @Override
    public void delete(Long id) {
        if (ticketUpdateRepository.existsById(id)) ticketUpdateRepository.deleteById(id);
        else throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Couldn't find the ticketUpdate.");
    }
}
