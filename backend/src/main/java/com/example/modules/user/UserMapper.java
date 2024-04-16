package com.example.modules.user;

import com.example.modules.address.Address;
import com.example.modules.address.AddressMapper;
import com.example.modules.user.web.UserDTO;
import com.example.shared.IMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserMapper implements IMapper<User, UserDTO> {
    
    private final AddressMapper addressMapper;
    
    @Override
    public UserDTO toDto(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .telephoneNumber(user.getTelephoneNumber())
                .email(user.getEmail())
                .createdAt(user.getCreatedAt())
                .role(user.getRole())
                .address(addressMapper.toDto(user.getAddress()))
                .build();
    }
    
    @Override
    public void toEntity(UserDTO userDTO, User user) {
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setTelephoneNumber(userDTO.getTelephoneNumber());
        user.setEmail(userDTO.getEmail());
        user.setRole(userDTO.getRole());
        user.setAddress(setAddress(userDTO, user));
    }
    
    private Address setAddress(UserDTO userDTO, User user) {
        Address address = user.getAddress();
        addressMapper.toEntity(userDTO.getAddress(), address);
        return address;
    }
}
