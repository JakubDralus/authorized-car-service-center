package com.example.modules.user.web;

import com.example.modules.user.UserService;
import com.example.shared.ApiHttpResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    
    @GetMapping("{userId}")
    public UserDTO get(@PathVariable Long userId) {
        return userService.get(userId);
    }
    
    @PostMapping
    public UserDTO create(@RequestBody UserDTO userDTO) {
        return userService.create(userDTO);
    }
    
    @PutMapping
    public UserDTO update(@RequestBody UserDTO userDTO) {
        return userService.update(userDTO);
    }
    
    @DeleteMapping("{userId}")
    public ResponseEntity<ApiHttpResponse> delete(@PathVariable Long userId) {
        userService.delete(userId);
        return ResponseEntity.ok().body(ApiHttpResponse.builder()
                    .timeStamp(LocalDateTime.now().toString())
                    .message("User deleted")
                    .build());
    }
}
