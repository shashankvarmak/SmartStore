package com.smartstore.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CartItemResponse {

    private Long cartItemId;

    private Long productId;

    private String productName;

    private Integer quantity;

    private Double price;

    private Double totalPrice;
}