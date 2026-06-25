package com.smartstore.backend.controller;
import com.smartstore.backend.dto.ReservationResponse;
import com.smartstore.backend.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public ReservationResponse createReservation() {

        return reservationService.createReservation();
    }
    @GetMapping("/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public List<ReservationResponse> getPendingReservations() {

        return reservationService.getPendingReservations();
    }
    @PutMapping("/{reservationId}/ready")
    @PreAuthorize("hasRole('ADMIN')")
    public ReservationResponse markReady(
            @PathVariable Long reservationId) {

        return reservationService.markReady(reservationId);
    }
    @PutMapping("/{reservationId}/complete")
    @PreAuthorize("hasRole('ADMIN')")
    public ReservationResponse completeReservation(
            @PathVariable Long reservationId) {
        return reservationService
                .completeReservation(reservationId);
    }

}