package com.example.modules.user.web;

import com.example.modules.address.web.AddressDTO;
import com.example.modules.user.Role;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class UserDTO {
    private Long userId;
    private String firstName;
    private String lastName;
    private String telephoneNumber;
    private String email;
    private LocalDateTime createdAt;
    private Role role;
    private AddressDTO address;
}
