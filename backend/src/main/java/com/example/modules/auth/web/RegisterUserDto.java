package com.example.modules.auth.web;

import com.example.modules.address.web.AddressDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterUserDto {
    private String firstName;
    private String lastName;
    private String telephoneNumber;
    private AddressDTO address;
    private String email;
    private String password;
}
