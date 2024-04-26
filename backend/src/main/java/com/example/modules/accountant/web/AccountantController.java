package com.example.modules.accountant.web;

import com.example.modules.accountant.AccountantService;
import com.example.shared.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/accountants")
public class AccountantController {
    private final AccountantService accountantService;

    @GetMapping()
    public List<AccountantDTO> getAll(){
        return accountantService.getAll();
    }

    @GetMapping("/{accountantId}")
    public AccountantDTO get(@PathVariable Long accountantId){
        return accountantService.get(accountantId);
    }

    @PostMapping
    public AccountantDTO create(@RequestBody AccountantDTO accountantDTO){
        return accountantService.create(accountantDTO);
    }

    @PutMapping
    public AccountantDTO update(@RequestBody AccountantDTO accountant){
        return accountantService.update(accountant);
    }

    @DeleteMapping("/{accountantId}")
    public ApiResponse<?> delete(@PathVariable Long accountantId){
        accountantService.delete(accountantId);
        return ApiResponse.builder()
                .message("Accountant deleted.")
                .build();
    }
}
