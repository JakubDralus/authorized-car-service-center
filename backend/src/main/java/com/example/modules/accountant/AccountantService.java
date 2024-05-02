package com.example.modules.accountant;

import com.example.modules.accountant.web.AccountantDTO;
import com.example.shared.CrudService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountantService implements CrudService<AccountantDTO> {
    private final AccountantRepository accountantRepository;
    private final AccountantMapper accountantMapper;

    public List<AccountantDTO> getAll() {
        return accountantRepository.findAll().stream().map(accountantMapper::toDto).toList();
    }
    @Override
    public AccountantDTO get(Long id) {
        return accountantMapper.toDto(accountantRepository.findById(id).orElseThrow());
    }
    @Override
    public AccountantDTO create(AccountantDTO accountantDTO) {
        Accountant accountant = new Accountant();
        accountantMapper.toEntity(accountantDTO,accountant);
        accountant = accountantRepository.save(accountant);
        return accountantMapper.toDto(accountant);
    }
    @Override
    public AccountantDTO update(AccountantDTO accountantDTO) {
        Accountant accountant = accountantRepository.findById(accountantDTO.getAccountantId()).orElseThrow();
        accountantMapper.toEntity(accountantDTO,accountant);
        accountant = accountantRepository.save(accountant);
        return accountantMapper.toDto(accountant);
    }
    @Override
    public void delete(Long id) {
        if(accountantRepository.existsById(id)) accountantRepository.deleteById(id);
        else throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Couldn't find the accountant.");
    }

}
