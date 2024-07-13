package com.example.modules.reserved_hours;


import com.example.modules.reserved_hours.web.ReservedHoursDTO;
import com.example.shared.IMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ReservedHoursMapper implements IMapper<ReservedHours, ReservedHoursDTO> {
    
    @Override
    public ReservedHoursDTO toDto(ReservedHours reservedHours) {
        return ReservedHoursDTO.builder()
                .date(reservedHours.getDate())
                .hour(reservedHours.getHour())
                .build();
    }

    @Override
    public void toEntity(ReservedHoursDTO reservedHoursDTO, ReservedHours reservedHours){
        reservedHours.setDate(reservedHoursDTO.getDate());
        reservedHours.setHour(reservedHoursDTO.getHour());
    }
}
