package com.smartstore.backend.controller;

import com.smartstore.backend.dto.ProductRequest;
import com.smartstore.backend.dto.ProductResponse;
import com.smartstore.backend.dto.StockQuantityRequest;
import com.smartstore.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ProductResponse createProduct(
            @RequestBody ProductRequest request) {

        return productService.createProduct(request);
    }

    @GetMapping
    public List<ProductResponse> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ProductResponse getProductById(
            @PathVariable Long id) {

        return productService.getProductById(id);
    }

    @PutMapping("/{id}")
    public ProductResponse updateProduct(
            @PathVariable Long id,
            @RequestBody ProductRequest request) {

        return productService.updateProduct(id, request);
    }

    @DeleteMapping("/{id}")
    public String deleteProduct(
            @PathVariable Long id) {

        productService.deleteProduct(id);

        return "Product Deleted Successfully";
    }
    @GetMapping("/low-stock")
    public List<ProductResponse> getLowStockProducts() {

        return productService.getLowStockProducts();
    }
    @PutMapping("/{id}/add-stock")
    public ProductResponse addStock(
            @PathVariable Long id,
            @RequestBody StockQuantityRequest request) {

        return productService.addStock(
                id,
                request.getQuantity()
        );
    }
    @PutMapping("/{id}/reduce-stock")
    public ProductResponse reduceStock(
            @PathVariable Long id,
            @RequestBody StockQuantityRequest request) {

        return productService.reduceStock(
                id,
                request.getQuantity()
        );
    }
}

