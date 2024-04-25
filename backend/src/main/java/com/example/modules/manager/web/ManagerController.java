package com.example.modules.manager.web;

import com.example.modules.manager.ManagerService;
import com.example.shared.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("api/v1/managers")
@RequiredArgsConstructor
public class ManagerController {
    private final ManagerService managerService;
    
    @GetMapping("/{managerId}")
    public ManagerDTO get(@PathVariable Long managerId) {
        return managerService.get(managerId);
    }
    
    @PostMapping
    public ManagerDTO create(@RequestBody ManagerDTO managerDTO) {
        return managerService.create(managerDTO);
    }
    
    @PutMapping
    public ManagerDTO update(@RequestBody ManagerDTO managerDTO) {
        return managerService.update(managerDTO);
    }
    
    @DeleteMapping("/{managerId}")
    public ApiResponse<?> delete(@PathVariable Long managerId) {
        managerService.delete(managerId);
        return ApiResponse.builder()
                .timeStamp(LocalDateTime.now())
                .message("Manager deleted")
                .build();
    }
}
