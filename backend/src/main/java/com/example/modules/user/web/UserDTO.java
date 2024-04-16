package com.example.modules.user.web;

import com.example.modules.address.web.AddressDTO;
import com.example.modules.user.Role;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class UserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String telephoneNumber;
    private String email;
    private LocalDateTime createdAt;
    private Role role;
    private AddressDTO address;
}
