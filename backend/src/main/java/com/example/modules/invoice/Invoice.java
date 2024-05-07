package com.example.modules.invoice;

import com.example.modules.accountant.Accountant;
import com.example.modules.ticket.Ticket;
import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "invoice")
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "invoice_id")
    private Long invoiceId;

    @ManyToOne
    @JoinColumn(name = "accountant_id")
    private Accountant accountant;

    @ManyToOne
    @JoinColumn(name = "ticket_id")
    private Ticket ticket;
}
