package com.example.modules.mechanic.web;

import com.example.modules.mechanic.MechanicService;
import com.example.shared.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("api/v1/mechanics")
@RequiredArgsConstructor
public class MechanicController {

    private final MechanicService mechanicService;

    @GetMapping
    public ApiResponse<List<MechanicDTO>> getAll(){
        List<MechanicDTO> all = mechanicService.getAll();
        return ApiResponse.<List<MechanicDTO>>builder()
                .message("%d mechanics fetched.".formatted(all.size()))
                .data(all)
                .build();
    }

    @GetMapping("/{mechanicId}")
    public ApiResponse<MechanicDTO> get(@PathVariable Long mechanicId) {
        MechanicDTO mechanicDTO = mechanicService.get(mechanicId);
        return ApiResponse.<MechanicDTO>builder()
                .message("Mechanic fetched.")
                .data(mechanicDTO)
                .build();
    }

    @PostMapping
    public ApiResponse<MechanicDTO> create(@RequestBody MechanicDTO mechanicDTO) {
        MechanicDTO created = mechanicService.create(mechanicDTO);
        return ApiResponse.<MechanicDTO>builder()
                .message("Mechanic created.")
                .data(created)
                .build();
    }

    @PutMapping
    public ApiResponse<MechanicDTO> update(@RequestBody MechanicDTO mechanicDTO) {
        MechanicDTO updated = mechanicService.update(mechanicDTO);
        return ApiResponse.<MechanicDTO>builder()
                .message("Mechanic updated.")
                .data(updated)
                .build();
    }

    @DeleteMapping("{mechanicId}")
    public ApiResponse<MechanicDTO> delete(@PathVariable Long mechanicId) {
        mechanicService.delete(mechanicId);
        return ApiResponse.<MechanicDTO>builder()
                .message("Mechanic deleted.")
                .build();
    }
}
