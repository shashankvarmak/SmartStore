package com.smartstore.backend.service;

import com.smartstore.backend.dto.CategoryRequest;
import com.smartstore.backend.dto.CategoryResponse;
import com.smartstore.backend.entity.Category;
import com.smartstore.backend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryResponse createCategory(
            CategoryRequest request) {

        if (categoryRepository.existsByName(request.getName())) {
            throw new RuntimeException("Category already exists");
        }

        Category category = Category.builder()
                .name(request.getName())
                .imageUrl(request.getImageUrl())
                .description(request.getDescription())
                .build();

        Category saved = categoryRepository.save(category);

        return new CategoryResponse(
                saved.getId(),
                saved.getName(),
                saved.getDescription(),
                saved.getImageUrl()
        );

    }


    public List<CategoryResponse> getAllCategories() {

        return categoryRepository.findAll()
                .stream()
                .map(category -> new CategoryResponse(
                        category.getId(),
                        category.getName(),
                        category.getDescription(),
                        category.getImageUrl()
                ))
                .toList();
    }

    public CategoryResponse getCategoryById(Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        return new CategoryResponse(
                category.getId(),
                category.getName(),
                category.getDescription(),
                category.getImageUrl()
        );
    }

    public CategoryResponse updateCategory(
            Long id,
            CategoryRequest request) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        category.setName(request.getName());
        category.setDescription(request.getDescription());
        category.setImageUrl(request.getImageUrl());

        Category updated = categoryRepository.save(category);

        return new CategoryResponse(
                updated.getId(),
                updated.getName(),
                updated.getDescription(),
                updated.getImageUrl()
        );
    }

    public void deleteCategory(Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        categoryRepository.delete(category);
    }
}