package com.example.modules.user.web;

import com.example.modules.address.web.AddressDTO;
import com.example.modules.user.Role;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
