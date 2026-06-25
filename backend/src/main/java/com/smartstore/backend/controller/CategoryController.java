package com.smartstore.backend.controller;

import com.smartstore.backend.dto.CategoryRequest;
import com.smartstore.backend.dto.CategoryResponse;
import com.smartstore.backend.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public CategoryResponse createCategory(
            @Valid @RequestBody CategoryRequest request) {

        return categoryService.createCategory(request);
    }
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','CUSTOMER')")
    public List<CategoryResponse> getAllCategories() {
        return categoryService.getAllCategories();
    }
    @PreAuthorize("hasAnyRole('ADMIN','CUSTOMER')")
    @GetMapping("/{id}")
    public CategoryResponse getCategoryById(
            @PathVariable Long id) {

        return categoryService.getCategoryById(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public CategoryResponse updateCategory(
            @PathVariable Long id,
            @Valid @RequestBody CategoryRequest request) {

        return categoryService.updateCategory(id, request);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteCategory(
            @PathVariable Long id) {

        categoryService.deleteCategory(id);

        return "Category Deleted Successfully";
    }
}