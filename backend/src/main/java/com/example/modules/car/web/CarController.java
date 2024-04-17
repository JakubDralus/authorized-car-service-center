package com.example.modules.car.web;

import com.example.modules.car.CarService;
import com.example.shared.ApiHttpResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("api/v1/cars")
@RequiredArgsConstructor
public class CarController {
    private final CarService carService;

    @GetMapping()
    public List<CarDTO> getAll(){ return carService.getAll();}

    @GetMapping("/{carId}")
    public CarDTO get(@PathVariable Long carId){return carService.get(carId);}

    @PostMapping
    public CarDTO create(@RequestBody CarDTO carDTO){
        return carService.create(carDTO);
    }
    @PutMapping
    public CarDTO update(@RequestBody CarDTO carDTO){
        return carService.update(carDTO);
    }

    @DeleteMapping("/{carId}")
    public ResponseEntity<ApiHttpResponse> delete(@PathVariable Long carId) {
        carService.delete(carId);
        return ResponseEntity.ok().body(ApiHttpResponse.builder()
                .timeStamp(LocalDateTime.now().toString())
                .message("Car deleted")
                .build());
    }


}
