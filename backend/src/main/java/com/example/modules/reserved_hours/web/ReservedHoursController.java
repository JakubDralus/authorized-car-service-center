package com.example.modules.reserved_hours.web;

import com.example.modules.reserved_hours.ReservedHoursService;
import com.example.shared.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("api/v1/reserved_hours")
@RequiredArgsConstructor
public class ReservedHoursController {

    private final ReservedHoursService reservedHoursService;
    
    @PostMapping
    public ApiResponse<ReservedHoursDTO> createReservedHour(@RequestBody ReservedHoursDTO reservedHoursDTO) {
        ReservedHoursDTO createdReservedHour = reservedHoursService.create(reservedHoursDTO);
        return ApiResponse.<ReservedHoursDTO>builder()
                .message("Reserved hour added.")
                .data(createdReservedHour)
                .build();
    }

    @GetMapping("/week")
    public ApiResponse<List<ReservedHoursDTO>> getReservedHoursForNextWeek(
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<ReservedHoursDTO> reservedHours = reservedHoursService.findReservedHoursForDate(date);
        return ApiResponse.<List<ReservedHoursDTO>>builder()
                .message("Reserved hours retrieved.")
                .data(reservedHours)
                .build();
    }
}
