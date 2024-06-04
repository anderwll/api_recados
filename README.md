# Recados API

## Descrição

A Recados API é uma aplicação construída utilizando Node.js, Express e uma base de dados em memória. Esta API permite a criação, leitura, atualização e exclusão de recados, além de permitir o cadastro e autenticação de usuários.

## Endpoints

### Rota padrão

**GET** `/`

Retorna uma mensagem de boas-vindas.

**Responses:**

- **200 OK**

```
Bem vindo a API de recados! 🚀
```

### Signup

**POST** `/signup`

Cria um novo usuário.

**Request Body:**

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Responses:**

- **201 CREATED**

```json
{
  "success": true,
  "message": "Usuário criado com successo!",
  "data": [
    {
      "id": "number",
      "name": "string",
      "email": "string",
      "password": "string"
    }
  ]
}
```

### Login

**POST** `/login`

Autentica um usuário existente.

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Responses:**

- **200 OK**

```json
{
  "success": true,
  "message": "Usuário logado com successo!",
  "data": {
    "id": "number",
    "name": "string",
    "email": "string"
  }
}
```

### Listar Usuários

**GET** `/users`

Retorna todos os usuários cadastrados.

**Responses:**

- **200 OK**

```json
{
  "success": true,
  "message": "Usuários buscados com sucesso!",
  "data": [
    {
      "id": "number",
      "name": "string",
      "email": "string",
      "password": "string"
    }
  ]
}
```

### Criar Recado

**POST** `/recados`

Cria um novo recado. Necessita de autenticação.

**Request Headers:**

```
Authorization: userId
```

**Request Body:**

```json
{
  "title": "string",
  "description": "string"
}
```

**Responses:**

- **201 CREATED**

```json
{
  "success": true,
  "message": "Recado criado com successo!",
  "data": [
    {
      "id": "number",
      "title": "string",
      "description": "string",
      "userId": "number"
    }
  ]
}
```

### Listar Recados

**GET** `/recados`

Retorna os recados do usuário autenticado com suporte a paginação.

**Request Headers:**

```
Authorization: userId
```

**Query Parameters:**

- `page`: Número da página (default: 1)
- `limit`: Limite de recados por página (default: 10)

**Responses:**

- **200 OK**

```json
{
  "success": true,
  "message": "Recado buscado com sucesso!",
  "data": {
    "recados": [
      {
        "id": "number",
        "title": "string",
        "description": "string",
        "userId": "number"
      }
    ],
    "total": "number"
  }
}
```

### Buscar Recado por ID

**GET** `/recados/:id`

Retorna um recado específico pelo ID. Necessita de autenticação.

**Request Headers:**

```
Authorization: userId
```

**Responses:**

- **200 OK**

```json
{
  "success": true,
  "message": "Recado buscado com sucesso!",
  "data": {
    "id": "number",
    "title": "string",
    "description": "string",
    "userId": "number"
  }
}
```

### Atualizar Recado

**PUT** `/recados/:id`

Atualiza um recado específico pelo ID. Necessita de autenticação.

**Request Headers:**

```
Authorization: userId
```

**Request Parameters:**

- `id`: ID do recado a ser atualizado (number)

**Request Body:**

```json
{
  "title": "string",
  "description": "string"
}
```

**Responses:**

- **200 OK**

```json
{
  "success": true,
  "message": "Recado atualizado com successo!",
  "data": {
    "id": "number",
    "title": "string",
    "description": "string",
    "userId": "number"
  }
}
```

### Deletar Recado

**DELETE** `/recados/:id`

Deleta um recado específico pelo ID. Necessita de autenticação.

**Request Headers:**

```
Authorization: userId
```

**Request Parameters:**

- `id`: ID do recado a ser deletado (number)

**Responses:**

- **200 OK**

```json
{
  "success": true,
  "message": "Recado deletado com sucesso!",
  "data": {
    "id": "number",
    "title": "string",
    "description": "string",
    "userId": "number"
  }
}
```
