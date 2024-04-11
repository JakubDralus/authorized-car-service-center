package com.example.modules.user;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_data")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String firstName;
    private String lastName;
    private String telephoneNumber;
    private String email;
    private String password;
    private String role;
    private LocalDateTime createdAt;
    
    @OneToOne
    @JoinColumn(name = "address_id")
    private Address addresses;
}
