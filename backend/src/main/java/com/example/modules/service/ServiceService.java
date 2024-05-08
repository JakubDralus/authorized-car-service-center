package com.example.modules.service;

import com.example.modules.aws.S3Buckets;
import com.example.modules.aws.S3Service;
import com.example.modules.service.web.ServiceDTO;
import com.example.shared.CrudService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import software.amazon.awssdk.utils.StringUtils;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ServiceService implements CrudService<ServiceDTO> {
    
    private final ServiceRepository serviceRepository;
    private final ModelMapper modelMapper;
    private final ServiceMapper serviceMapper;
    private final S3Service s3Service;
    private final S3Buckets s3Buckets;

    public List<ServiceDTO> getAll() {
        return serviceRepository.findAll()
                .stream()
                .map(service -> modelMapper.map(service, ServiceDTO.class))
                .toList();
    }

    @Override
    public ServiceDTO get(Long id){
        ServiceModel service = serviceRepository.findById(id).orElse(null);
        if (service == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No match for id: " + id);
        return serviceMapper.toDto(service);
    }

    @Override
    public ServiceDTO create(ServiceDTO serviceDTO) {
        ServiceModel service = new ServiceModel();
        serviceMapper.toEntity(serviceDTO, service);
        service = serviceRepository.save(service);
        return modelMapper.map(service, ServiceDTO.class);
    }

    @Override
    public ServiceDTO update(ServiceDTO serviceDTO) {
        ServiceModel service = serviceRepository.findById(serviceDTO.getServiceId()).orElseThrow();
        serviceMapper.toEntity(serviceDTO, service);
        service = serviceRepository.save(service);
        return modelMapper.map(service, ServiceDTO.class);
    }

    @Override
    public void delete(Long id) {
        ServiceModel service = serviceRepository.findById(id).orElse(null);
        if (service != null) {
            s3Service.deleteObject(s3Buckets.getServices(), service.getPhotoUrl()); // get photo and delete it on s3
            serviceRepository.deleteById(id);
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Specified service does not exist");
        }
    }
    
    public void uploadPhotoToS3(Long serviceId, MultipartFile file) {
        String servicePhotoId = UUID.randomUUID().toString();
        String photoUrl = "service-photos-%s-%s".formatted(serviceId, servicePhotoId);
        try {
            s3Service.putObject(
                    s3Buckets.getServices(),
                    photoUrl,
                    file.getBytes(),
                    file.getContentType());
        }
        catch (IOException e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "failed to upload profile image", e);
        }
        
        // if there is photo already try to delete the previous one
        try {
            ServiceModel service = serviceRepository.findById(serviceId).orElseThrow();
            s3Service.deleteObject(s3Buckets.getServices(), service.getPhotoUrl());
        }
        catch (Exception ignored){}
        
        serviceRepository.updatePhotoUrlById(serviceId, photoUrl);
    }
    
    public byte[] getPhoto(Long serviceId) {
        ServiceModel service = serviceRepository.findById(serviceId).orElseThrow(
                () -> new NoSuchElementException("service with id [%s] not found".formatted(serviceId))
        );
        
        if (StringUtils.isBlank(service.getPhotoUrl())) {
            throw new NoSuchElementException("photo not found for customer with id: %s".formatted(serviceId));
        }
        
        byte[] servicePhoto = s3Service.getObject(
                s3Buckets.getServices(),
                service.getPhotoUrl()
        );
        return servicePhoto;
    }
}
