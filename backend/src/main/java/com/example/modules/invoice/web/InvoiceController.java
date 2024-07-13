package com.example.modules.invoice.web;

import com.example.modules.invoice.InvoiceService;
import com.example.shared.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/invoices")
public class InvoiceController {
    private final InvoiceService invoiceService;

    @GetMapping
    public List<InvoiceDTO> getAll(){
        return invoiceService.getAll();
    }

    @GetMapping("/{invoiceId}")
    public ApiResponse<InvoiceDTO> get(@PathVariable Long invoiceId){
        InvoiceDTO invoiceDTO = invoiceService.get(invoiceId);
        return ApiResponse.<InvoiceDTO>builder()
                .message("Invoice Fetched")
                .data(invoiceDTO)
                .build();
    }

    @PostMapping
    public ApiResponse<InvoiceDTO> create(@RequestBody InvoiceDTO invoiceDTO){
        InvoiceDTO created = invoiceService.create(invoiceDTO);
        return ApiResponse.<InvoiceDTO>builder()
                .message("Invoice created")
                .data(created)
                .build();
    }

    @PutMapping
    public ApiResponse<InvoiceDTO> update(@RequestBody InvoiceDTO invoiceDTO){
        InvoiceDTO updated = invoiceService.update(invoiceDTO);
        return ApiResponse.<InvoiceDTO>builder()
                .message("Invoice updated")
                .data(updated)
                .build();
    }
    @DeleteMapping("/{invoiceId}")
    public ApiResponse<InvoiceDTO> delete(@PathVariable Long invoiceId){
        invoiceService.delete(invoiceId);
        return ApiResponse.<InvoiceDTO>builder()
                .message("Invoice deleted")
                .build();
    }
}
