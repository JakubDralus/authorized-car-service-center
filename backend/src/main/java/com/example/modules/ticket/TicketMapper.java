package com.example.modules.ticket;

import com.example.modules.car.Car;
import com.example.modules.car.CarMapper;
import com.example.modules.car.CarRepository;
import com.example.modules.service.ServiceMapper;
import com.example.modules.service.ServiceModel;
import com.example.modules.service.ServiceRepository;
import com.example.modules.service.web.ServiceDTO;
import com.example.modules.ticket.web.TicketDTO;
import com.example.modules.ticket.web.TicketReadDTO;
import com.example.modules.user.User;
import com.example.modules.user.UserMapper;
import com.example.modules.user.UserRepository;
import com.example.shared.IMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class TicketMapper implements IMapper<Ticket, TicketDTO> {
    
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    
    private final CarRepository carRepository;
    private final CarMapper carMapper;
    
    private final ServiceRepository serviceRepository;
    private final ServiceMapper serviceMapper;
    
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
                .car(carMapper.toDto(ticket.getCar()))
                .services(ticket.getServices().stream().map(serviceMapper::toDto).toList())
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
                .carId(ticket.getCar().getCarId())
                .build();
    }
    
    @Override
    public void toEntity(TicketDTO ticketDTO, Ticket ticket) {
        ticket.setDescription(ticketDTO.getDescription());
        ticket.setFullCost(ticketDTO.getFullCost());
        ticket.setStatus(ticketDTO.getStatus());
        ticket.setFinishedAt(ticketDTO.getFinishedAt());
        if (ticketDTO.getCustomer() != null) setCustomer(ticketDTO, ticket);
        if (ticketDTO.getCar() != null) setCar(ticketDTO, ticket);
        if (ticketDTO.getServices() != null) setServices(ticketDTO, ticket); // Set services
    }
    
    private void setServices(TicketDTO ticketDTO, Ticket ticket) {
        List<Long> serviceIds = ticketDTO.getServices()
                .stream()
                .map(ServiceDTO::getServiceId)
                .toList();
        List<ServiceModel> services = serviceRepository.findAllById(serviceIds);
        ticket.setServices(services);
    }
    
    private void setCar(TicketDTO ticketDTO, Ticket ticket) {
        Car car = carRepository.findById(ticketDTO.getCar().getCarId()).orElseThrow();
        ticket.setCar(car);
    }
    
    private void setCustomer(TicketDTO ticketDTO, Ticket ticket) {
        User user = userRepository.findById(ticketDTO.getCustomer().getUserId()).orElseThrow();
        ticket.setCustomer(user);
    }
}
