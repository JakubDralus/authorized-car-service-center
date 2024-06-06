package com.example.modules.car;

import com.example.modules.user.User;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "car")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long carId;

    private String model;
    private Integer manufacturedYear;
    private String licensePlate;
    private String vin;
    private String color;
    private Integer mileage;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;
}
