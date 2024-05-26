package com.example.modules.mechanic.web;

import com.example.modules.user.web.UserReadDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class MechanicReadDTO {
    private Long mechanicId;
    private String specialization;
    private int salary;
    private UserReadDTO user;
}
