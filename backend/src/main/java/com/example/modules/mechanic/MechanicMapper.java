package com.example.modules.mechanic;


import com.example.modules.address.Address;
import com.example.modules.mechanic.web.MechanicDTO;
import com.example.modules.user.User;
import com.example.modules.user.UserMapper;
import com.example.modules.user.web.UserDTO;
import com.example.shared.IMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MechanicMapper implements IMapper<Mechanic, MechanicDTO> {

    private final UserMapper userMapper;
    @Override
    public MechanicDTO toDto(Mechanic mechanic){
        return MechanicDTO.builder()
                .mechanic_id(mechanic.getMechanic_id())
                .specialization(mechanic.getSpecialization())
                .salary(mechanic.getSalary())
                .user(userMapper.toDto(mechanic.getUser()))
                .build();
    }

    @Override
    public void toEntity(MechanicDTO mechanicDTO,Mechanic mechanic) {
        mechanic.setMechanic_id(mechanicDTO.getMechanic_id());
        mechanic.setSpecialization(mechanicDTO.getSpecialization());
        mechanic.setSalary(mechanicDTO.getSalary());
        mechanic.setUser(setUser(mechanicDTO, mechanic));
    }

    private User setUser(MechanicDTO mechanicDTO, Mechanic mechanic) {
        User user = mechanic.getUser();
        userMapper.toEntity(mechanicDTO.getUser(), user);
        return user;
    }

}
