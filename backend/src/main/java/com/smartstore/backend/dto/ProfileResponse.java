package com.smartstore.backend.dto;

import com.smartstore.backend.enums.Role;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ProfileResponse {

    private Long id;


    private String name;


    private String phoneNumber;

    
    private String email;


}
