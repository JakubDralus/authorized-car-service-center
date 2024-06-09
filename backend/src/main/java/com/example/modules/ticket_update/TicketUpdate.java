package com.example.modules.ticket_update;

import com.example.modules.ticket.Ticket;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ticket_update")
public class TicketUpdate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ticketUpdateId;
    
    private String description;
    
    @Enumerated(EnumType.STRING)
    private Severity severity;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @ManyToOne(optional = false)
    @JoinColumn(name = "ticket_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Ticket ticket;
    
    public enum Severity {
        INFO,
        MEDIUM,
        HIGH
    }
}
