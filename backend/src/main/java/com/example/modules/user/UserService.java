package com.example.modules.user;

import com.example.modules.user.web.UserDTO;
import com.example.shared.IService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements IService<UserDTO> {
    
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    
    public List<UserDTO> getAll() {
        return userRepository.findAll().stream().map(userMapper::toDto).toList();
    }
    
    @Override
    public UserDTO get(Long id) {
        return userMapper.toDto(userRepository.findById(id).orElseThrow());
    }
    
    @Override
    public UserDTO create(UserDTO userDTO) {
        User user = new User();
        userMapper.toEntity(userDTO, user);
        user = userRepository.save(user);
        return userMapper.toDto(user);
    }
    
    @Override
    public UserDTO update(UserDTO userDTO) {
        User user = userRepository.getReferenceById(userDTO.getId());
        userMapper.toEntity(userDTO, user); // apply changes
        user = userRepository.save(user);
        return userMapper.toDto(user);
    }
    
    @Override
    public Boolean delete(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        else return false;
    }
    
//    @PostConstruct
//    public void setup() {
//        User user = User.builder()
//                .firstName("Adam")
//                .lastName("Wkładam")
//                .email("dupa@gmail.com")
//                .password("123")
//                .telephoneNumber("123456789")
//                .role(Role.valueOf("USER"))
//                .build();
//        userRepository.save(user);
//    }
}
