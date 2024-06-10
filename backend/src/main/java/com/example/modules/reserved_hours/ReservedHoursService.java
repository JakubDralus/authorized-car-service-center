package com.example.modules.reserved_hours;

import com.example.modules.reserved_hours.web.ReservedHoursDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservedHoursService {

    private final ReservedHoursRepository reservedHoursRepository;
    private final ReservedHoursMapper reservedHoursMapper;

    public ReservedHoursDTO create(ReservedHoursDTO reservedHoursDTO) {
        ReservedHours reservedHours = new ReservedHours();
        reservedHoursMapper.toEntity(reservedHoursDTO, reservedHours);
        reservedHours = reservedHoursRepository.save(reservedHours);
        return reservedHoursMapper.toDto(reservedHours);
    }
    
    public List<ReservedHoursDTO> findReservedHoursForDate(LocalDate date) {
        List<ReservedHours> reservedHoursList = reservedHoursRepository.findReservedHoursForDate(date);
        return reservedHoursList.stream()
                .map(reservedHoursMapper::toDto)
                .collect(Collectors.toList());
    }
}

