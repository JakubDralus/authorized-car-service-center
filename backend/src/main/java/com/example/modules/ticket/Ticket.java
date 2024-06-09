package com.example.modules.ticket;

import com.example.modules.car.Car;
import com.example.modules.reserved_hours.ReservedHours;
import com.example.modules.service.ServiceModel;
import com.example.modules.user.User;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ticket")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ticketId;
    
    private String description;
    private Integer fullCost;
    
    @Enumerated(EnumType.STRING)
    private Status status;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime lastUpdatedAt;

    @Nullable
    private LocalDateTime finishedAt;
    
    @ManyToOne
    @JoinColumn(name="customer_id")
    private User customer;
    
    @ManyToOne
    @JoinColumn(name="car_id")
    private Car car;

    @OneToOne
    @JoinColumn(name="reserved_id")
    private ReservedHours carReturnDate;
    
    @ManyToMany
    @JoinTable(
            name = "ticket_service",
            joinColumns = @JoinColumn(name = "ticket_id"),
            inverseJoinColumns = @JoinColumn(name = "service_id")
    )
    List<ServiceModel> services;
    
    // status of the ticket seen by the user
    public enum Status {
        REQUESTED, // waiting for approval from manager
        PENDING,   // approved scheduled for work
        DOING,     // working on the car
        DONE,      // done working
        CLOSED,    // user picked up the car
    }
}
