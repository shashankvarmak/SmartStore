package com.smartstore.backend.repository;

import com.smartstore.backend.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository
        extends JpaRepository<CartItem, Long> {
}