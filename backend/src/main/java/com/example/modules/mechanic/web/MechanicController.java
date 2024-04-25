package com.example.modules.mechanic.web;


import com.example.modules.mechanic.MechanicService;
import com.example.shared.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("api/v1/mechanic")
@RequiredArgsConstructor
public class MechanicController {

    private final MechanicService mechanicService;

    @GetMapping
    public List<MechanicDTO> getAll(){
        return mechanicService.getAll();
    }

    @GetMapping("/{mechanicId}")
    public MechanicDTO get(@PathVariable Long mechanicId){
        return mechanicService.get(mechanicId);
    }

    @PostMapping
    public MechanicDTO create(@RequestBody MechanicDTO mechanicDTO){
        return mechanicService.create(mechanicDTO);
    }

    @PutMapping
    public MechanicDTO update(@RequestBody MechanicDTO mechanicDTO){
        return mechanicService.update(mechanicDTO);
    }

    @DeleteMapping("{mechanicId}")
    public ResponseEntity<ApiResponse<?>> delete(@PathVariable Long mechanicId) {
        mechanicService.delete(mechanicId);
        ApiResponse<?> responseBody = ApiResponse.builder()
                .timeStamp(LocalDateTime.now())
                .message("Mechanic deleted")
                .build();
        return ResponseEntity.ok().body(responseBody);
    }
}
