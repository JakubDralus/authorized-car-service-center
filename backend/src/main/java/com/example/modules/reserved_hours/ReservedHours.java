package com.example.modules.reserved_hours;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Data
@Getter
@Setter
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
