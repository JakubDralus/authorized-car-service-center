package com.example.modules.service.web;

import com.example.modules.service.ServiceService;
import com.example.shared.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/v1/services")
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
    
    @PostMapping(
            value = "/{serviceId}/photo",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ApiResponse<ServiceDTO> uploadPhoto(@PathVariable Long serviceId, @RequestParam("file") MultipartFile file) {
        serviceService.uploadPhotoToS3(serviceId, file);
        return ApiResponse.<ServiceDTO>builder()
                .message("Added service photo.")
                .build();
    }
    
    @GetMapping(
            value = "{serviceId}/photo",
            produces = MediaType.IMAGE_JPEG_VALUE
    )
    public byte[] getServicePhoto(@PathVariable Long serviceId) {
        return serviceService.getPhoto(serviceId);
    }
}
