package com.example.modules.user;

import com.example.modules.auth.JwtService;
import com.example.modules.user.web.UserDTO;

import com.example.modules.user.web.UserReadDTO;
import com.example.shared.CrudService;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements CrudService<UserDTO> {
    
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final ModelMapper modelMapper;
    private final JwtService jwtService;
    
    public List<UserDTO> getAll() {
        return userRepository.findAll().stream().map(userMapper::toDto).toList();
    }
    
    public UserDTO getLoggedUser(String token) {
        String email = jwtService.extractClaim(token.substring(7), Claims::getSubject);
        
        return userRepository.findByEmail(email).map(userMapper::toDto).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "user not found")
        );
    }
    
    @Override
    public UserDTO get(Long id) {
        return userMapper.toDto(userRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "user not present with id " + id)
        ));
    }
    
    public UserReadDTO getSmallDTO(Long id) {
        User user = userRepository.findById(id).orElseThrow();
        return modelMapper.map(user, UserReadDTO.class);
    }
    
    @Override
    public UserDTO create(UserDTO userDTO) {
        User user = new User();
        userMapper.toEntity(userDTO, user);
        user = userRepository.save(user);
        return userMapper.toDto(user);
    }
    
    @Transactional
    @Override
    public UserDTO update(UserDTO userDTO) {
        User user = userRepository.getReferenceById(userDTO.getUserId());
        userMapper.toEntity(userDTO, user);
        user = userRepository.save(user);
        return userMapper.toDto(user);
    }
    
    @Override
    public void delete(Long id) {
        if (userRepository.existsById(id)) userRepository.deleteById(id);
        else throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Couldn't find the user.");
    }
}
