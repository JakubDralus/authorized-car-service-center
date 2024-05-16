package com.example.modules.invoice;

import com.example.modules.accountant.Accountant;
import com.example.modules.ticket.Ticket;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "invoice")
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long invoiceId;

    @ManyToOne
    @JoinColumn(name = "accountant_id")
    private Accountant accountant;

    @ManyToOne
    @JoinColumn(name = "ticket_id")
    private Ticket ticket;
}
