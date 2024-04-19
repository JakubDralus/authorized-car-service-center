package com.example.modules.car.web;

import com.example.modules.user.web.UserDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
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
