package com.example.modules.mechanic;

import com.example.modules.mechanic.web.MechanicDTO;
import com.example.shared.CrudService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MechanicService implements CrudService<MechanicDTO> {

    private final MechanicRepository mechanicRepository;
    private final MechanicMapper mechanicMapper;

    public List<MechanicDTO> getAll() {
        return mechanicRepository.findAll().stream().map(mechanicMapper::toDto).toList();
    }

    @Override
    public MechanicDTO get(Long id) {
        return mechanicMapper.toDto(mechanicRepository.findById(id).orElseThrow());
    }

    @Override
    public MechanicDTO create(MechanicDTO mechanicDTO) {
        Mechanic mechanic = new Mechanic();
        mechanicMapper.toEntity(mechanicDTO, mechanic);
        mechanic = mechanicRepository.save(mechanic);
        return mechanicMapper.toDto(mechanic);
    }
  
    @Override
    public MechanicDTO update(MechanicDTO mechanicDTO){
        Mechanic mechanic = mechanicRepository.findById(mechanicDTO.getMechanicId()).orElseThrow();
        mechanicMapper.toEntity(mechanicDTO, mechanic);
        mechanic = mechanicRepository.save(mechanic);
        return mechanicMapper.toDto(mechanic);
    }

    @Override
    public void delete(Long id) {
        if(mechanicRepository.existsById(id)) {
            mechanicRepository.deleteById(id);
        }
        else throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Couldn't find the provided mechanic.");
    }
}
