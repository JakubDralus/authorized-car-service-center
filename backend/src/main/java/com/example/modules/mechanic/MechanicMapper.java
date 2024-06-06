package com.example.modules.mechanic;


import com.example.modules.mechanic.web.MechanicDTO;
import com.example.modules.mechanic.web.MechanicReadDTO;
import com.example.modules.user.User;
import com.example.modules.user.UserMapper;
import com.example.modules.user.web.UserReadDTO;
import com.example.shared.IMapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MechanicMapper implements IMapper<Mechanic, MechanicDTO> {

    private final UserMapper userMapper;
    private final ModelMapper modelMapper;
    
    @Override
    public MechanicDTO toDto(Mechanic mechanic){
        return MechanicDTO.builder()
                .mechanicId(mechanic.getMechanicId())
                .specialization(mechanic.getSpecialization())
                .salary(mechanic.getSalary())
                .user(userMapper.toDto(mechanic.getUser()))
                .build();
    }
    
    public MechanicReadDTO toReadDto(Mechanic mechanic){
        return MechanicReadDTO.builder()
                .mechanicId(mechanic.getMechanicId())
                .specialization(mechanic.getSpecialization())
                .salary(mechanic.getSalary())
                .user(modelMapper.map(mechanic.getUser(), UserReadDTO.class))
                .build();
    }

    @Override
    public void toEntity(MechanicDTO mechanicDTO,Mechanic mechanic) {
        mechanic.setMechanicId(mechanicDTO.getMechanicId());
        mechanic.setSpecialization(mechanicDTO.getSpecialization());
        mechanic.setSalary(mechanicDTO.getSalary());
        setUser(mechanicDTO, mechanic);
    }

    private void setUser(MechanicDTO mechanicDTO, Mechanic mechanic) {
        User user = mechanic.getUser();
        if(user == null) user = new User();
        userMapper.toEntity(mechanicDTO.getUser(), user);
        mechanic.setUser(user);
    }
}
