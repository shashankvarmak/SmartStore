package com.smartstore.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ReservationResponse {

    private Long reservationId;

    private String customerName;

    private String customerEmail;

    private String status;

    private Double totalAmount;

    private LocalDateTime reservationDate;
}