# API de Tarefas (Tasks) - Node.js

Este projeto consiste em uma API desenvolvida em Node.js para realizar operações CRUD (Create, Read, Update, Delete) de tarefas (tasks).

## Funcionalidades

A API oferece as seguintes funcionalidades:

- **Listar todas as tarefas:** Obter uma lista de todas as tarefas cadastradas.
- **Adicionar uma nova tarefa:** Criar uma nova tarefa.
- **Atualizar uma tarefa:** Atualizar os detalhes de uma tarefa existente com base em seu ID.
- **Excluir uma tarefa:** Remover uma tarefa existente com base em seu ID.
- **Marcar uma tarefa como completa ou incompleta:** Atualizar o estado de uma tarefa para completa ou incompleta.

## Tecnologias Utilizadas

- Node.js

## Configuração do Ambiente

1. Certifique-se de ter o Node.js instalado em seu sistema. Você pode baixá-lo em [nodejs.org](https://nodejs.org/).

2. Clone este repositório para o seu ambiente de desenvolvimento.

3. Instale as dependências do projeto utilizando o seguinte comando:
   npm install

4. Inicie o servidor utilizando o comando:
   npm run dev

O servidor estará acessível em `http://localhost:3333` por padrão.

## Rotas da API

- **GET /tasks:** Retorna todas as tarefas cadastradas.
- **POST /tasks:** Adiciona uma nova tarefa.
- **PUT /tasks/:id:** Atualiza os detalhes de uma tarefa existente com base em seu ID.
- **PATCH /tasks/:id/complete:** Marca uma tarefa como completa ou incompleta.
- **DELETE /tasks/:id:** Exclui uma tarefa existente com base em seu ID.

## Licença

Este projeto é licenciado sob a licença MIT.
