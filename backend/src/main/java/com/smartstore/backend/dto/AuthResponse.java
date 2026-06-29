package com.smartstore.backend.dto;

import com.smartstore.backend.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class AuthResponse {

    private String token;

    public Role role;
}