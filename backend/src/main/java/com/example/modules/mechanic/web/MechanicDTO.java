package com.example.modules.mechanic.web;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import com.example.modules.user.web.UserDTO;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class MechanicDTO {
    private Long mechanicId;
    private String specialization;
    private int salary;
    private UserDTO user;
}
