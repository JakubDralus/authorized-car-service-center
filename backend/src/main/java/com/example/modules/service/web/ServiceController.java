package com.example.modules.service.web;

import com.example.modules.service.ServiceService;
import com.example.shared.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("api/v1/service")
@RequiredArgsConstructor
public class ServiceController {
    private final ServiceService serviceService;

    @GetMapping()
    public List<ServiceDTO> getAll(){
        return serviceService.getAll();
    }

    @GetMapping("/{serviceId}")
    public ApiResponse<ServiceDTO> get(@PathVariable Long serviceId){
        ServiceDTO fetched = serviceService.get(serviceId);
        return ApiResponse.<ServiceDTO>builder()
                .message("Service fetched")
                .data(fetched)
                .build();
    }

    @PostMapping
    public ApiResponse<ServiceDTO> create(@RequestBody ServiceDTO serviceDTO){
        ServiceDTO created = serviceService.create(serviceDTO);
        return ApiResponse.<ServiceDTO>builder()
                .message("Service created.")
                .data(created)
                .build();
    }

    @PutMapping
    public ApiResponse<ServiceDTO> update(@RequestBody ServiceDTO serviceDTO){
        ServiceDTO updated = serviceService.update(serviceDTO);
        return ApiResponse.<ServiceDTO>builder()
                .message("Service updated.")
                .data(updated)
                .build();
    }

    @DeleteMapping("/{serviceId}")
    public ApiResponse<ServiceDTO> delete(@PathVariable Long serviceId){
        serviceService.delete(serviceId);
        return ApiResponse.<ServiceDTO>builder()
                .message("Service deleted.")
                .build();
    }
}
