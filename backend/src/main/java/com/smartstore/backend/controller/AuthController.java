package com.smartstore.backend.controller;

import com.smartstore.backend.dto.AuthResponse;
import com.smartstore.backend.dto.LoginRequest;
import com.smartstore.backend.dto.ProfileResponse;
import com.smartstore.backend.dto.RegisterRequest;
import com.smartstore.backend.entity.User;
import com.smartstore.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public AuthResponse register(
            @Valid @RequestBody RegisterRequest request) {

        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(
            @Valid @RequestBody LoginRequest request) {

        return authService.login(request);
    }

    @GetMapping("/profile")
    public ProfileResponse getProfile() {
        return authService.getProfile();
    }
}
