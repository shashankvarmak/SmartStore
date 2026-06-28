package com.smartstore.backend.controller;

import com.smartstore.backend.dto.AddToCartRequest;
import com.smartstore.backend.dto.CartResponse;
import com.smartstore.backend.dto.UpdateCartRequest;
import com.smartstore.backend.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping("/add")
    @PreAuthorize("hasRole('CUSTOMER')")
    public CartResponse addToCart(
            @RequestBody AddToCartRequest request) {

        return cartService.addToCart(request);
    }
    @GetMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public CartResponse getCart() {

        return cartService.getCart();
    }
    @PutMapping("/items/{cartItemId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public CartResponse updateCartItem(
            @PathVariable Long cartItemId,
            @RequestBody UpdateCartRequest request) {

        return cartService.updateCartItem(
                cartItemId,
                request.getQuantity()
        );
    }
    @DeleteMapping("/clear")
    @PreAuthorize("hasRole('CUSTOMER')")
    public CartResponse clearCart() {

        return cartService.clearCart();
    }
}