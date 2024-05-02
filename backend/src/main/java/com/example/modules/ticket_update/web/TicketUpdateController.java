package com.example.modules.ticket_update.web;

import com.example.modules.ticket_update.TicketUpdateService;
import com.example.shared.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/ticket-updates")
public class TicketUpdateController {
    
    private final TicketUpdateService ticketUpdateService;
    
    @GetMapping
    public List<TicketUpdateDTO> getAll() {
        return ticketUpdateService.getAll();
    }
    
    @GetMapping("/{ticketUpdateId}")
    public ApiResponse<TicketUpdateDTO> get(@PathVariable Long ticketUpdateId) {
        TicketUpdateDTO ticketUpdateDTO = ticketUpdateService.get(ticketUpdateId);
        return ApiResponse.<TicketUpdateDTO>builder()
                .message("Ticket update fetched.")
                .data(ticketUpdateDTO)
                .build();
    }
    
    @PostMapping
    public ApiResponse<TicketUpdateDTO> create(@RequestBody TicketUpdateDTO ticketUpdateDTO) {
        TicketUpdateDTO created = ticketUpdateService.create(ticketUpdateDTO);
        return ApiResponse.<TicketUpdateDTO>builder()
                .message("Ticket update created.")
                .data(created)
                .build();
    }
    
    // consider if this is even needed
    @PutMapping
    public ApiResponse<TicketUpdateDTO> update(@RequestBody TicketUpdateDTO ticketUpdateDTO) {
        TicketUpdateDTO updated = ticketUpdateService.update(ticketUpdateDTO);
        return ApiResponse.<TicketUpdateDTO>builder()
                .message("Ticket-update updated.")
                .data(updated)
                .build();
    }
    
    @DeleteMapping("/{ticketUpdateId}")
    public ApiResponse<TicketUpdateDTO> delete(@PathVariable Long ticketUpdateId) {
        ticketUpdateService.delete(ticketUpdateId);
        return ApiResponse.<TicketUpdateDTO>builder()
                .message("Ticket update deleted.")
                .build();
    }
}
