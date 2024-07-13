package com.example.modules.ticket;

import com.example.modules.car.Car;
import com.example.modules.car.CarMapper;
import com.example.modules.car.CarRepository;
import com.example.modules.reserved_hours.ReservedHours;
import com.example.modules.reserved_hours.ReservedHoursMapper;
import com.example.modules.service.ServiceMapper;
import com.example.modules.service.ServiceModel;
import com.example.modules.service.ServiceRepository;
import com.example.modules.service.web.ServiceDTO;
import com.example.modules.service.web.ServiceReadDTO;
import com.example.modules.ticket.web.TicketDTO;
import com.example.modules.ticket.web.TicketReadDTO;
import com.example.modules.user.User;
import com.example.modules.user.UserMapper;
import com.example.modules.user.UserRepository;
import com.example.modules.user.web.UserReadDTO;
import com.example.shared.IMapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
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
    private final ReservedHoursMapper reservedHoursMapper;
    private final ModelMapper modelMapper;
    
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
                .carReturnDate(reservedHoursMapper.toDto(ticket.getCarReturnDate()))
                .services(ticket.getServices().stream().map(serviceMapper::toDto).toList())
                .build();
    }
    
    public TicketReadDTO toReadDto(Ticket ticket) {
        return TicketReadDTO.builder()
                .ticketId(ticket.getTicketId())
                .description(ticket.getDescription())
                .status(ticket.getStatus())
                .fullCost(ticket.getFullCost())
                .createdAt(ticket.getCreatedAt())
                .lastUpdatedAt(ticket.getLastUpdatedAt())
                .user(modelMapper.map(ticket.getCustomer(), UserReadDTO.class))
                .car(carMapper.toReadDto(ticket.getCar()))
                .carReturnDate(reservedHoursMapper.toDto(ticket.getCarReturnDate()))
                .services(ticket.getServices().stream().map(s -> modelMapper.map(s, ServiceReadDTO.class)).toList())
                .build();
    }
    
    @Override
    public void toEntity(TicketDTO ticketDTO, Ticket ticket) {
        if (ticketDTO.getDescription() != null)ticket.setDescription(ticketDTO.getDescription());
        if (ticketDTO.getFullCost() != null)ticket.setFullCost(ticketDTO.getFullCost());
        if (ticketDTO.getStatus() != null)ticket.setStatus(ticketDTO.getStatus());
        if (ticketDTO.getFinishedAt() != null)ticket.setFinishedAt(ticketDTO.getFinishedAt());
        
        if (ticketDTO.getCustomer() != null) setCustomer(ticketDTO, ticket);
        if (ticketDTO.getCar() != null) setCar(ticketDTO, ticket);
        if (ticketDTO.getServices() != null) setServices(ticketDTO, ticket); // Set services
        if (ticketDTO.getCarReturnDate() != null) setReservedHour(ticketDTO, ticket);
    }

    private void setReservedHour(TicketDTO ticketDTO, Ticket ticket) {
        ReservedHours reservedHours = ticket.getCarReturnDate();
        if (reservedHours == null) reservedHours = new ReservedHours();
        reservedHoursMapper.toEntity(ticketDTO.getCarReturnDate(), reservedHours);
        ticket.setCarReturnDate(reservedHours);
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
