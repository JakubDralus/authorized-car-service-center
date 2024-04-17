package com.example.modules.ticket;

import com.example.modules.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

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
    
    private LocalDateTime finishedAt;
    
    //todo
//    @ManyToMany
//    List<Service> services;
    
    @ManyToOne
    @JoinColumn(name="customer_id")
    private User customer;
    
//    @ManyToOne
//    @JoinColumn(name="vehicle_id")
//    private Vehicle vehicle;
    
    
    // status of the ticket seen by the user
    public enum Status {
        REQUESTED, // waiting for approval from manager
        PENDING,   // approved scheduled for work
        DOING,     // working on the car
        DONE,      // done working
        CLOSED,    // user picked up the car
    }
}
