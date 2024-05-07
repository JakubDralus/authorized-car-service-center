package com.example.modules.auth;

import com.example.modules.auth.web.AuthRequestDTO;
import com.example.modules.auth.web.AuthResponseDTO;
import com.example.modules.user.User;
import com.example.modules.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.text.SimpleDateFormat;


@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    private final SimpleDateFormat isoFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
    
    
    // in other words - sign in
    public AuthResponseDTO authenticate(AuthRequestDTO request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        String jwtToken = jwtService.generateToken(user);
        
        return AuthResponseDTO.builder()
                .token(jwtToken)
                .role(user.getRole().name())
                .expirationDate(isoFormat.format(jwtService.extractExpiration(jwtToken)))
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .id(user.getUserId())
                .build();
    }
    
//    public RegisterResponseDTO registerUser(RegisterUserDto userDto) {
//        if (!isEmailAvailable(userDto.getEmail())) {
//            return RegisterResponseDTO.builder().message("email not available").build();
//        }
//
//        Role role = roleRepository.findById(1L).orElse(null);
//
//        User user = User.builder()
//                .firstName(userDto.getFirstName())
//                .lastName(userDto.getLastName())
//                .telephoneNumber(userDto.getTelephoneNumber())
//                .email(userDto.getEmail())
//                .password(passwordEncoder.encode(userDto.getPassword()))
//                .role(role)
//                .build();
//        userRepository.save(user);
//
//        Address address = new Address();
//        addressAssembler.toEntity(userDto.getAddress(), address);
//        address.setUser(user);
//        addressRepository.save(address);
//
//        user.getAddresses().add(address);
//
//        return RegisterResponseDTO.builder().message("success").build();
//    }
//
//    public RegisterResponseDTO registerAdmin(RegisterUserDto userDto) {
//        if (!isEmailAvailable(userDto.getEmail())) {
//            return RegisterResponseDTO.builder().message("email not available").build();
//        }
//        Role role = roleRepository.findById(4L).orElse(null);
//
//        User user = User.builder()
//                .firstName(userDto.getFirstName())
//                .lastName(userDto.getLastName())
//                .telephoneNumber(userDto.getTelephoneNumber())
//                .email(userDto.getEmail())
//                .password(passwordEncoder.encode(userDto.getPassword()))
//                .role(role)
//                .build();
//
//        userRepository.save(user);
//        return RegisterResponseDTO.builder().message("success").build();
//    }
    
    
    
    /**
     * checks if account with this email is already created
     * @param providedEmail email from registration form
     * @return true - if email available / no account with this email in database
     */
    private boolean isEmailAvailable(String providedEmail) {
        User user = userRepository.findByEmail(providedEmail).orElse(null);
        return user == null;
    }
}
