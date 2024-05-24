package com.example.modules.car;

import com.example.modules.car.web.CarDTO;
import com.example.modules.car.web.CarReadDTO;
import com.example.modules.user.User;
import com.example.modules.user.UserMapper;
import com.example.modules.user.UserRepository;
import com.example.shared.IMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CarMapper implements IMapper<Car, CarDTO> {
    
    private final UserMapper userMapper;
    private final UserRepository userRepository;

    @Override
    public CarDTO toDto(Car car) {
        return CarDTO.builder()
                .carId(car.getCarId())
                .model(car.getModel())
                .manufacturedYear(car.getManufacturedYear())
                .licensePlate(car.getLicensePlate())
                .vin(car.getVin())
                .color(car.getColor())
                .mileage(car.getMileage())
                .owner(userMapper.toDto(car.getOwner()))
                .build();
    }
    
    public CarReadDTO toReadDto(Car car) {
        return CarReadDTO.builder()
                .carId(car.getCarId())
                .model(car.getModel())
                .manufacturedYear(car.getManufacturedYear())
                .licensePlate(car.getLicensePlate())
                .build();
    }

    @Override
    public void toEntity(CarDTO carDto, Car car) {
        car.setModel(carDto.getModel());
        car.setManufacturedYear(carDto.getManufacturedYear());
        car.setLicensePlate(carDto.getLicensePlate());
        car.setVin(carDto.getVin());
        car.setColor(carDto.getColor());
        car.setMileage(carDto.getMileage());
        if(carDto.getOwner() != null) setUser(carDto,car);
    }

    private void setUser(CarDTO carDTO, Car car){
        User user = userRepository.findById(carDTO.getOwner().getUserId()).orElseThrow();
        car.setOwner(user);
    }
}
