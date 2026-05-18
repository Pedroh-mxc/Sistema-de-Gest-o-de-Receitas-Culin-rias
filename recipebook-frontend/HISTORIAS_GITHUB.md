# Histórias de Usuário — RecipeBook v1.0

## Como criar no GitHub

Para cada história abaixo, crie uma **Issue** no repositório com o título e descrição indicados,
usando as labels sugeridas. Depois abra um **branch** e um **Pull Request** referenciando a issue
(ex.: `git commit -m "feat: listar receitas #1"`).

---

## US-01 · Listar Receitas
**Label:** `feature`, `backend`, `frontend`

**Como** usuário,
**quero** ver todas as receitas cadastradas em formato de cards,
**para** ter uma visão geral do meu catálogo culinário.

**Critérios de Aceite:**
- [ ] Exibir nome, categoria e tempo de preparo em cada card
- [ ] Receitas ordenadas por data de cadastro (mais recentes primeiro)
- [ ] Exibir "Nenhuma receita cadastrada" quando a lista estiver vazia
- [ ] Cada card deve ter link para a tela de detalhes

---

## US-02 · Buscar Receitas por Nome
**Label:** `feature`, `frontend`

**Como** usuário,
**quero** filtrar receitas pelo nome em tempo real,
**para** encontrar rapidamente o que preciso.

**Critérios de Aceite:**
- [ ] Campo de busca no topo da listagem
- [ ] Filtro case-insensitive
- [ ] Busca em tempo real (sem botão de submit)
- [ ] Exibir somente receitas que contenham o termo buscado no nome

---

## US-03 · Cadastrar Receita
**Label:** `feature`, `backend`, `frontend`

**Como** usuário,
**quero** cadastrar novas receitas através de um formulário,
**para** registrar minhas receitas culinárias.

**Critérios de Aceite:**
- [ ] Formulário com todos os campos obrigatórios (nome, categoria, tempo, porções, ingredientes, modo de preparo)
- [ ] Validação de campos antes de enviar
- [ ] Mensagens de erro específicas por campo
- [ ] Botão "Salvar" desabilitado quando o formulário estiver inválido
- [ ] Após salvar, redirecionar para a listagem
- [ ] Exibir mensagem de sucesso após cadastro

---

## US-04 · Visualizar Detalhes da Receita
**Label:** `feature`, `frontend`

**Como** usuário,
**quero** ver todos os detalhes de uma receita específica,
**para** seguir o modo de preparo completo.

**Critérios de Aceite:**
- [ ] Exibir todos os campos da receita
- [ ] Lista de ingredientes formatada com marcadores
- [ ] Modo de preparo com quebras de linha preservadas
- [ ] Botão para voltar à listagem
- [ ] Botão para excluir a receita

---

## US-05 · Excluir Receita
**Label:** `feature`, `backend`, `frontend`

**Como** usuário,
**quero** excluir receitas que não preciso mais,
**para** manter meu catálogo organizado.

**Critérios de Aceite:**
- [ ] Solicitar confirmação antes de excluir (modal)
- [ ] Após exclusão, redirecionar para a listagem
- [ ] Exibir mensagem de sucesso após exclusão
- [ ] Remover a receita do banco de dados (DELETE /api/receitas/{id})

---

## US-06 · Configuração Inicial do Projeto
**Label:** `setup`, `backend`, `frontend`

**Como** desenvolvedor,
**quero** ter os projetos backend e frontend configurados e executando,
**para** iniciar o desenvolvimento das funcionalidades.

**Critérios de Aceite:**
- [ ] Backend Spring Boot rodando na porta 8080
- [ ] Frontend Angular rodando na porta 4200
- [ ] CORS configurado para comunicação entre as duas apps
- [ ] Banco H2 configurado e acessível via console
- [ ] README com instruções de execução em ambos os projetos

---

## Sugestão de Branches

| Branch               | Issue  | Descrição                          |
|----------------------|--------|------------------------------------|
| `main`               | —      | Código em produção                 |
| `develop`            | —      | Integração contínua                |
| `feature/setup`      | US-06  | Config inicial                     |
| `feature/listar`     | US-01  | Endpoint GET + tela de listagem    |
| `feature/buscar`     | US-02  | Busca em tempo real                |
| `feature/cadastrar`  | US-03  | Endpoint POST + formulário         |
| `feature/detalhes`   | US-04  | Endpoint GET/{id} + tela detalhe   |
| `feature/excluir`    | US-05  | Endpoint DELETE + modal confirmação|
