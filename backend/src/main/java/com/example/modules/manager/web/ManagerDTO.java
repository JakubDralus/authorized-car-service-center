package com.example.modules.manager.web;

import com.example.modules.user.web.UserDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class ManagerDTO {
    private Long managerId;
    private Integer salary;
    private UserDTO user;
}

