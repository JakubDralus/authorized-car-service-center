package com.example.modules.assignment;

import com.example.modules.assignment.web.AssignmentDTO;
import com.example.modules.assignment.web.AssignmentReadDTO;
import com.example.shared.CrudService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AssignmentService implements CrudService<AssignmentDTO> {
    
    private final AssignmentRepository assignmentRepository;
    private final AssignmentMapper assignmentMapper;
    private final ModelMapper modelMapper;
    
    public List<AssignmentReadDTO> getAll() {
        return assignmentRepository.findAll()
                .stream()
                .map(assignmentMapper::toReadDto)
                .toList();
    }
    
    @Override
    public AssignmentDTO get(Long id) {
        Assignment assignment = assignmentRepository.findById(id).orElse(null);
        if (assignment == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No match for id: " + id);
        return assignmentMapper.toDto(assignment);
    }
    
    @Override
    public AssignmentDTO create(AssignmentDTO assignmentDTO) {
        Assignment assignment = new Assignment();
        assignmentMapper.toEntity(assignmentDTO, assignment);
        assignment = assignmentRepository.save(assignment);
        return modelMapper.map(assignment, AssignmentDTO.class);
    }
    
    @Override
    public AssignmentDTO update(AssignmentDTO assignmentDTO) {
        Assignment assignment = assignmentRepository.findById(assignmentDTO.getAssignmentId()).orElseThrow();
        assignmentMapper.toEntity(assignmentDTO, assignment);
        assignment = assignmentRepository.save(assignment);
        return modelMapper.map(assignment, AssignmentDTO.class);
    }
    
    @Override
    public void delete(Long id) {
        if (assignmentRepository.existsById(id)) assignmentRepository.deleteById(id);
        else throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Couldn't find the assignment.");
    }
}
