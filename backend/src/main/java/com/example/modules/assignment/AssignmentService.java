package com.example.modules.assignment;

import com.example.modules.assignment.web.AssignmentDTO;
import com.example.modules.assignment.web.AssignmentReadDTO;
import com.example.modules.auth.JwtService;
import com.example.modules.ticket.Ticket;
import com.example.modules.ticket.TicketRepository;
import com.example.shared.CrudService;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AssignmentService implements CrudService<AssignmentDTO> {
    
    private final AssignmentRepository assignmentRepository;
    private final AssignmentMapper assignmentMapper;
    private final TicketRepository ticketRepository;
    private final ModelMapper modelMapper;
    private final JwtService jwtService;
    
    public List<AssignmentReadDTO> getAll() {
        return assignmentRepository.findAll()
                .stream()
                .map(assignmentMapper::toReadDto)
                .toList();
    }
    
    public List<AssignmentReadDTO> getAllByMechanic(String token) {
        String email = jwtService.extractClaim(token.substring(7), Claims::getSubject);
        
        return assignmentRepository.findAllByMechanic_UserEmail(email)
                .stream()
                .map(assignmentMapper::toReadDto)
                .toList();
    }
    
    @Override
    public AssignmentDTO get(Long id) {
        Assignment assignment = assignmentRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No match for assignment id: " + id)
        );
        return assignmentMapper.toDto(assignment);
    }
    
    @Override
    @Transactional
    public AssignmentDTO create(AssignmentDTO assignmentDTO) {
        Assignment assignment = new Assignment();
        assignmentMapper.toEntity(assignmentDTO, assignment);
        assignment.setStatus(Ticket.Status.PENDING);
        assignment = assignmentRepository.save(assignment);
        return modelMapper.map(assignment, AssignmentDTO.class);
    }
    
    @Transactional
    public AssignmentDTO updateStatus(Long assignmentId, String status) {
        Assignment assignment = assignmentRepository.findById(assignmentId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No match for assignment id: " + assignmentId)
        );
        Ticket.Status statusEnum;
        try {
            statusEnum = Ticket.Status.valueOf(status.toUpperCase());
        }
        catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Wrong status argument: " + status);
        }
        
        assignment.setStatus(statusEnum);
        if (statusEnum.equals(Ticket.Status.DOING)) {
            assignment.setStartTime(LocalDateTime.now());
        }
        
        assignment = assignmentRepository.save(assignment);
        updateTicketStatus(assignment.getTicket().getTicketId(), statusEnum);
        return modelMapper.map(assignment, AssignmentDTO.class);
    }
    
    private void updateTicketStatus(Long ticketId, Ticket.Status status) {
        List<Assignment> assignments = assignmentRepository.findByTicketTicketId(ticketId);
        boolean allMatch = assignments.stream().allMatch(assignment -> assignment.getStatus().equals(status));
        
        if (allMatch) {
            Ticket ticket = ticketRepository.findById(ticketId).orElseThrow(
                    () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No match for ticket id: " + ticketId)
            );
            ticket.setStatus(status);
            ticketRepository.save(ticket);
        }
    }
    
    @Override
    @Transactional
    public AssignmentDTO update(AssignmentDTO assignmentDTO) {
        Long assignmentId = assignmentDTO.getAssignmentId();
        Assignment assignment = assignmentRepository.findById(assignmentId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No match for assignment id: " + assignmentId)
        );
        assignmentMapper.toEntity(assignmentDTO, assignment);
        assignment = assignmentRepository.save(assignment);
        return modelMapper.map(assignment, AssignmentDTO.class);
    }
    
    @Override
    public void delete(Long id) {
        if (assignmentRepository.existsById(id)) assignmentRepository.deleteById(id);
        else throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No match for assignment id: " + id);
    }
}
