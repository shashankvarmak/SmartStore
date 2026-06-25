package com.smartstore.backend.service;

import com.smartstore.backend.dto.DashboardResponse;
import com.smartstore.backend.enums.ReservationStatus;
import com.smartstore.backend.repository.CategoryRepository;
import com.smartstore.backend.repository.ProductRepository;
import com.smartstore.backend.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ReservationRepository reservationRepository;



    public DashboardResponse getDashboard() {

        long totalProducts = productRepository.count();

        long totalCategories = categoryRepository.count();

        long pendingReservations =
                reservationRepository.countByStatus(
                        ReservationStatus.PENDING);

        long completedReservations =
                reservationRepository.countByStatus(
                        ReservationStatus.COMPLETED);

        long cancelledReservations =
                reservationRepository.countByStatus(
                        ReservationStatus.CANCELLED);

        long lowStockProducts = getLowStockCount();

        return new DashboardResponse(
                totalProducts,
                totalCategories,
                pendingReservations,
                completedReservations,
                cancelledReservations,
                lowStockProducts
        );

    }
    private long getLowStockCount() {

        return productRepository.findAll()
                .stream()
                .filter(product ->
                        product.getStockQuantity()
                                <= product.getMinimumStock())
                .count();
    }
}



