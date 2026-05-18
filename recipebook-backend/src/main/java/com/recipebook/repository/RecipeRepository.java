package com.recipebook.repository;

import com.recipebook.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    Optional<Recipe> findByNomeIgnoreCase(String nome);
    boolean existsByNomeIgnoreCase(String nome);
}
