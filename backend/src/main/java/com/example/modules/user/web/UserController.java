package com.example.modules.user.web;

import com.example.modules.user.UserService;
import com.example.shared.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/users")
public class UserController {
    
    private final UserService userService;
    
    @GetMapping()
    public ApiResponse<List<UserDTO>> getAll() {
        List<UserDTO> users = userService.getAll();
        return ApiResponse.<List<UserDTO>>builder()
                .message("All users fetched")
                .data(users)
                .build();
    }
    
    @GetMapping("/me")
    public ApiResponse<UserDTO> getLoggedUser(@RequestHeader("Authorization") String bearerToken) {
        UserDTO user = userService.getLoggedUser(bearerToken);
        return ApiResponse.<UserDTO>builder()
                .message("User fetched")
                .data(user)
                .build();
    }
    
    @GetMapping("/{userId}")
    public ApiResponse<UserDTO> get(@PathVariable Long userId) {
        UserDTO user = userService.get(userId);
        return ApiResponse.<UserDTO>builder()
                .message("User fetched")
                .data(user)
                .build();
    }
    
    @GetMapping("/test/{userId}")
    public ApiResponse<UserReadDTO> getSmall(@PathVariable Long userId) {
        UserReadDTO userReadDTO = userService.getSmallDTO(userId);
        return ApiResponse.<UserReadDTO>builder()
                .message("Small user DTO fetched")
                .data(userReadDTO)
                .build();
    }
    
    @PostMapping
    public ApiResponse<UserDTO> create(@RequestBody UserDTO userDTO) {
        UserDTO createdUser = userService.create(userDTO);
        return ApiResponse.<UserDTO>builder()
                .message("User created")
                .data(createdUser)
                .build();
    }
    
    @PutMapping
    public ApiResponse<UserDTO> update(@RequestBody UserDTO userDTO) {
        UserDTO updatedUser = userService.update(userDTO);
        return ApiResponse.<UserDTO>builder()
                .message("User updated")
                .data(updatedUser)
                .build();
    }
    
    @DeleteMapping("/{userId}")
    public ApiResponse<Void> delete(@PathVariable Long userId) {
        userService.delete(userId);
        return ApiResponse.<Void>builder()
                .message("User deleted")
                .build();
    }
}
