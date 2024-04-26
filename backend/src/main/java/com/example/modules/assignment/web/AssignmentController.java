package com.example.modules.assignment.web;

import com.example.modules.assignment.AssignmentService;
import com.example.shared.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/assignments")
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
                .message("Assignment fetched.")
                .data(assignmentDTO)
                .build();
    }
    
    @PostMapping
    public ApiResponse<AssignmentDTO> create(@RequestBody AssignmentDTO assignmentDTO) {
        AssignmentDTO created = assignmentService.create(assignmentDTO);
        return ApiResponse.<AssignmentDTO>builder()
                .message("Assignment created.")
                .data(created)
                .build();
    }
    
    @PutMapping
    public ApiResponse<AssignmentDTO> update(@RequestBody AssignmentDTO assignmentDTO) {
        AssignmentDTO updated = assignmentService.update(assignmentDTO);
        return ApiResponse.<AssignmentDTO>builder()
                .message("Assignment changed.")
                .data(updated)
                .build();
    }
    
    @DeleteMapping("/{assignmentId}")
    public ApiResponse<?> delete(@PathVariable Long assignmentId) {
        assignmentService.delete(assignmentId);
        return ApiResponse.builder()
                .message("Assignment deleted.")
                .build();
    }
}
