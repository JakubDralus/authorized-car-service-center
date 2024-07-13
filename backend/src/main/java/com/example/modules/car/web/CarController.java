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
    public ApiResponse<CarDTO> get(@PathVariable Long carId) {
        return ApiResponse.<CarDTO>builder()
                .message("car edited.")
                .data(carService.get(carId))
                .build();
    }

    @PostMapping
    public ApiResponse<CarDTO> create(@RequestBody CarDTO carDTO) {
        return ApiResponse.<CarDTO>builder()
                .message("Car added.")
                .data(carService.create(carDTO))
                .build();
    }

    @PutMapping
    public ApiResponse<CarDTO> update(@RequestBody CarDTO carDTO) {
        return ApiResponse.<CarDTO>builder()
                .message("Car edited.")
                .data(carService.update(carDTO))
                .build();
    }

    @DeleteMapping("/{carId}")
    public ApiResponse<?> delete(@PathVariable Long carId) {
        carService.delete(carId);
        return ApiResponse.builder().message("Car deleted").build();
    }
}
