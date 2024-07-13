package com.example.modules.invoice;

import com.example.modules.invoice.web.InvoiceDTO;
import com.example.shared.CrudService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InvoiceService implements CrudService<InvoiceDTO> {
    
    private final InvoiceRepository invoiceRepository;
    private final InvoiceMapper invoiceMapper;

    public List<InvoiceDTO> getAll(){
        return invoiceRepository.findAll().stream().map(invoiceMapper::toDto).toList();
    }

    @Override
    public InvoiceDTO get(Long id) {
        Invoice invoice = invoiceRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No match for id: " + id)
        );
        return invoiceMapper.toDto(invoice);
    }

    @Override
    public InvoiceDTO create(InvoiceDTO invoiceDTO) {
        Invoice invoice = new Invoice();
        invoiceMapper.toEntity(invoiceDTO,invoice);
        invoice = invoiceRepository.save(invoice);
        return invoiceMapper.toDto(invoice);
    }

    @Override
    public InvoiceDTO update(InvoiceDTO invoiceDTO) {
        Invoice invoice = invoiceRepository.findById(invoiceDTO.getInvoiceId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No match for id: " + invoiceDTO.getInvoiceId())
        );
        invoiceMapper.toEntity(invoiceDTO,invoice);
        invoice = invoiceRepository.save(invoice);
        return invoiceMapper.toDto(invoice);
    }

    @Override
    public void delete(Long id) {
        if(invoiceRepository.existsById(id)) invoiceRepository.deleteById(id);
        else throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Couldn't find the invoice.");
    }
}
