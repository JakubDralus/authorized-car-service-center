package com.example.modules.assignment;

import com.example.modules.assignment.web.AssignmentDTO;
import com.example.modules.assignment.web.AssignmentReadDTO;
import com.example.modules.manager.Manager;
import com.example.modules.manager.ManagerMapper;
import com.example.modules.manager.ManagerRepository;
import com.example.modules.mechanic.Mechanic;
import com.example.modules.mechanic.MechanicMapper;
import com.example.modules.mechanic.MechanicRepository;
import com.example.modules.service.ServiceMapper;
import com.example.modules.service.ServiceModel;
import com.example.modules.service.ServiceRepository;
import com.example.modules.ticket.Ticket;
import com.example.modules.ticket.TicketMapper;
import com.example.modules.ticket.TicketRepository;
import com.example.shared.IMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
@RequiredArgsConstructor
public class AssignmentMapper implements IMapper<Assignment, AssignmentDTO> {
    
    private final TicketMapper ticketMapper;
    private final ManagerMapper managerMapper;
    private final MechanicMapper mechanicMapper;
    private final ServiceMapper serviceMapper;
    
    private final TicketRepository ticketRepository;
    private final ManagerRepository managerRepository;
    private final MechanicRepository mechanicRepository;
    private final ServiceRepository serviceRepository;
    
    @Override
    public AssignmentDTO toDto(Assignment assignment) {
        return AssignmentDTO.builder()
                .assignmentId(assignment.getAssignmentId())
                .description(assignment.getDescription())
                .startTime(assignment.getStartTime())
                .endTime(assignment.getEndTime())
                .status(assignment.getStatus())
                .ticket(ticketMapper.toDto(assignment.getTicket()))
                .manager(managerMapper.toDto(assignment.getManager()))
                .mechanic(mechanicMapper.toDto(assignment.getMechanic()))
                .service(serviceMapper.toDto(assignment.getService()))
                .build();
    }
    
    public AssignmentReadDTO toReadDto(Assignment assignment) {
        return AssignmentReadDTO.builder()
                .assignmentId(assignment.getAssignmentId())
                .description(assignment.getDescription())
                .startTime(assignment.getStartTime())
                .endTime(assignment.getEndTime())
                .status(assignment.getStatus())
                .ticket(ticketMapper.toReadDto(assignment.getTicket()))
                .manager(managerMapper.toReadDto(assignment.getManager()))
                .mechanic(mechanicMapper.toReadDto(assignment.getMechanic()))
                .service(serviceMapper.toReadDto(assignment.getService()))
                .build();
    }
    
    @Override
    public void toEntity(AssignmentDTO assignmentDTO, Assignment assignment) {
        assignment.setDescription(assignmentDTO.getDescription());
        assignment.setStartTime(assignmentDTO.getStartTime());
        assignment.setEndTime(assignmentDTO.getEndTime());
        assignment.setStatus(assignmentDTO.getStatus());
        
        setTicket(assignmentDTO, assignment);
        setManager(assignmentDTO, assignment);
        setMechanic(assignmentDTO, assignment);
        setService(assignmentDTO, assignment);
    }
    
    private void setTicket(AssignmentDTO assignmentDTO, Assignment assignment) {
        Long ticketId = assignmentDTO.getTicket().getTicketId();
        Ticket ticket = ticketRepository.findById(ticketId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ticket not present with id " + ticketId)
        );
        assignment.setTicket(ticket);
    }
    
    private void setManager(AssignmentDTO assignmentDTO, Assignment assignment) {
        Long managerId = assignmentDTO.getManager().getManagerId();
        Manager manager = managerRepository.findById(managerId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Manager not present with id " + managerId)
        );
        assignment.setManager(manager);
    }
    
    private void setMechanic(AssignmentDTO assignmentDTO, Assignment assignment) {
        Long mechanicId = assignmentDTO.getMechanic().getMechanicId();
        Mechanic mechanic = mechanicRepository.findById(mechanicId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Mechanic not present with id " + mechanicId)
        );
        assignment.setMechanic(mechanic);
    }
    
    private void setService(AssignmentDTO assignmentDTO, Assignment assignment) {
        Long id = assignmentDTO.getService().getServiceId();
        ServiceModel service = serviceRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Service not present with id " + id)
        );
        assignment.setService(service);
    }
}
