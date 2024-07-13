package com.example.modules.auth;

import com.example.modules.auth.web.AuthRequestDTO;
import com.example.modules.auth.web.AuthResponseDTO;
import com.example.modules.auth.web.RegisterResponseDTO;
import com.example.modules.auth.web.RegisterUserDto;
import com.example.modules.user.Role;
import com.example.modules.user.User;
import com.example.modules.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;


@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final SimpleDateFormat isoFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
    
    
    // in other words - log in
    public AuthResponseDTO authenticate(AuthRequestDTO request) {
        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        
        User user = (User) authenticate.getPrincipal();
        String jwtToken = jwtService.generateToken(user);
        
        return AuthResponseDTO.builder()
                .token(jwtToken)
                .expirationDate(isoFormat.format(jwtService.extractExpiration(jwtToken)))
                .id(user.getUserId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole().name())
                .build();
    }
    
    
    public RegisterResponseDTO registerUser(RegisterUserDto userDto) {
        if(!userDto.getPassword().equals(userDto.getRePassword()))
            return RegisterResponseDTO.builder().message("Passwords do not match.").build();
            //todo: make api error response and delegate error with exception

        if (!isEmailAvailable(userDto.getEmail()))
            throw new BadCredentialsException("Email already taken");
        
        User user = User.builder()
                .firstName(userDto.getFirstName())
                .lastName(userDto.getLastName())
                .telephoneNumber(userDto.getTelephoneNumber())
                .email(userDto.getEmail())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .role(Role.USER)
                .address(null)
                .build();

        userRepository.save(user);

        return RegisterResponseDTO.builder().message("User succesfully registered.").build();
    }

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
    public Boolean isEmailAvailable(String providedEmail) {
        User user = userRepository.findByEmail(providedEmail).orElse(null);
        return user == null;
    }
}
