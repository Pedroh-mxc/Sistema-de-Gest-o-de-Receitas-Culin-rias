package com.recipebook.controller;

import com.recipebook.dto.RecipeDTO;
import com.recipebook.entity.Ingrediente;
import com.recipebook.entity.Recipe;
import com.recipebook.repository.RecipeRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/receitas")
public class RecipeController {

    private final RecipeRepository recipeRepository;

    public RecipeController(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    // GET /api/receitas - Listar todas (ordenadas por dataCadastro desc)
    @GetMapping
    public ResponseEntity<List<RecipeDTO>> listarTodas() {
        List<Recipe> receitas = recipeRepository.findAll();
        receitas.sort((a, b) -> b.getDataCadastro().compareTo(a.getDataCadastro()));
        List<RecipeDTO> dtos = receitas.stream().map(this::toDTO).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    // GET /api/receitas/{id} - Buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<RecipeDTO> buscarPorId(@PathVariable Long id) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Receita não encontrada"));
        return ResponseEntity.ok(toDTO(recipe));
    }

    // POST /api/receitas - Criar nova receita
    @PostMapping
    public ResponseEntity<RecipeDTO> criar(@Valid @RequestBody RecipeDTO dto) {
        // RN01: Nome único
        if (recipeRepository.existsByNomeIgnoreCase(dto.getNome())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Já existe uma receita com esse nome");
        }

        Recipe recipe = new Recipe();
        recipe.setNome(dto.getNome());
        recipe.setCategoria(dto.getCategoria());
        recipe.setTempoPreparo(dto.getTempoPreparo());
        recipe.setPorcoes(dto.getPorcoes());
        recipe.setModoPreparo(dto.getModoPreparo());

        // Converter List<String> para List<Ingrediente>
        if (dto.getIngredientes() != null) {
            List<Ingrediente> ingredientes = dto.getIngredientes().stream()
                    .map(desc -> new Ingrediente(desc, recipe))
                    .collect(Collectors.toList());
            recipe.setIngredientes(ingredientes);
        }

        Recipe salva = recipeRepository.save(recipe);
        return ResponseEntity.status(HttpStatus.CREATED).body(toDTO(salva));
    }

    // DELETE /api/receitas/{id} - Excluir receita
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (!recipeRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Receita não encontrada");
        }
        recipeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Mapper: Recipe -> RecipeDTO
    private RecipeDTO toDTO(Recipe recipe) {
        RecipeDTO dto = new RecipeDTO();
        dto.setId(recipe.getId());
        dto.setNome(recipe.getNome());
        dto.setCategoria(recipe.getCategoria());
        dto.setTempoPreparo(recipe.getTempoPreparo());
        dto.setPorcoes(recipe.getPorcoes());
        dto.setModoPreparo(recipe.getModoPreparo());
        dto.setDataCadastro(recipe.getDataCadastro());

        if (recipe.getIngredientes() != null) {
            List<String> descricoes = recipe.getIngredientes().stream()
                    .map(Ingrediente::getDescricao)
                    .collect(Collectors.toList());
            dto.setIngredientes(descricoes);
        } else {
            dto.setIngredientes(new ArrayList<>());
        }

        return dto;
    }
}
