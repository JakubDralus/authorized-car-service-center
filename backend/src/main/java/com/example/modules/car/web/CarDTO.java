package com.example.modules.car.web;

import com.example.modules.user.web.UserDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CarDTO {
    private Long id;
    private String model;
    private int manufactured_year;
    private String license_plate;
    private String vin;
    private String color;
    private int mileage;
    private UserDTO user;
}
