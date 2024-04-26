package com.example.modules.manager;

import com.example.modules.manager.web.ManagerDTO;
import com.example.modules.user.User;
import com.example.modules.user.UserMapper;
import com.example.modules.user.web.UserDTO;
import com.example.shared.IMapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ManagerMapper implements IMapper<Manager, ManagerDTO> {
    
    private final ModelMapper modelMapper;
    private final UserMapper userMapper;
    
    @Override
    public ManagerDTO toDto(Manager manager) {
        return ManagerDTO.builder()
                .managerId(manager.getManagerId())
                .salary(manager.getSalary())
                .user(modelMapper.map(manager.getUser(), UserDTO.class))
                .build();
    }
    
    @Override
    public void toEntity(ManagerDTO managerDTO, Manager manager) {
        manager.setSalary(managerDTO.getSalary());
        if (managerDTO.getUser() != null) setUserToManager(managerDTO, manager);
    }
    
    private void setUserToManager(ManagerDTO managerDTO, Manager manager) {
        User user = manager.getUser();
        if (user == null) user = new User();
        userMapper.toEntity(managerDTO.getUser(), user);
        manager.setUser(user);
    }
}
