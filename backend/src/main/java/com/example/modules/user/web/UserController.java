package com.example.modules.user.web;

import com.example.modules.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
    
    @GetMapping("/test/{userId}")
    public UserSmallDTO getSmall(@PathVariable Long userId) {
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
    
    @DeleteMapping("{userId}")
    public Boolean delete(@PathVariable Long userId) {
        return userService.delete(userId);
    }
}
