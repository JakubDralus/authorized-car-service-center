package com.example.modules.ticket.web;

import com.example.modules.ticket.Ticket;
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
    
    @GetMapping("/my-tickets")
    public ApiResponse<List<TicketReadDTO>> getLoggedUser(@RequestHeader("Authorization") String bearerToken) {
        List<TicketReadDTO> userTickets = ticketService.getAllByUser(bearerToken);
        return ApiResponse.<List<TicketReadDTO>>builder()
                .message("All user tickets fetched")
                .data(userTickets)
                .build();
    }
    
    @GetMapping("/status/{status}")
    public ApiResponse<List<TicketReadDTO>> getAllByStatus(@PathVariable String status) {
        List<TicketReadDTO> allRequested = ticketService.getAllByStatus(Ticket.Status.valueOf(status.toUpperCase()));
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
    
    @PutMapping("/{ticketId}")
    public ApiResponse<TicketDTO> update(@RequestBody TicketDTO ticketDTO, @PathVariable Long ticketId) {
        ticketDTO.setTicketId(ticketId);
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

    @PostMapping("/create-user-ticket")
    public ApiResponse<TicketDTO> createUserTicket(@RequestHeader("Authorization") String token, @RequestBody TicketUserDTO ticketUserDTO){
        TicketDTO created = ticketService.createUserTicket(token, ticketUserDTO);
        return ApiResponse.<TicketDTO>builder()
                .message("Ticket created succesfully.")
                .data(created)
                .build();
    }
}
