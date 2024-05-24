package com.example.modules.ticket.web;

import com.example.modules.ticket.TicketService;
import com.example.shared.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/tickets")
public class TicketController {

    private final TicketService ticketService;
    
    @GetMapping
    public List<TicketReadDTO> getAll() {
        return ticketService.getAll();
    }
    
    @GetMapping("/requested")
    public ApiResponse<List<TicketReadDTO>> getRequestedTickets() {
        List<TicketReadDTO> allRequested = ticketService.getAllRequested();
        return ApiResponse.<List<TicketReadDTO>>builder()
                .message("Fetched %d tickets with a Status of REQUESTED.".formatted(allRequested.size()))
                .data(allRequested)
                .build();
    }
    
    @GetMapping("/{ticketId}")
    public ApiResponse<TicketDTO> get(@PathVariable Long ticketId) {
        TicketDTO ticketDTO = ticketService.get(ticketId);
        return ApiResponse.<TicketDTO>builder()
                .message("Ticket fetched.")
                .data(ticketDTO)
                .build();
    }
    
    @PostMapping
    public ApiResponse<TicketDTO> create(@RequestBody TicketDTO ticketDTO) {
        TicketDTO created = ticketService.create(ticketDTO);
        return ApiResponse.<TicketDTO>builder()
                .message("Ticket created.")
                .data(created)
                .build();
    }
    
    @PutMapping
    public ApiResponse<TicketDTO> update(@RequestBody TicketDTO ticketDTO) {
        TicketDTO updated = ticketService.update(ticketDTO);
        return ApiResponse.<TicketDTO>builder()
                .message("Ticket updated.")
                .data(updated)
                .build();
    }
    
    @DeleteMapping("/{ticketId}")
    public ApiResponse<TicketDTO> delete(@PathVariable Long ticketId) {
        ticketService.delete(ticketId);
        return ApiResponse.<TicketDTO>builder()
                .message("Ticket deleted.")
                .build();
    }
    
//    private final UserRepository userRepository;
//    private final ModelMapper modelMapper;
//
//    @PostConstruct
//    public void setup() {
//        TicketDTO ticketDTO = TicketDTO.responseBodyer()
//                .description("please help my car is broken, stupid shit cant even turn on")
//                .status(Ticket.Status.REQUESTED)
//                .fullCost(14324)
//                .customer(modelMapper.map(userRepository.findById(6L).get(), UserDTO.class))
//                .responseBody();
//        ticketService.create(ticketDTO);
//    }
}
