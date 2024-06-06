package com.example.modules.reserved_hours;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "reserved_hours")
public class ReservedHours {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reserved_id;

    private LocalDate date;

    private String hour;
}
