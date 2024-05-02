package com.example.modules.accountant;

import com.example.modules.user.User;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "accountant")
public class Accountant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "accountant_id")
    private Long accountantId;

    private Integer salary;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
