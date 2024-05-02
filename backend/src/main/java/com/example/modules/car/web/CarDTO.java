package com.example.modules.car.web;

import com.example.modules.user.web.UserDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class CarDTO {
    private Long carId;
    private String model;
    private Integer manufacturedYear;
    private String licensePlate;
    private String vin;
    private String color;
    private Integer mileage;
    private UserDTO owner;
}
