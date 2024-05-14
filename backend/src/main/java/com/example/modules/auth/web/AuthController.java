package com.example.modules.auth.web;

import com.example.shared.ApiResponse;
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
    public ApiResponse<AuthResponseDTO> authenticate(@RequestBody AuthRequestDTO authRequestDto) {
        return ApiResponse.<AuthResponseDTO>builder()
                .message("Token created successfully.")
                .data(authService.authenticate(authRequestDto))
                .build();
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

    @PostMapping("/check-email")
    public ApiResponse<Boolean> checkEmail(@RequestParam String email){
        return ApiResponse.<Boolean>builder()
                .message("Email checked successfully.")
                .data(authService.isEmailAvailable(email))
                .build();
    }
}
