package com.smartstore.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class ProductResponse {

    private Long id;

    private String name;

    private String description;

    private BigDecimal price;

    private Integer stockQuantity;
    private Integer minimumStock;
    private Integer reservedStock;
    private Integer availableStock;

    private String imageUrl;

    private Long categoryId;

    private String categoryName;
}


