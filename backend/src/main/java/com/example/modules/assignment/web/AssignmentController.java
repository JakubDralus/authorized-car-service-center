package com.example.modules.assignment.web;

import com.example.modules.assignment.AssignmentService;
import com.example.shared.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("api/v1/assignments")
@RequiredArgsConstructor
public class AssignmentController {
    
    private final AssignmentService assignmentService;
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<AssignmentDTO>>> getAll() {
        List<AssignmentDTO> assignmentDTOS = assignmentService.getAll();
        
        ApiResponse<List<AssignmentDTO>> responseBody = ApiResponse.<List<AssignmentDTO>>builder()
                .timeStamp(LocalDateTime.now())
                .message("Assignments fetched.")
                .data(assignmentDTOS)
                .build();
        return ResponseEntity.ok(responseBody);
    }
    
    @GetMapping("/{assignmentId}")
    public ResponseEntity<ApiResponse<AssignmentDTO>> get(@PathVariable Long assignmentId) {
        AssignmentDTO assignmentDTO = assignmentService.get(assignmentId);
        
        ApiResponse<AssignmentDTO> responseBody = ApiResponse.<AssignmentDTO>builder()
                .timeStamp(LocalDateTime.now())
                .message("Assignment fetched.")
                .data(assignmentDTO)
                .build();
        return ResponseEntity.ok(responseBody);
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
    public ResponseEntity<ApiResponse<?>> delete(@PathVariable Long assignmentId) {
        assignmentService.delete(assignmentId);
        ApiResponse<?> responseBody = ApiResponse.builder()
                .timeStamp(LocalDateTime.now())
                .message("Assignment deleted.")
                .build();
        return ResponseEntity.ok(responseBody);
    }
}
