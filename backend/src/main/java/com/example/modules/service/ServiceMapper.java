package com.example.modules.service;

import com.example.modules.service.web.ServiceDTO;
import com.example.shared.IMapper;
import lombok.RequiredArgsConstructor;
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
                .build();
    }

    @Override
    public void toEntity(ServiceDTO serviceDTO, ServiceModel service) {
        service.setName(serviceDTO.getName());
        service.setEstimatedRepairTime(serviceDTO.getEstimatedRepairTime());
        service.setCost(serviceDTO.getCost());
        service.setType(serviceDTO.getType());
    }
}
