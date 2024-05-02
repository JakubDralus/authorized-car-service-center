package com.example.modules.mechanic.web;


import com.example.modules.mechanic.MechanicService;
import com.example.modules.review.web.ReviewDTO;
import com.example.shared.ApiHttpResponse;
import com.example.shared.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("api/v1/mechanic")
@RequiredArgsConstructor
public class MechanicController {

    private final MechanicService mechanicService;

    @GetMapping
    public List<MechanicDTO> getAll(){
        return mechanicService.getAll();
    }

    @GetMapping("/{mechanicId}")
    public ApiResponse<MechanicDTO> get(@PathVariable Long mechanicId) {
        MechanicDTO mechanicDTO = mechanicService.get(mechanicId);
        return ApiResponse.<MechanicDTO>builder()
                .message("Mechanic fetched.")
                .data(mechanicDTO)
                .build();
    }
//    public MechanicDTO get(@PathVariable Long mechanicId){
//        return mechanicService.get(mechanicId);
//    }

    @PostMapping
    public ApiResponse<MechanicDTO> create(@RequestBody MechanicDTO mechanicDTO) {
        MechanicDTO created = mechanicService.create(mechanicDTO);
        return ApiResponse.<MechanicDTO>builder()
                .message("Mechanic created.")
                .data(created)
                .build();
    }

//    public MechanicDTO create(@RequestBody MechanicDTO mechanicDTO){
//        return mechanicService.create(mechanicDTO);
//    }

    @PutMapping
    public ApiResponse<MechanicDTO> update(@RequestBody MechanicDTO mechanicDTO) {
        MechanicDTO updated = mechanicService.update(mechanicDTO);
        return ApiResponse.<MechanicDTO>builder()
                .message("Mechanic updated.")
                .data(updated)
                .build();
    }
//    public MechanicDTO update(@RequestBody MechanicDTO mechanicDTO){
//        return mechanicService.update(mechanicDTO);
//    }

    @DeleteMapping("{mechanicId}")
    public ApiResponse<MechanicDTO> delete(@PathVariable Long mechanicId) {
        mechanicService.delete(mechanicId);
        return ApiResponse.<MechanicDTO>builder()
                .message("Mechanic deleted.")
                .build();
    }

//    public ResponseEntity<ApiHttpResponse> delete(@PathVariable Long mechanicId) {
//        mechanicService.delete(mechanicId);
//        return ResponseEntity.ok().body(ApiHttpResponse.builder()
//                .timeStamp(LocalDateTime.now().toString())
//                .message("Mechanic deleted")
//                .build());
//    }
}
