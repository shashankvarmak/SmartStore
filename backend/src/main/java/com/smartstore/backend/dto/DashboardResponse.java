package com.smartstore.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardResponse {

    private Long totalProducts;

    private Long totalCategories;

    private Long pendingReservations;

    private Long completedReservations;

    private Long cancelledReservations;

    private Long lowStockProducts;
}