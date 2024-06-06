package com.example.modules.invoice;

import com.example.modules.accountant.Accountant;
import com.example.modules.accountant.AccountantMapper;
import com.example.modules.accountant.AccountantRepository;
import com.example.modules.invoice.web.InvoiceDTO;
import com.example.modules.ticket.Ticket;
import com.example.modules.ticket.TicketMapper;
import com.example.modules.ticket.TicketRepository;
import com.example.shared.IMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class InvoiceMapper implements IMapper<Invoice, InvoiceDTO> {

    private final TicketRepository ticketRepository;
    private final TicketMapper ticketMapper;

    private final AccountantRepository accountantRepository;
    private final AccountantMapper accountantMapper;

    @Override
    public InvoiceDTO toDto(Invoice invoice) {
        return InvoiceDTO.builder()
                .invoiceId(invoice.getInvoiceId())
                .accountant(accountantMapper.toDto(invoice.getAccountant()))
                .ticket(ticketMapper.toDto(invoice.getTicket()))
                .build();
    }

    @Override
    public void toEntity(InvoiceDTO invoiceDto, Invoice invoice) {
        if (invoiceDto.getAccountant() != null) setAccountant(invoiceDto,invoice);
        if (invoiceDto.getTicket() != null) setTicket(invoiceDto,invoice);
    }

    private void setTicket(InvoiceDTO invoiceDto, Invoice invoice) {
        Ticket ticket = ticketRepository.findById(invoiceDto.getTicket().getTicketId()).orElseThrow();
        invoice.setTicket(ticket);
    }

    private void setAccountant(InvoiceDTO invoiceDto, Invoice invoice) {
        Accountant accountant = accountantRepository.findById(invoiceDto.getAccountant().getAccountantId()).orElseThrow();
        invoice.setAccountant(accountant);
    }
}
