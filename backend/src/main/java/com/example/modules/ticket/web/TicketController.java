package com.example.modules.ticket.web;

import com.example.modules.ticket.TicketService;
import com.example.shared.ApiHttpResponse;
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
    public ResponseEntity<ApiHttpResponse> get(@PathVariable Long ticketId) {
        TicketDTO ticketDTO = ticketService.get(ticketId);
        ApiHttpResponse build = ApiHttpResponse.builder()
                .timeStamp(LocalDateTime.now().toString())
                .message("Ticket fetched.")
                .object(ticketDTO)
                .build();
        return ResponseEntity.ok().body(build);
    }
    
    @PostMapping
    public ResponseEntity<ApiHttpResponse> create(@RequestBody TicketDTO ticketDTO) {
        TicketDTO created = ticketService.create(ticketDTO);
        ApiHttpResponse build = ApiHttpResponse.builder()
                .timeStamp(LocalDateTime.now().toString())
                .message("Ticket created.")
                .object(created)
                .build();
        return ResponseEntity.ok().body(build);
    }
    
    @PutMapping
    public ResponseEntity<ApiHttpResponse> update(@RequestBody TicketDTO ticketDTO) {
        TicketDTO updated = ticketService.update(ticketDTO);
        ApiHttpResponse build = ApiHttpResponse.builder()
                .timeStamp(LocalDateTime.now().toString())
                .message("Ticket updated.")
                .object(updated)
                .build();
        return ResponseEntity.ok().body(build);
    }
    
    @DeleteMapping("/{ticketId}")
    public ResponseEntity<ApiHttpResponse> delete(@PathVariable Long ticketId) {
        ticketService.delete(ticketId);
        return ResponseEntity.ok().body(ApiHttpResponse.builder()
                .timeStamp(LocalDateTime.now().toString())
                .message("Ticket deleted")
                .build());
    }
    
    
//    private final UserRepository userRepository;
//    private final ModelMapper modelMapper;
//
//    @PostConstruct
//    public void setup() {
//        TicketDTO ticketDTO = TicketDTO.builder()
//                .description("please help my car is broken, stupid shit cant even turn on")
//                .status(Ticket.Status.REQUESTED)
//                .fullCost(14324)
//                .customer(modelMapper.map(userRepository.findById(6L).get(), UserDTO.class))
//                .build();
//        ticketService.create(ticketDTO);
//    }
}
