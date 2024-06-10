package com.example.modules.auth.web;

import com.example.modules.auth.AuthService;
import com.example.shared.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
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
    
    @PostMapping("/register/user")
    public ApiResponse<RegisterResponseDTO> registerUser(@RequestBody RegisterUserDto registerUserDto) {
        RegisterResponseDTO data = authService.registerUser(registerUserDto);
        return ApiResponse.<RegisterResponseDTO>builder()
                .message("Account created successfully!")
                .data(data)
                .build();
    }
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
