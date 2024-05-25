package com.example.modules.service;

import com.example.modules.service.web.ServiceBigPhotoDTO;
import com.example.modules.service.web.ServiceDTO;
import com.example.modules.service.web.ServiceSmallPhotoDTO;
import com.example.shared.IMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ServiceMapper implements IMapper<ServiceModel, ServiceDTO> {
    @Override
    public ServiceDTO toDto(ServiceModel service) {
        return ServiceDTO.builder()
                .serviceId(service.getServiceId())
                .estimatedRepairTime(service.getEstimatedRepairTime())
                .name(service.getName())
                .type(service.getType())
                .cost(service.getCost())
                .isAvailable(service.getIsAvailable())
                .isFeatured(service.getIsFeatured())
                .description(service.getDescription())
                .build();
    }

    public ServiceSmallPhotoDTO toSmallDto(ServiceModel service, byte[] photo) {
        return ServiceSmallPhotoDTO.builder()
                .serviceId(service.getServiceId())
                .estimatedRepairTime(service.getEstimatedRepairTime())
                .name(service.getName())
                .type(service.getType())
                .cost(service.getCost())
                .isAvailable(service.getIsAvailable())
                .isFeatured(service.getIsFeatured())
                .description(service.getDescription())
                .smallPhoto(photo)
                .build();
    }
    public ServiceBigPhotoDTO toBigDto(ServiceModel service, byte[] photo) {
        return ServiceBigPhotoDTO.builder()
                .serviceId(service.getServiceId())
                .estimatedRepairTime(service.getEstimatedRepairTime())
                .name(service.getName())
                .type(service.getType())
                .cost(service.getCost())
                .isAvailable(service.getIsAvailable())
                .isFeatured(service.getIsFeatured())
                .description(service.getDescription())
                .bigPhoto(photo)
                .build();
    }
    @Override
    public void toEntity(ServiceDTO serviceDTO, ServiceModel service) {
        service.setName(serviceDTO.getName());
        service.setEstimatedRepairTime(serviceDTO.getEstimatedRepairTime());
        service.setCost(serviceDTO.getCost());
        service.setType(serviceDTO.getType());
        service.setIsAvailable(serviceDTO.getIsAvailable());
        service.setIsFeatured(serviceDTO.getIsFeatured());
        service.setDescription(serviceDTO.getDescription());
    }
}
