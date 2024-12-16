# Projeto

Este projeto foi desenvolvido em **Bun** e utiliza **Prisma** como ORM.
Siga as instruções abaixo para configurar e rodar a aplicação localmente.

## Requisitos

Certifique-se de ter os seguintes softwares instalados:

- [Bun](https://bun.sh/docs/installation)
- [Node.js](https://nodejs.org/) (caso o Bun dependa da sua instalação local do Node.js)
- [Prisma CLI](https://www.prisma.io/docs/concepts/components/prisma-cli)
- Banco de dados (por exemplo, PostgreSQL, MySQL, SQLite) conforme definido em seu `prisma/schema.prisma`

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone <url-do-repositorio>
   cd <nome-do-repositorio>
   ```

2. **Instale as dependências com o Bun:**

   ```bash
   bun install
   ```

3. **Configure o banco de dados:**

   - Altere as configurações do banco de dados no arquivo `.env` conforme necessário.

4. **Execute as migrações do Prisma:**

   ```bash
   bun prisma migrate dev
   ```

   Ou, se preferir apenas sincronizar o schema sem criar uma nova migração:

   ```bash
   bun prisma db push
   ```

## Executando o Projeto

Para rodar o projeto em modo de desenvolvimento, execute:

```bash
bun dev
```

A aplicação deve estar rodando em `http://localhost:3000` (ou na porta configurada).

## Comandos úteis

- **Gerar o cliente do Prisma:**

  ```bash
  bun prisma generate
  ```

- **Rodar as migrações em produção:**

  ```bash
  bun prisma migrate deploy
  ```

## Estrutura do Projeto

```bash
prisma/
└─ migrations/
    └─n_add_message_model_
└─ schema.prisma

src/
└─ ... (suas pastas e arquivos)
```

## Considerações Finais

Se encontrar algum problema durante a configuração ou execução, verifique os arquivos de configuração (`.env`, `schema.prisma`) ou consulte a documentação do Bun e do Prisma.
O projeto não funcionara sem o prisma db prush, o projeto tambem conta com uma simples autenticacao de onde puxarei a sua foto.

---

**Bom teste e obrigado por revisar o projeto!!**

