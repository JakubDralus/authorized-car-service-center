package com.example.modules.mechanic.web;


import lombok.Builder;
import com.example.modules.user.web.UserDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MechanicDTO {
    private Long mechanicId;
    private String specialization;
    private int salary;
    private UserDTO user;
}
