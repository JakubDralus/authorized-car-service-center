package com.example.modules.invoice.web;

import com.example.modules.accountant.web.AccountantDTO;
import com.example.modules.ticket.web.TicketDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class InvoiceDTO {
    private Long invoiceId;
    private AccountantDTO accountant;
    private TicketDTO ticket;
}
