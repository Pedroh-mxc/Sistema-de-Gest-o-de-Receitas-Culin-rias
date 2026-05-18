# RecipeBook — Backend (Spring Boot)

Sistema de Gestão de Receitas Culinárias — API REST desenvolvida com Spring Boot 3 + Java 17 + H2.

## Stack

| Camada       | Tecnologia                        |
|--------------|-----------------------------------|
| Framework    | Spring Boot 3.2.5                 |
| Linguagem    | Java 17                           |
| Banco de dados | H2 (in-memory)                  |
| ORM          | Spring Data JPA / Hibernate       |
| Validação    | Jakarta Bean Validation           |

## Relacionamento JPA

O projeto demonstra relacionamento **bidirecional** entre entidades:

- `Recipe` ← `@OneToMany` → `Ingrediente`
- `Ingrediente` ← `@ManyToOne` → `Recipe`

## Endpoints da API

| Método | Endpoint               | Descrição                     |
|--------|------------------------|-------------------------------|
| GET    | `/api/receitas`        | Listar todas as receitas      |
| GET    | `/api/receitas/{id}`   | Buscar receita por ID         |
| POST   | `/api/receitas`        | Criar nova receita            |
| DELETE | `/api/receitas/{id}`   | Excluir receita               |

## Como executar

### Pré-requisitos
- Java 17+
- Maven 3.8+

### Passos

```bash
# Clone o repositório
git clone <[url-do-repositorio](https://github.com/Pedroh-mxc/Sistema-de-Gest-o-de-Receitas-Culin-rias?authuser=6)>
cd recipebook-backend

# Execute
./mvnw spring-boot:run
```

A API estará disponível em: `http://localhost:8080`

Console H2: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:recipebook`
- Usuário: `sa`
- Senha: (vazio)

## Exemplo de Payload (POST /api/receitas)

```json
{
  "nome": "Brigadeiro",
  "categoria": "DOCE",
  "tempoPreparo": 30,
  "porcoes": 20,
  "ingredientes": [
    "1 lata de leite condensado",
    "1 colher de sopa de manteiga",
    "3 colheres de sopa de chocolate em pó",
    "Chocolate granulado"
  ],
  "modoPreparo": "Em uma panela, misture o leite condensado, a manteiga e o chocolate em pó. Mexa em fogo médio até desgrudar do fundo. Deixe esfriar e faça bolinhas. Passe no granulado."
}
```

## Regras de Negócio

- **RN01**: Nome da receita deve ser único
- **RN02**: `dataCadastro` preenchida automaticamente via `@PrePersist`
- **RN03**: Ingredientes armazenados em tabela separada (relação JPA)
- **RN04**: Categoria validada via enum (`DOCE`, `SALGADO`, `BEBIDA`, `SOBREMESA`)
- **RN05**: Tempo de preparo mínimo 1 minuto
- **RN06**: Porções mínimo 1

---

Prof. Esp. Jonatas Edward Dias de Oliveira — Faculdade SENAI
