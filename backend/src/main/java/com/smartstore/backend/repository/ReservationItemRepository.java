package com.smartstore.backend.repository;

import com.smartstore.backend.entity.ReservationItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationItemRepository
        extends JpaRepository<ReservationItem, Long> {
    List<ReservationItem> findByReservationId(Long id);
}

