# RecipeBook — Frontend (Angular)

Sistema de Gestão de Receitas Culinárias — SPA desenvolvida com Angular 17 Standalone Components.

## Stack

| Camada       | Tecnologia                              |
|--------------|-----------------------------------------|
| Framework    | Angular 17 (Standalone Components)      |
| Linguagem    | TypeScript 5.4                          |
| Formulários  | ReactiveFormsModule (FormArray dinâmico)|
| HTTP         | HttpClient                              |
| Roteamento   | Angular Router (lazy loading)           |

## Funcionalidades

- **Listagem** de receitas em cards com busca em tempo real (filtro case-insensitive sem botão)
- **Cadastro** com formulário reativo e validação campo a campo
- **Ingredientes dinâmicos** via `FormArray` — adicionar e remover em tempo real
- **Detalhes** completos da receita com modo de preparo
- **Exclusão** com modal de confirmação e toast de feedback
- Navegação via `RouterLink` / `Router`

## Estrutura

```
src/app/
├── models/
│   └── recipe.model.ts          # Interface Recipe + enums
├── services/
│   └── recipe.service.ts        # HTTP para a API
└── pages/
    ├── recipe-list/             # RF01 + RF02
    ├── recipe-form/             # RF03
    └── recipe-detail/           # RF04 + RF05
```

## Como executar

### Pré-requisitos
- Node.js 18+
- Angular CLI (`npm install -g @angular/cli`)

### Passos

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd recipebook-frontend

# Instale as dependências
npm install

# Execute
ng serve
```

Acesse: `http://localhost:4200`

> O backend precisa estar rodando em `http://localhost:8080` antes de iniciar o frontend.

---

Prof. Esp. Jonatas Edward Dias de Oliveira — Faculdade SENAI
