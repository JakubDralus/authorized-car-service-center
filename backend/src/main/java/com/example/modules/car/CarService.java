package com.example.modules.car;

import com.example.modules.car.web.CarDTO;
import com.example.shared.CrudService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CarService implements CrudService<CarDTO> {

    private final CarRepository carRepository;
    private final CarMapper carMapper;

    public List<CarDTO> getAll() {
        return carRepository.findAll().stream().map(carMapper::toDto).toList();
    }

    @Override
    public CarDTO get(Long id) {
        return carMapper.toDto(carRepository.findById(id).orElseThrow());
    }

    @Override
    public CarDTO create(CarDTO carDto) {
        Car car = new Car();
        carMapper.toEntity(carDto,car);
        car = carRepository.save(car);
        return carMapper.toDto(car);
    }

    @Override
    public CarDTO update(CarDTO carDTO) {
        Car car = carRepository.findById(carDTO.getCarId()).orElseThrow();
        carMapper.toEntity(carDTO,car);
        car = carRepository.save(car);
        return carMapper.toDto(car);
    }

    @Override
    public void delete(Long id) {
        if(carRepository.existsById(id)) carRepository.deleteById(id);
        else throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Couldn't find the car.");
    }
}
