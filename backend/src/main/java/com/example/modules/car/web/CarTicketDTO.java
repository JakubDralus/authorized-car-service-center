package com.example.modules.car.web;

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
public class CarTicketDTO {
    private String model;
    private Integer manufacturedYear;
    private String licensePlate;
    private String vin;
    private String color;
    private Integer mileage;
}
