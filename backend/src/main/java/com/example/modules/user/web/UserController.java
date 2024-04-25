package com.example.modules.user.web;

import com.example.modules.ticket.web.TicketDTO;
import com.example.modules.user.UserService;
import com.example.shared.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("api/v1/users")
@RequiredArgsConstructor
//@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    
    private final UserService userService;
    
    @GetMapping()
    public List<UserDTO> getAll() {
        return userService.getAll();
    }
    
    @GetMapping("/{userId}")
    public UserDTO get(@PathVariable Long userId) {
        return userService.get(userId);
    }
    
    @GetMapping("/test/{userId}")
    public UserReadDTO getSmall(@PathVariable Long userId) {
        return userService.getSmallDTO(userId);
    }
    
    @PostMapping
    public UserDTO create(@RequestBody UserDTO userDTO) {
        return userService.create(userDTO);
    }
    
    @PutMapping
    public UserDTO update(@RequestBody UserDTO userDTO) {
        return userService.update(userDTO);
    }
    
    @DeleteMapping("/{userId}")
    public ApiResponse<TicketDTO> delete(@PathVariable Long userId) {
        userService.delete(userId);
        return ApiResponse.<TicketDTO>builder()
                .timeStamp(LocalDateTime.now())
                .message("User deleted")
                .build();
    }
}
