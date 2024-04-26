package com.example.modules.service;

import com.example.modules.service.web.ServiceDTO;
import com.example.shared.CrudService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


import java.util.List;

@Service
@RequiredArgsConstructor
public class ServiceService implements CrudService<ServiceDTO> {
    private final ServiceRepository serviceRepository;
    private final ModelMapper modelMapper;
    private final ServiceMapper serviceMapper;

    public List<ServiceDTO> getAll() {
        return serviceRepository.findAll()
                .stream()
                .map(service -> modelMapper.map(service, ServiceDTO.class))
                .toList();
    }

    @Override
    public ServiceDTO get(Long id){
        ServiceModel service = serviceRepository.findById(id).orElse(null);
        if(service==null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No match for id: " + id);
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
        if(serviceRepository.existsById(id)) serviceRepository.deleteById(id);
        else throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Specified service does not exist");
    }
}
