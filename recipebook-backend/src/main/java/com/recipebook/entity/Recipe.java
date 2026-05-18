package com.recipebook.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "receitas")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 3, message = "Nome deve ter no mínimo 3 caracteres")
    @Column(nullable = false, unique = true)
    private String nome;

    @NotNull(message = "Categoria é obrigatória")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Categoria categoria;

    @NotNull(message = "Tempo de preparo é obrigatório")
    @Min(value = 1, message = "Tempo de preparo deve ser no mínimo 1 minuto")
    @Column(nullable = false)
    private Integer tempoPreparo;

    @NotNull(message = "Número de porções é obrigatório")
    @Min(value = 1, message = "Porções deve ser no mínimo 1")
    @Column(nullable = false)
    private Integer porcoes;

    // Relacionamento @OneToMany com entidade Ingrediente (JPA)
    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Ingrediente> ingredientes = new ArrayList<>();

    @NotBlank(message = "Modo de preparo é obrigatório")
    @Size(min = 10, message = "Modo de preparo deve ter no mínimo 10 caracteres")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String modoPreparo;

    @Column(nullable = false, updatable = false)
    private LocalDateTime dataCadastro;

    @PrePersist
    protected void onCreate() {
        this.dataCadastro = LocalDateTime.now();
    }

    // Getters e Setters
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

    public List<Ingrediente> getIngredientes() { return ingredientes; }
    public void setIngredientes(List<Ingrediente> ingredientes) {
        this.ingredientes.clear();
        if (ingredientes != null) {
            ingredientes.forEach(i -> i.setRecipe(this));
            this.ingredientes.addAll(ingredientes);
        }
    }

    public String getModoPreparo() { return modoPreparo; }
    public void setModoPreparo(String modoPreparo) { this.modoPreparo = modoPreparo; }

    public LocalDateTime getDataCadastro() { return dataCadastro; }
    public void setDataCadastro(LocalDateTime dataCadastro) { this.dataCadastro = dataCadastro; }
}
