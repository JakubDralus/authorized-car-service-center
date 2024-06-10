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
    public ApiResponse<List<AssignmentReadDTO>> getAll() {
        List<AssignmentReadDTO> assignmentReadDTOS = assignmentService.getAll();
        return ApiResponse.<List<AssignmentReadDTO>>builder()
                .message("Assignments fetched.")
                .data(assignmentReadDTOS)
                .build();
    }
    
    /**
     * Requires Bearer token to be sent with it. Then it extracts the mechanic credentials and
     * returns only his assignments.
     * @param bearerToken token of logged mechanic
     * @return the assignments that the mechanic is assigned to
     */
    @GetMapping("/my-tasks")
    public ApiResponse<List<AssignmentReadDTO>> getAllByMechanic(@RequestHeader("Authorization") String bearerToken) {
        List<AssignmentReadDTO> assignmentReadDTOS = assignmentService.getAllByMechanic(bearerToken);
        return ApiResponse.<List<AssignmentReadDTO>>builder()
                .message("%d assignments fetched.".formatted(assignmentReadDTOS.size()))
                .data(assignmentReadDTOS)
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
    
    @PutMapping("/{assignmentId}")
    public ApiResponse<AssignmentDTO> update(@RequestBody AssignmentDTO assignmentDTO, @PathVariable Long assignmentId) {
        assignmentDTO.setAssignmentId(assignmentId);
        AssignmentDTO updated = assignmentService.update(assignmentDTO);
        return ApiResponse.<AssignmentDTO>builder()
                .message("Assignment changed.")
                .data(updated)
                .build();
    }
    
    @PutMapping("/{id}/update-status/{status}")
    public ApiResponse<AssignmentDTO> update(@PathVariable Long id, @PathVariable String status) {
        AssignmentDTO updated = assignmentService.updateStatus(id, status);
        return ApiResponse.<AssignmentDTO>builder()
                .message("Assignment %d status changed to %s.".formatted(id, status))
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
