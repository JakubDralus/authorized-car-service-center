package com.example.modules.service;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "service")
public class ServiceModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serviceId;

    private Integer estimatedRepairTime;

    private String name;

    private String type;

    private Double cost;

    // should be ok?
//    @ManyToMany
//    private List<Ticket> tickets;
}
