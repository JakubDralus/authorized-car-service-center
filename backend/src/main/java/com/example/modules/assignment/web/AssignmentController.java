package com.example.modules.assignment.web;

import com.example.modules.assignment.AssignmentService;
import com.example.shared.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("api/v1/assignments")
@RequiredArgsConstructor
public class AssignmentController {
    
    private final AssignmentService assignmentService;
    
    @GetMapping
    public ApiResponse<List<AssignmentDTO>> getAll() {
        List<AssignmentDTO> assignmentDTOS = assignmentService.getAll();
        return ApiResponse.<List<AssignmentDTO>>builder()
                .message("Assignments fetched.")
                .data(assignmentDTOS)
                .build();
    }
    
    @GetMapping("/{assignmentId}")
    public ApiResponse<AssignmentDTO> get(@PathVariable Long assignmentId) {
        AssignmentDTO assignmentDTO = assignmentService.get(assignmentId);
        return ApiResponse.<AssignmentDTO>builder()
                .timeStamp(LocalDateTime.now())
                .message("Assignment fetched.")
                .data(assignmentDTO)
                .build();
    }
    
    @PostMapping
    public AssignmentDTO create(@RequestBody AssignmentDTO assignmentDTO) {
        return assignmentService.create(assignmentDTO);
    }
    
    @PutMapping
    public AssignmentDTO update(@RequestBody AssignmentDTO assignmentDTO) {
        return assignmentService.update(assignmentDTO);
    }
    
    @DeleteMapping("/{assignmentId}")
    public ApiResponse<?> delete(@PathVariable Long assignmentId) {
        assignmentService.delete(assignmentId);
        return ApiResponse.builder()
                .message("Assignment deleted.")
                .build();
    }
}
