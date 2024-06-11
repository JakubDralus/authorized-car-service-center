package com.example.modules.ticket;

import com.example.modules.address.Address;
import com.example.modules.address.AddressRepository;
import com.example.modules.auth.JwtService;
import com.example.modules.car.Car;
import com.example.modules.car.CarRepository;
import com.example.modules.reserved_hours.ReservedHours;
import com.example.modules.reserved_hours.ReservedHoursRepository;
import com.example.modules.service.ServiceModel;
import com.example.modules.service.ServiceRepository;
import com.example.modules.service.web.ServiceTicketDTO;
import com.example.modules.ticket.web.TicketDTO;
import com.example.modules.ticket.web.TicketReadDTO;
import com.example.modules.ticket.web.TicketUserDTO;
import com.example.modules.user.User;
import com.example.modules.user.UserRepository;
import com.example.shared.CrudService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import io.jsonwebtoken.Claims;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketService implements CrudService<TicketDTO> {
    
    private final TicketRepository ticketRepository;
    private final ModelMapper modelMapper;
    private final TicketMapper ticketMapper;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final CarRepository carRepository;
    private final ReservedHoursRepository reservedHoursRepository;
    private final ServiceRepository serviceRepository;
    private final AddressRepository addressRepository;
    
    public List<TicketReadDTO> getAll() {
        return ticketRepository.findAll()
                .stream()
                .map(ticketMapper::toReadDto)
                .toList();
    }
    
    public List<TicketReadDTO> getAllByUser(String token) {
        String email = jwtService.extractClaim(token.substring(7), Claims::getSubject);
        return ticketRepository.findAllByCustomerEmail(email)
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

    @Transactional
    public TicketDTO createUserTicket(String token, TicketUserDTO ticketUserDTO) {
        String email = jwtService.extractClaim(token.substring(7), Claims::getSubject);
        User customer = userRepository.findByEmail(email).orElseThrow();

        if(!ticketUserDTO.getCustomer().getAddress().getCountry().isEmpty()
                && !ticketUserDTO.getCustomer().getAddress().getCity().isEmpty()
                && !ticketUserDTO.getCustomer().getAddress().getStreet().isEmpty()
                && !ticketUserDTO.getCustomer().getAddress().getPostalCode().isEmpty()){
            if(customer.getAddress() == null){
                Address address = Address.builder()
                        .city(ticketUserDTO.getCustomer().getAddress().getCity())
                        .country(ticketUserDTO.getCustomer().getAddress().getCountry())
                        .street(ticketUserDTO.getCustomer().getAddress().getStreet())
                        .postalCode(ticketUserDTO.getCustomer().getAddress().getPostalCode())
                        .build();

                address = addressRepository.save(address);

                customer.setAddress(address);
                customer = userRepository.save(customer);
            }
            else{
                Address address = customer.getAddress();
                address.setCity(ticketUserDTO.getCustomer().getAddress().getCity());
                address.setStreet(ticketUserDTO.getCustomer().getAddress().getStreet());
                address.setCountry(ticketUserDTO.getCustomer().getAddress().getCountry());
                address.setPostalCode(ticketUserDTO.getCustomer().getAddress().getPostalCode());

                address = addressRepository.save(address);
                customer.setAddress(address);
            }
        }

        Car car = Car.builder()
                .color(ticketUserDTO.getCar().getColor())
                .model(ticketUserDTO.getCar().getModel())
                .licensePlate(ticketUserDTO.getCar().getLicensePlate())
                .manufacturedYear(ticketUserDTO.getCar().getManufacturedYear())
                .mileage(ticketUserDTO.getCar().getMileage())
                .vin(ticketUserDTO.getCar().getVin())
                .owner(customer)
                .build();

        car = carRepository.save(car);

        ReservedHours carReturnDate = ReservedHours.builder()
                .hour(ticketUserDTO.getSchedule().getHour())
                .date(ticketUserDTO.getSchedule().getDate())
                .build();

        carReturnDate = reservedHoursRepository.save(carReturnDate);

        List<ServiceModel> services = new ArrayList<>();

        for (ServiceTicketDTO service : ticketUserDTO.getServices()) {
            ServiceModel serviceModel = serviceRepository.findById(service.getServiceId()).orElseThrow();
            services.add(serviceModel);
        }


        Ticket ticket = Ticket.builder()
                .description(ticketUserDTO.getDescription())
                .fullCost(ticketUserDTO.getFullCost())
                .status(Ticket.Status.REQUESTED)
                .finishedAt(null)
                .customer(customer)
                .car(car)
                .carReturnDate(carReturnDate)
                .services(services)
                .build();

        ticket = ticketRepository.save(ticket);

        return modelMapper.map(ticket, TicketDTO.class);
    }
}
