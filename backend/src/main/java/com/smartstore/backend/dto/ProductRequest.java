package com.smartstore.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductRequest {

    private String name;

    private String description;

    private BigDecimal price;

    private Integer stockQuantity;
    @NotNull(message = "Minimum stock is required.")
    @Min(value = 0, message = "Minimum stock cannot be negative.")
    private Integer minimumStock;


    private String imageUrl;

    private Long categoryId;
}


