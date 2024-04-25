package com.example.modules.car.web;

import com.example.modules.car.CarService;
import com.example.shared.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/cars")
@RequiredArgsConstructor
public class CarController {
    private final CarService carService;
    @GetMapping()
    public List<CarDTO> getAll() {
        return carService.getAll();
    }

    @GetMapping("/{carId}")
    public CarDTO get(@PathVariable Long carId) {
        return carService.get(carId);
    }

    @PostMapping
    public CarDTO create(@RequestBody CarDTO carDTO) {
        return carService.create(carDTO);
    }

    @PutMapping
    public CarDTO update(@RequestBody CarDTO carDTO) {
        return carService.update(carDTO);
    }

    @DeleteMapping("/{carId}")
    public ApiResponse<?> delete(@PathVariable Long carId) {
        carService.delete(carId);
        return ApiResponse.builder().message("Car deleted").build();
    }
}
