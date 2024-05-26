package com.example.modules.manager.web;

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
public class ManagerReadDTO {
    private Long managerId;
    private Integer salary;
    private UserReadDTO user;
}
