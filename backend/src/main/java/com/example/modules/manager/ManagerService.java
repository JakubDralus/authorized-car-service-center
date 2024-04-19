package com.example.modules.manager;

import com.example.modules.manager.web.ManagerDTO;
import com.example.modules.user.Role;
import com.example.shared.CrudService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class ManagerService implements CrudService<ManagerDTO> {
    
    private final ManagerRepository managerRepository;
    private final ManagerMapper managerMapper;
    private final ModelMapper modelMapper;
    
    @Override
    public ManagerDTO get(Long id) {
        Manager manager = managerRepository.findById(id).orElseThrow();
        return modelMapper.map(manager, ManagerDTO.class);
    }
    
    @Override
    public ManagerDTO create(ManagerDTO managerDTO) {
        Manager manager = new Manager();
        managerMapper.toEntity(managerDTO, manager);
        manager.getUser().setRole(Role.MANAGER);
        manager = managerRepository.save(manager);
        return modelMapper.map(manager, ManagerDTO.class);
    }
    
    @Override
    public ManagerDTO update(ManagerDTO managerDTO) {
        Manager manager = managerRepository.findById(managerDTO.getManagerId()).orElseThrow();
        managerMapper.toEntity(managerDTO, manager);
        manager.getUser().setRole(Role.MANAGER);
        manager = managerRepository.save(manager);
        return modelMapper.map(manager, ManagerDTO.class);
    }
    
    @Override
    public void delete(Long id) {
        if (managerRepository.existsById(id)) managerRepository.deleteById(id);
        else throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Couldn't find the manager.");
    }
}
