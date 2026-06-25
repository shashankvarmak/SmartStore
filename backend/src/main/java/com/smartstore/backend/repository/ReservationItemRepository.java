package com.smartstore.backend.repository;

import com.smartstore.backend.entity.ReservationItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationItemRepository
        extends JpaRepository<ReservationItem, Long> {
}

