package com.example.modules.accountant;

import com.example.modules.accountant.web.AccountantDTO;
import com.example.modules.user.User;
import com.example.modules.user.UserMapper;
import com.example.modules.user.UserRepository;
import com.example.shared.IMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AccountantMapper implements IMapper<Accountant, AccountantDTO> {
    private final UserMapper userMapper;
    private final UserRepository userRepository;

    @Override
    public AccountantDTO toDto(Accountant accountant) {
        return AccountantDTO.builder()
                .accountantId(accountant.getAccountantId())
                .salary(accountant.getSalary())
                .user(userMapper.toDto(accountant.getUser()))
                .build();
    }

    @Override
    public void toEntity(AccountantDTO accountantDTO, Accountant accountant) {
        accountant.setSalary(accountantDTO.getSalary());
        if(accountantDTO.getUser() != null) setUser(accountantDTO,accountant);
    }

    private void setUser(AccountantDTO accountantDTO, Accountant accountant) {
        User user = userRepository.findById(accountantDTO.getUser().getUserId()).orElseThrow();
        accountant.setUser(user);
    }
}
