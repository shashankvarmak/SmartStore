package com.smartstore.backend.repository;

import com.smartstore.backend.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository
        extends JpaRepository<Reservation, Long> {
}

