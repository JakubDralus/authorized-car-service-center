package com.example.modules.car;

import com.example.modules.car.web.CarDTO;
import com.example.modules.user.User;
import com.example.modules.user.UserMapper;
import com.example.shared.IMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CarMapper implements IMapper<Car, CarDTO> {
    private final UserMapper userMapper;


    @Override
    public CarDTO toDto(Car car) {
        return CarDTO.builder()
                .id(car.getId())
                .model(car.getModel())
                .manufactured_year(car.getManufactured_year())
                .license_plate(car.getLicense_plate())
                .vin(car.getVin())
                .color(car.getColor())
                .mileage(car.getMileage())
                .user(userMapper.toDto(car.getUser()))
                .build();

    }

    @Override
    public void toEntity(CarDTO carDto, Car car) {
        car.setModel(carDto.getModel());
        car.setManufactured_year(carDto.getManufactured_year());
        car.setLicense_plate(carDto.getLicense_plate());
        car.setVin(carDto.getVin());
        car.setColor(carDto.getColor());
        car.setMileage(carDto.getMileage());
        car.setUser(setUser(carDto,car));
    }

    private User setUser(CarDTO carDTO, Car car){
        User user = car.getUser();
        userMapper.toEntity(carDTO.getUser(),user);
        return user;
    }
}
