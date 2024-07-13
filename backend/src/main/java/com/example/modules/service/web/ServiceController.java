package com.example.modules.service.web;

import com.example.modules.service.ServiceService;
import com.example.shared.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

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
    public ApiResponse<ServiceDTO> uploadPhoto(@PathVariable Long serviceId, @RequestParam("files") MultipartFile ...files) {
        serviceService.uploadPhotosToS3(serviceId, files);
        return ApiResponse.<ServiceDTO>builder()
                .message("Added service photo.")
                .build();
    }
    
    @GetMapping(
            value = "{serviceId}/photo-big",
            produces = {MediaType.IMAGE_PNG_VALUE}
    )
    public byte[] getServicePhotoBig(@PathVariable Long serviceId) {
        return serviceService.getPhoto(serviceId, "big");
    }
    
    @GetMapping(
            value = "{serviceId}/photo-small",
            produces = {MediaType.IMAGE_PNG_VALUE}
    )
    public byte[] getServicePhotoSmall(@PathVariable Long serviceId) {
        return serviceService.getPhoto(serviceId, "small");
    }
    
    @GetMapping(
            value = "{serviceId}/photos",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Map<String, byte[]> getServicePhotos(@PathVariable Long serviceId) {
        List<byte[]> photos = serviceService.get2Photos(serviceId);
        return Map.of("big", photos.get(0), "small", photos.get(1));
    }

    @GetMapping("available-photos")
    public List<ServiceSmallPhotoDTO> getAllAvailableWithSmallPhoto() {
        return serviceService.getAllAvailableWithSmallPhoto();
    }

    @GetMapping("{serviceId}/service-big-photo")
    public ServiceBigPhotoDTO getAllAvailableWithSmallPhoto(@PathVariable Long serviceId) {
        return serviceService.getWithBigPhoto(serviceId);
    }

    @GetMapping("featured-photos")
    public List<ServiceSmallPhotoDTO> getAllFeaturedWithSmallPhoto() {
        return serviceService.getAllFeaturedWithSmallPhoto();
    }

    @GetMapping("ticket-services")
    public List<ServiceTicketDTO> getAllAvailableToTicket() {
        return serviceService.getAllAvailableToTicket();
    }
}
