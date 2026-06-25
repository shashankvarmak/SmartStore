package com.smartstore.backend.service;

import com.smartstore.backend.dto.AddToCartRequest;
import com.smartstore.backend.dto.CartItemResponse;
import com.smartstore.backend.dto.CartResponse;
import com.smartstore.backend.entity.*;
import com.smartstore.backend.repository.CartItemRepository;
import com.smartstore.backend.repository.CartRepository;
import com.smartstore.backend.repository.ProductRepository;
import com.smartstore.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

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
    private Product findProduct(Long productId) {

        return productRepository.findById(productId)
                .orElseThrow(() ->
                        new RuntimeException("Product not found"));
    }
    private void validateStock(Product product, Integer quantity) {

        int availableStock = product.getStockQuantity() - product.getReservedStock();

        if (quantity > availableStock) {
            throw new RuntimeException("Only " + availableStock + " items are available.");
        }
    }
    private void addOrUpdateCartItem(
            Cart cart,
            Product product,
            Integer quantity) {

        CartItem cartItem = cartItemRepository
                .findByCartIdAndProductId(cart.getId(), product.getId())
                .orElse(null);

        if (cartItem != null) {

            cartItem.setQuantity(cartItem.getQuantity() + quantity);

        } else {

            cartItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(quantity)
                    .build();
        }

        cartItemRepository.save(cartItem);
    }
    public CartResponse updateCartItem(
            Long cartItemId,
            Integer quantity) {

        CartItem cartItem = findCartItem(cartItemId);

        Product product = cartItem.getProduct();

        if (quantity < 0) {
            throw new RuntimeException("Quantity cannot be negative.");
        }

        if (quantity == 0) {

            Cart cart = cartItem.getCart();

            cartItemRepository.delete(cartItem);

            return buildCartResponse(cart);
        }

        validateStock(product, quantity);

        cartItem.setQuantity(quantity);

        cartItemRepository.save(cartItem);

        return buildCartResponse(cartItem.getCart());
    }
    private CartResponse buildCartResponse(Cart cart) {

        List<CartItem> cartItems = cartItemRepository.findByCartId(cart.getId());

        List<CartItemResponse> items = new ArrayList<>();

        double totalAmount = 0;

        for (CartItem cartItem : cartItems) {

            double totalPrice = cartItem.getQuantity()
                    * cartItem.getProduct().getPrice().doubleValue();

            totalAmount += totalPrice;

            items.add(new CartItemResponse(
                    cartItem.getId(),
                    cartItem.getProduct().getId(),
                    cartItem.getProduct().getName(),
                    cartItem.getQuantity(),
                    cartItem.getProduct().getPrice().doubleValue(),
                    totalPrice
            ));
        }

        return new CartResponse(
                cart.getId(),
                items,
                totalAmount
        );
    }
    public CartResponse addToCart(AddToCartRequest request) {

        User user = getLoggedInUser();

        Cart cart = getOrCreateCart(user);

        Product product = findProduct(request.getProductId());

        validateStock(product, request.getQuantity());

        addOrUpdateCartItem(cart, product, request.getQuantity());

        cart = cartRepository.findById(cart.getId())
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        return buildCartResponse(cart);
    }
    public CartResponse getCart() {

        User user = getLoggedInUser();

        Cart cart = getOrCreateCart(user);

        return buildCartResponse(cart);
    }
    private CartItem findCartItem(Long cartItemId) {

        return cartItemRepository.findById(cartItemId)
                .orElseThrow(() ->
                        new RuntimeException("Cart item not found"));
    }
    @Transactional
    public CartResponse clearCart() {

        User user = getLoggedInUser();

        Cart cart = getOrCreateCart(user);

        cartItemRepository.deleteByCartId(cart.getId());

        return buildCartResponse(cart);
    }

}