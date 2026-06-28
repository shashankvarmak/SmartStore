package com.smartstore.backend.service;

import com.smartstore.backend.dto.ReservationResponse;
import com.smartstore.backend.entity.*;
import com.smartstore.backend.enums.ReservationStatus;
import com.smartstore.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final ReservationItemRepository reservationItemRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private User getLoggedInUser() {

        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }
    private Cart getOrCreateCart(User user) {

        return cartRepository.findByUser(user)
                .orElseGet(() -> {

                    Cart cart = Cart.builder()
                            .user(user)
                            .build();

                    return cartRepository.save(cart);
                });
    }
    private List<CartItem> getCartItems(Cart cart) {

        return cartItemRepository.findByCartId(cart.getId());
    }
    private void validateCart(List<CartItem> cartItems) {

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty.");
        }
    }
    private void validateCartStock(List<CartItem> cartItems) {

        for (CartItem cartItem : cartItems) {

            Product product = cartItem.getProduct();

            int available =
                    product.getStockQuantity()
                            - product.getReservedStock();

            if (cartItem.getQuantity() > available) {

                throw new RuntimeException(
                        product.getName()
                                + " has only "
                                + available
                                + " items available."
                );
            }
        }
    }

    private Reservation createReservation(
            User user,
            List<CartItem> cartItems) {

        double totalAmount = 0;

        for (CartItem cartItem : cartItems) {

            totalAmount += cartItem.getQuantity()
                    * cartItem.getProduct().getPrice().doubleValue();
        }

        Reservation reservation = Reservation.builder()
                .user(user)
                .status(ReservationStatus.PENDING)
                .totalAmount(totalAmount)
                .build();

        return reservationRepository.save(reservation);
    }
    private ReservationResponse buildReservationResponse(
            Reservation reservation) {

        return new ReservationResponse(
                reservation.getId(),
                reservation.getUser().getName(),
                reservation.getUser().getEmail(),
                reservation.getStatus().name(),
                reservation.getTotalAmount(),
                reservation.getReservationDate()
        );
    }

    @Transactional
    public ReservationResponse createReservation() {

        User user = getLoggedInUser();

        Cart cart = getOrCreateCart(user);

        List<CartItem> cartItems = getCartItems(cart);

        validateCart(cartItems);

        validateCartStock(cartItems);

        Reservation reservation = createReservation(user, cartItems);

        createReservationItems(reservation, cartItems);

        updateReservedStock(cartItems);

        clearCart(cart);

        return buildReservationResponse(reservation);
    }
    private void createReservationItems(
            Reservation reservation,
            List<CartItem> cartItems) {

        for (CartItem cartItem : cartItems) {

            ReservationItem reservationItem = ReservationItem.builder()
                    .reservation(reservation)
                    .product(cartItem.getProduct())
                    .quantity(cartItem.getQuantity())
                    .priceAtReservation(cartItem.getProduct().getPrice().doubleValue())
                    .build();

            reservationItemRepository.save(reservationItem);
        }
    }
    private void updateReservedStock(List<CartItem> cartItems) {

        for (CartItem cartItem : cartItems) {

            Product product = cartItem.getProduct();

            product.setReservedStock(
                    product.getReservedStock() + cartItem.getQuantity()
            );

            productRepository.save(product);
        }
    }
    private void clearCart(Cart cart) {

        cartItemRepository.deleteByCartId(cart.getId());
    }
    private ReservationResponse mapToResponse(
            Reservation reservation) {

        return new ReservationResponse(
                reservation.getId(),
                reservation.getUser().getName(),
                reservation.getUser().getEmail(),
                reservation.getStatus().name(),
                reservation.getTotalAmount(),
                reservation.getReservationDate()
        );
    }
    @PreAuthorize("hasRole('ADMIN')")
    public List<ReservationResponse> getPendingReservations() {

        return reservationRepository
                .findByStatus(ReservationStatus.PENDING)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private Reservation findReservation(Long reservationId) {

        return reservationRepository.findById(reservationId)
                .orElseThrow(() ->
                        new RuntimeException("Reservation not found"));
    }
    @Transactional
    public ReservationResponse markReady(Long reservationId) {

        Reservation reservation = findReservation(reservationId);

        if (reservation.getStatus() != ReservationStatus.PENDING) {
            throw new RuntimeException(
                    "Only pending reservations can be marked as ready."
            );
        }

        reservation.setStatus(ReservationStatus.READY_FOR_PICKUP);

        reservationRepository.save(reservation);

        return mapToResponse(reservation);
    }
    private List<ReservationItem> getReservationItems(
            Reservation reservation) {

        return reservationItemRepository
                .findByReservationId(reservation.getId());
    }
    private void validateReadyReservation(
            Reservation reservation) {

        if (reservation.getStatus()
                != ReservationStatus.READY_FOR_PICKUP) {

            throw new RuntimeException(
                    "Only ready reservations can be completed."
            );
        }
    }
    private void completeInventoryUpdate(
            List<ReservationItem> reservationItems) {

        for (ReservationItem reservationItem : reservationItems) {

            Product product = reservationItem.getProduct();

            product.setStockQuantity(
                    product.getStockQuantity()
                            - reservationItem.getQuantity()
            );

            product.setReservedStock(
                    product.getReservedStock()
                            - reservationItem.getQuantity()
            );

            productRepository.save(product);
        }
    }
    @Transactional
    public ReservationResponse completeReservation(
            Long reservationId) {

        Reservation reservation =
                findReservation(reservationId);

        validateReadyReservation(reservation);

        List<ReservationItem> reservationItems =
                getReservationItems(reservation);

        completeInventoryUpdate(reservationItems);

        reservation.setStatus(
                ReservationStatus.COMPLETED);

        reservationRepository.save(reservation);

        return mapToResponse(reservation);
    }
    private void validateCancelableReservation(
            Reservation reservation) {

        if (reservation.getStatus() == ReservationStatus.COMPLETED ||
                reservation.getStatus() == ReservationStatus.CANCELLED) {

            throw new RuntimeException(
                    "This reservation cannot be cancelled.");
        }
    }
    private void releaseReservedStock(
            List<ReservationItem> reservationItems) {

        for (ReservationItem reservationItem : reservationItems) {

            Product product = reservationItem.getProduct();

            product.setReservedStock(
                    product.getReservedStock()
                            - reservationItem.getQuantity()
            );

            productRepository.save(product);
        }
    }
    @Transactional
    public ReservationResponse cancelReservation(
            Long reservationId) {

        Reservation reservation =
                findReservation(reservationId);

        validateCancelableReservation(reservation);

        List<ReservationItem> reservationItems =
                getReservationItems(reservation);

        releaseReservedStock(reservationItems);

        reservation.setStatus(ReservationStatus.CANCELLED);

        reservationRepository.save(reservation);

        return mapToResponse(reservation);
    }

    public List<ReservationResponse> getMyReservations() {

        User user = getLoggedInUser();

        return reservationRepository.findByUserId(user.getId())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

}