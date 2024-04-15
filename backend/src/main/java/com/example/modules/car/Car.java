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
@Table(name = "user_data")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String model;
    private int manufactured_year;
    private String license_plate;
    private String vin;
    private String color;
    private int mileage;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user_id;

}
