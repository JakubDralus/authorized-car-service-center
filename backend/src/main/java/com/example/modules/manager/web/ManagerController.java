package com.example.modules.manager.web;

import com.example.modules.manager.ManagerService;
import com.example.shared.ApiHttpResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<ApiHttpResponse> delete(@PathVariable Long managerId) {
        managerService.delete(managerId);
        return ResponseEntity.ok().body(ApiHttpResponse.builder()
                .timeStamp(LocalDateTime.now().toString())
                .message("Manager deleted")
                .build());
    }
}
