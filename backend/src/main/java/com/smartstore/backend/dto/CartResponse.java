package com.smartstore.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class CartResponse {

    private Long cartId;

    private List<CartItemResponse> items;

    private Integer totalItems;

    private Double totalAmount;
}