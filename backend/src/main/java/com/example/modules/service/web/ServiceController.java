package com.example.modules.service.web;

import com.example.modules.service.ServiceServ;
import com.example.shared.ApiHttpResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("api/v1/services")
@RequiredArgsConstructor
public class ServiceController {
    private final ServiceServ serviceServ;

    @GetMapping()
    public List<ServiceDTO> getAll(){
        return serviceServ.getAll();
    }

    @GetMapping("/{serviceId}")
    public ResponseEntity<ApiHttpResponse> get(@PathVariable Long serviceId){
        ServiceDTO fetched = serviceServ.get(serviceId);
        return ResponseEntity.ok().body(ApiHttpResponse.builder()
                .timeStamp(LocalDateTime.now().toString())
                .message("Service fetched.")
                .object(fetched)
                .build());
    }

    @PostMapping
    public ResponseEntity<ApiHttpResponse> create(@RequestBody ServiceDTO serviceDTO){
        ServiceDTO created = serviceServ.create(serviceDTO);
        return ResponseEntity.ok().body(ApiHttpResponse.builder()
                .timeStamp(LocalDateTime.now().toString())
                .message("Service created.")
                .object(created)
                .build());
    }

    @PutMapping
    public ResponseEntity<ApiHttpResponse> update(@RequestBody ServiceDTO serviceDTO){
        ServiceDTO updated = serviceServ.update(serviceDTO);
        return ResponseEntity.ok().body(ApiHttpResponse.builder()
                .timeStamp(LocalDateTime.now().toString())
                .message("Service updated.")
                .object(updated)
                .build());
    }

    @DeleteMapping("/{serviceId}")
    public ResponseEntity<ApiHttpResponse> delete(@PathVariable Long serviceId){
        serviceServ.delete(serviceId);
        return ResponseEntity.ok().body(ApiHttpResponse.builder()
                .timeStamp(LocalDateTime.now().toString())
                .message("Service deleted.")
                .build());
    }
}
