package com.smartstore.backend.service;

import com.smartstore.backend.dto.AuthResponse;
import com.smartstore.backend.dto.LoginRequest;
import com.smartstore.backend.dto.ProfileResponse;
import com.smartstore.backend.dto.RegisterRequest;
import com.smartstore.backend.entity.User;
import com.smartstore.backend.enums.Role;
import com.smartstore.backend.repository.UserRepository;
import com.smartstore.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;


    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {

            return new AuthResponse("Email already exists",Role.CUSTOMER);
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.CUSTOMER)
                .build();

        userRepository.save(user);

        return new AuthResponse("Registration Successful",Role.CUSTOMER);

    }
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(token,user.getRole());
    }

    public ProfileResponse getProfile() {

        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        String email = authentication.getName();


        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));



        return new ProfileResponse(user.getId(),user.getName(), user.getPhoneNumber(), user.getEmail());
    }
}