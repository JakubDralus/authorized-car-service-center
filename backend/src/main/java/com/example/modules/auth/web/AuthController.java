package com.example.modules.auth.web;

import lombok.RequiredArgsConstructor;
import com.example.modules.auth.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthService authService;
    
    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponseDTO> authenticate(@RequestBody AuthRequestDTO authRequestDto) {
        return ResponseEntity.ok(authService.authenticate(authRequestDto));
    }
    
//    @PostMapping("/register/user")
//    public ResponseEntity<RegisterResponseDTO> registerUser(@RequestBody RegisterUserDto registerUserDto) {
//        return ResponseEntity.ok(authService.registerUser(registerUserDto));
//    }
//
//    @PostMapping("/register/admin")
//    public ResponseEntity<RegisterResponseDTO> registerAdmin(@RequestBody RegisterUserDto registerUserDto) {
//        return ResponseEntity.ok(authService.registerAdmin(registerUserDto));
//    }
}
