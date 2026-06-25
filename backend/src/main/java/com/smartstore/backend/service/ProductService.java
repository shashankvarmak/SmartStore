package com.smartstore.backend.service;

import com.smartstore.backend.dto.ProductRequest;
import com.smartstore.backend.dto.ProductResponse;
import com.smartstore.backend.entity.Category;
import com.smartstore.backend.entity.Product;
import com.smartstore.backend.exception.SmartStoreException;
import com.smartstore.backend.repository.CategoryRepository;
import com.smartstore.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductResponse createProduct(ProductRequest request) {

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() ->
                        new SmartStoreException(
                                "Category not found.",
                                HttpStatus.NOT_FOUND
                        ));

        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .stockQuantity(request.getStockQuantity())
                .minimumStock(request.getMinimumStock())
                .reservedStock(0)
                .imageUrl(request.getImageUrl())
                .category(category)
                .build();

        Product saved = productRepository.save(product);

        return mapToResponse(saved);
    }

    public Page<ProductResponse> getAllProducts(
            Pageable pageable) {
        return productRepository
                .findAll(pageable)
                .map(this::mapToResponse);
    }

    public ProductResponse getProductById(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new SmartStoreException(
                                "Product not found.",
                                HttpStatus.NOT_FOUND
                        ));

        return mapToResponse(product);
    }

    public ProductResponse updateProduct(
            Long id,
            ProductRequest request) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new SmartStoreException(
                                "Product not found.",
                                HttpStatus.NOT_FOUND
                        ));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() ->
                        new SmartStoreException(
                                "Category not found.",
                                HttpStatus.NOT_FOUND
                        ));

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStockQuantity(request.getStockQuantity());
        product.setMinimumStock(request.getMinimumStock());
        product.setImageUrl(request.getImageUrl());
        product.setCategory(category);

        Product updated = productRepository.save(product);

        return mapToResponse(updated);
    }

    public void deleteProduct(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new SmartStoreException(
                                "Product not found.",
                                HttpStatus.NOT_FOUND
                        ));

        productRepository.delete(product);
    }

    public List<ProductResponse> getLowStockProducts() {

        List<Product> products = productRepository.findAll();

        List<ProductResponse> lowStockProducts = new ArrayList<>();

        for (Product product : products) {

            if (product.getStockQuantity() <= product.getMinimumStock()) {
                lowStockProducts.add(mapToResponse(product));
            }
        }

        return lowStockProducts;
    }

    public ProductResponse addStock(
            Long id,
            Integer quantity) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new SmartStoreException(
                                "Product not found.",
                                HttpStatus.NOT_FOUND
                        ));

        product.setStockQuantity(
                product.getStockQuantity() + quantity
        );

        Product updated = productRepository.save(product);

        return mapToResponse(updated);
    }

    public ProductResponse reduceStock(
            Long id,
            Integer quantity) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new SmartStoreException(
                                "Product not found.",
                                HttpStatus.NOT_FOUND
                        ));

        if (product.getStockQuantity() < quantity) {
            throw new SmartStoreException(
                    "Insufficient stock.",
                    HttpStatus.BAD_REQUEST
            );
        }

        product.setStockQuantity(
                product.getStockQuantity() - quantity
        );

        Product updated = productRepository.save(product);

        return mapToResponse(updated);
    }
    public List<ProductResponse> searchProducts(String keyword){

        return productRepository
                .findByNameContainingIgnoreCase(keyword)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private ProductResponse mapToResponse(Product product) {

        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getStockQuantity(),
                product.getMinimumStock(),
                product.getReservedStock(),
                product.getStockQuantity() - product.getReservedStock(),
                product.getImageUrl(),
                product.getCategory().getId(),
                product.getCategory().getName()
        );
    }
}