package com.example.modules.accountant.web;

import com.example.modules.accountant.AccountantService;
import com.example.shared.ApiHttpResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("api/v1/accountants")
@RequiredArgsConstructor
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
    public ResponseEntity<ApiHttpResponse> delete(@PathVariable Long accountantId){
        accountantService.delete(accountantId);
        return ResponseEntity.ok().body(ApiHttpResponse.builder()
                .timeStamp(LocalDateTime.now().toString())
                .message("Accounant deleted")
                .build());
    }

}
