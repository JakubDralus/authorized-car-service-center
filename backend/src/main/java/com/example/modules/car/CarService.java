package com.example.modules.car;

import com.example.modules.car.web.CarDTO;
import com.example.shared.IService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CarService implements IService<CarDTO> {
    private final CarRepository carRepository;
    private final CarMapper carMapper;

    public List<CarDTO> getAll() {
        return carRepository.findAll().stream().map(carMapper::toDto).toList();
    }

    @Override
    public CarDTO get(Long id){ return carMapper.toDto(carRepository.findById(id).orElseThrow());}

    @Override
    public CarDTO create(CarDTO carDto) {
        Car car = new Car();
        carMapper.toEntity(carDto,car);
        car = carRepository.save(car);
        return carMapper.toDto(car);
    }

    @Override
    public CarDTO update(CarDTO carDTO) {
        Car car = carRepository.getReferenceById(carDTO.getId());
        carMapper.toEntity(carDTO,car);
        car = carRepository.save(car);
        return carMapper.toDto(car);
    }

    @Override
    public Boolean delete(Long id) {
        if(carRepository.existsById(id)){
            carRepository.deleteById(id);
            return true;
        }
        else return false;
    }
}
