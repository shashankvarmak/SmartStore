package com.smartstore.backend.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductRequest {

    private String name;

    private String description;

    private BigDecimal price;

    private Integer stockQuantity;
    private Integer minimumStock;

    private String imageUrl;

    private Long categoryId;
}


