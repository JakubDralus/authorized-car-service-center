package com.example.modules.user.web;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserReadDTO {
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
}
