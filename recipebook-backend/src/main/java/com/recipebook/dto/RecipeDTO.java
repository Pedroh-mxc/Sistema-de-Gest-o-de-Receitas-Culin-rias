package com.recipebook.dto;

import com.recipebook.entity.Categoria;
import jakarta.validation.constraints.*;

import java.time.LocalDateTime;
import java.util.List;

public class RecipeDTO {

    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 3, message = "Nome deve ter no mínimo 3 caracteres")
    private String nome;

    @NotNull(message = "Categoria é obrigatória")
    private Categoria categoria;

    @NotNull(message = "Tempo de preparo é obrigatório")
    @Min(value = 1, message = "Tempo de preparo deve ser no mínimo 1 minuto")
    private Integer tempoPreparo;

    @NotNull(message = "Número de porções é obrigatório")
    @Min(value = 1, message = "Porções deve ser no mínimo 1")
    private Integer porcoes;

    @NotNull(message = "Ingredientes são obrigatórios")
    @Size(min = 1, message = "Deve ter no mínimo 1 ingrediente")
    private List<String> ingredientes;

    @NotBlank(message = "Modo de preparo é obrigatório")
    @Size(min = 10, message = "Modo de preparo deve ter no mínimo 10 caracteres")
    private String modoPreparo;

    private LocalDateTime dataCadastro;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public Categoria getCategoria() { return categoria; }
    public void setCategoria(Categoria categoria) { this.categoria = categoria; }

    public Integer getTempoPreparo() { return tempoPreparo; }
    public void setTempoPreparo(Integer tempoPreparo) { this.tempoPreparo = tempoPreparo; }

    public Integer getPorcoes() { return porcoes; }
    public void setPorcoes(Integer porcoes) { this.porcoes = porcoes; }

    public List<String> getIngredientes() { return ingredientes; }
    public void setIngredientes(List<String> ingredientes) { this.ingredientes = ingredientes; }

    public String getModoPreparo() { return modoPreparo; }
    public void setModoPreparo(String modoPreparo) { this.modoPreparo = modoPreparo; }

    public LocalDateTime getDataCadastro() { return dataCadastro; }
    public void setDataCadastro(LocalDateTime dataCadastro) { this.dataCadastro = dataCadastro; }
}
