package com.example.modules.ticket.web;

import com.example.modules.ticket.TicketService;
import com.example.shared.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
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
    
    @GetMapping("/{ticketId}")
    public ResponseEntity<ApiResponse<TicketDTO>> get(@PathVariable Long ticketId) {
        TicketDTO ticketDTO = ticketService.get(ticketId);
        ApiResponse<TicketDTO> responseBody = ApiResponse.<TicketDTO>builder()
                .timeStamp(LocalDateTime.now())
                .message("Ticket fetched.")
                .data(ticketDTO)
                .build();
        return ResponseEntity.ok().body(responseBody);
    }
    
    @PostMapping
    public ResponseEntity<ApiResponse<TicketDTO>> create(@RequestBody TicketDTO ticketDTO) {
        TicketDTO created = ticketService.create(ticketDTO);
        ApiResponse<TicketDTO> responseBody = ApiResponse.<TicketDTO>builder()
                .timeStamp(LocalDateTime.now())
                .message("Ticket created.")
                .data(created)
                .build();
        return ResponseEntity.ok().body(responseBody);
    }
    
    @PutMapping
    public ResponseEntity<ApiResponse<TicketDTO>> update(@RequestBody TicketDTO ticketDTO) {
        TicketDTO updated = ticketService.update(ticketDTO);
        ApiResponse<TicketDTO> responseBody = ApiResponse.<TicketDTO>builder()
                .timeStamp(LocalDateTime.now())
                .message("Ticket updated.")
                .data(updated)
                .build();
        return ResponseEntity.ok().body(responseBody);
    }
    
    @DeleteMapping("/{ticketId}")
    public ResponseEntity<ApiResponse<TicketDTO>> delete(@PathVariable Long ticketId) {
        ticketService.delete(ticketId);
        ApiResponse<TicketDTO> responseBody = ApiResponse.<TicketDTO>builder()
                .timeStamp(LocalDateTime.now())
                .message("Ticket deleted")
                .build();
        return ResponseEntity.ok().body(responseBody);
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
