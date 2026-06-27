package com.smartstore.backend.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductRequest {

    @NotBlank(message = "Product name is required.")
    private String name;

    @NotBlank(message = "Description is required.")
    private String description;

    @NotNull(message = "Price is required.")
    @DecimalMin(value = "0.01", message = "Price must be greater than 0.")
    private BigDecimal price;

    @NotNull
    (message = "Unit is required.")
    private String unit;

    @NotNull(message = "Stock quantity is required.")
    @Min(value = 0, message = "Stock quantity cannot be negative.")
    private Integer stockQuantity;

    @NotNull(message = "Minimum stock is required.")
    @Min(value = 0, message = "Minimum stock cannot be negative.")
    private Integer minimumStock;

    private String imageUrl;

    @NotNull(message = "Category is required.")
    private Long categoryId;
}


