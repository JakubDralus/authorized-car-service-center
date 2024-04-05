package com.example.modules.user;

import com.example.shared.IService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements IService<User> {
    
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    
    @Override
    public User create(User data) {
        return null;
    }
    
    @Override
    public User get(Long id) {
        return null;
    }
    
    @Override
    public User update(User data) {
        return null;
    }
    
    @Override
    public Boolean delete(Long id) {
        return null;
    }
}
