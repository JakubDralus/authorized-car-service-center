package com.example.modules.accountant.web;

import com.example.modules.user.web.UserDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AccountantDTO {
    private Long accountantId;
    private Integer salary;
    private UserDTO user;
}
