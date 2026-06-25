package com.smartstore.backend.repository;

import com.smartstore.backend.entity.Reservation;
import com.smartstore.backend.enums.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Arrays;
import java.util.List;

public interface ReservationRepository
        extends JpaRepository<Reservation, Long> {

    List<Reservation> findByStatus(ReservationStatus status);
    List<Reservation> findByUserId(Long userId);


}

