package com.example.modules.user;

import com.example.shared.IMapper;
import org.springframework.stereotype.Component;

@Component
public class UserMapper implements IMapper<User, UserDTO> {
    @Override
    public UserDTO toDto(User user) {
        return null;
    }
    
    @Override
    public User toEntity(UserDTO entityDto) {
        return null;
    }
}
