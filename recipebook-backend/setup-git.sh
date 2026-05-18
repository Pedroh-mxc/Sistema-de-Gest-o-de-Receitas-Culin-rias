#!/bin/bash

# ============================================================
# RecipeBook - Script de Setup dos Repositórios Git
# Executar após criar os repositórios no GitHub
# ============================================================

# ---- CONFIGURAÇÃO: ajuste as URLs dos seus repositórios ----
BACKEND_REPO="https://github.com/SEU_USUARIO/recipebook-backend.git"
FRONTEND_REPO="https://github.com/SEU_USUARIO/recipebook-frontend.git"
# ------------------------------------------------------------

echo "=== Inicializando repositório BACKEND ==="
cd recipebook-backend

git init
git add .gitignore
git commit -m "chore: add gitignore"

git add pom.xml
git commit -m "chore: add pom.xml com dependências Spring Boot 3, JPA, H2, Validation"

git add src/main/resources/application.properties
git commit -m "chore: configurar H2 in-memory e porta 8080"

git add src/main/java/com/recipebook/entity/Categoria.java
git commit -m "feat: criar enum Categoria (DOCE, SALGADO, BEBIDA, SOBREMESA)"

git add src/main/java/com/recipebook/entity/Ingrediente.java
git commit -m "feat: criar entidade Ingrediente com @ManyToOne Recipe (JPA)"

git add src/main/java/com/recipebook/entity/Recipe.java
git commit -m "feat: criar entidade Recipe com @OneToMany Ingredientes e @PrePersist dataCadastro"

git add src/main/java/com/recipebook/dto/RecipeDTO.java
git commit -m "feat: criar RecipeDTO com validações Jakarta Bean Validation"

git add src/main/java/com/recipebook/repository/RecipeRepository.java
git commit -m "feat: criar RecipeRepository com busca por nome"

git add src/main/java/com/recipebook/config/CorsConfig.java
git commit -m "feat: configurar CORS para permitir requisições do frontend localhost:4200"

git add src/main/java/com/recipebook/controller/RecipeController.java
git commit -m "feat: implementar RecipeController com endpoints GET, POST, DELETE"

git add src/main/java/com/recipebook/RecipebookApplication.java
git commit -m "feat: criar classe principal RecipebookApplication"

git add README.md
git commit -m "docs: adicionar README com instruções de execução e exemplos de payload"

git branch -M main
git remote add origin $BACKEND_REPO
git push -u origin main

echo ""
echo "=== Inicializando repositório FRONTEND ==="
cd ../recipebook-frontend

git init
git add .gitignore
git commit -m "chore: add gitignore"

git add package.json tsconfig*.json angular.json
git commit -m "chore: configuração inicial Angular 17 Standalone Components"

git add src/index.html src/styles.css src/main.ts
git commit -m "chore: setup index.html, estilos globais e bootstrap da aplicação"

git add src/app/models/recipe.model.ts
git commit -m "feat: criar model Recipe com tipagem e constantes de Categoria"

git add src/app/services/recipe.service.ts
git commit -m "feat: criar RecipeService com métodos HTTP para a API"

git add src/app/app.routes.ts src/app/app.config.ts src/app/app.component.ts
git commit -m "feat: configurar roteamento lazy loading e AppComponent com navbar"

git add src/app/pages/recipe-list/recipe-list.component.ts
git commit -m "feat: implementar RecipeListComponent com busca em tempo real (US-01, US-02)"

git add src/app/pages/recipe-form/recipe-form.component.ts
git commit -m "feat: implementar RecipeFormComponent com FormArray dinâmico para ingredientes (US-03)"

git add src/app/pages/recipe-detail/recipe-detail.component.ts
git commit -m "feat: implementar RecipeDetailComponent com modal de confirmação de exclusão (US-04, US-05)"

git add README.md
git commit -m "docs: adicionar README com instruções de execução"

git branch -M main
git remote add origin $FRONTEND_REPO
git push -u origin main

echo ""
echo "✅ Repositórios inicializados e enviados ao GitHub com sucesso!"
echo ""
echo "Próximos passos:"
echo "  1. Crie as Issues no GitHub conforme HISTORIAS_GITHUB.md"
echo "  2. git checkout -b develop && git push -u origin develop (em cada repo)"
echo "  3. Para cada feature, crie o branch: git checkout -b feature/nome-da-feature"
