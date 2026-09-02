# 🎮 Loja de Games

Projeto desenvolvido como **Prática Avaliada 09** durante o Bootcamp de Pessoa Desenvolvedora Full Stack Java da **Generation Brasil**.

A aplicação consiste em uma **Loja de Games** desenvolvida com React e TypeScript, consumindo uma API REST e permitindo gerenciamento de produtos e categorias, autenticação de usuários, busca de jogos e utilização de carrinho de compras.

---

## 🚀 Funcionalidades

- 🔐 Login e autenticação de usuários
- 👤 Cadastro de novos usuários
- 👤 Página de perfil
- 🎮 Listagem de produtos
- 🔎 Busca de jogos por nome
- ➕ Cadastro de produtos
- ✏️ Atualização de produtos
- 🗑️ Exclusão de produtos
- 📂 Listagem de categorias
- ➕ Cadastro de categorias
- ✏️ Atualização de categorias
- 🗑️ Exclusão de categorias
- 🛒 Carrinho de compras
- ➕ Adição de produtos ao carrinho
- ➖ Controle de quantidade dos produtos
- 🗑️ Remoção de produtos do carrinho
- 💰 Cálculo do valor total da compra
- ⭐ Produtos em destaque na página inicial
- 🔔 Notificações utilizando React Toastify
- 📱 Layout responsivo para desktop, tablet e dispositivos móveis

---

## 🛠️ Tecnologias utilizadas

### Front-end

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Context API
- React Toastify
- Phosphor Icons
- Day.js

### Back-end

A aplicação Front-end consome uma **API REST** responsável pelo gerenciamento dos usuários, produtos e categorias.

---

## 🧩 Principais recursos utilizados

Durante o desenvolvimento foram aplicados conceitos como:

- Componentização
- Props
- Hooks
- `useState`
- `useEffect`
- `useContext`
- `useNavigate`
- Context API
- Rotas com React Router
- Requisições HTTP
- Autenticação por Token
- CRUD
- Formulários controlados
- Validação de dados
- Responsividade
- Gerenciamento de estado do carrinho

---

## 🛒 Carrinho de Compras

O projeto possui um carrinho de compras utilizando a **Context API**, permitindo compartilhar o estado do carrinho entre diferentes componentes da aplicação.

O usuário pode:

- Adicionar jogos
- Alterar quantidades
- Remover produtos
- Visualizar o subtotal
- Visualizar o valor total da compra

---

## 🔎 Busca de Produtos

A barra de pesquisa permite localizar jogos através do nome.

A pesquisa utiliza o endpoint:

```text
GET /produtos/nome/{nome}
```

Os resultados são exibidos diretamente na página de produtos.

---

## 🔐 Autenticação

Algumas páginas da aplicação são protegidas e somente podem ser acessadas após o login.

O token do usuário é armazenado no contexto de autenticação e enviado nas requisições que necessitam de autorização.

---

## 📱 Responsividade

A interface foi desenvolvida utilizando os recursos responsivos do **Tailwind CSS**, adaptando o layout para diferentes tamanhos de tela.

Foram realizados testes em:

- Desktop
- Tablet
- Smartphones

---

## ▶️ Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/DaniChaves10/pratica_avaliada_09.git
```

### 2. Entre na pasta

```bash
cd pratica_avaliada_09
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Execute o projeto

```bash
npm run dev
```

### 5. Acesse no navegador

```text
http://localhost:5173
```

---

## 📦 Build de produção

Para gerar a versão de produção:

```bash
npm run build
```

Os arquivos serão gerados na pasta:

```text
dist
```

---

## 📁 Estrutura do Projeto

```text
src/
├── components/
│   ├── carrinho/
│   ├── categorias/
│   ├── footer/
│   ├── navbar/
│   └── produtos/
│
├── contexts/
│   ├── AuthContext
│   └── CartContext
│
├── models/
│
├── pages/
│   ├── cadastro/
│   ├── home/
│   ├── login/
│   └── perfil/
│
├── services/
│
└── App.tsx
```

---

## 👨‍💻 Autor

**Daniel Araujo Chaves**

Desenvolvedor Full Stack em formação, com foco em desenvolvimento de aplicações utilizando Java, Spring Boot, React e TypeScript.

### 🔗 Contato

- LinkedIn: `linkedin.com/in/daniel-araujo10`
- GitHub: `github.com/DaniChaves10`

---

## 🎓 Generation Brasil

Projeto desenvolvido para fins educacionais durante o Bootcamp **Pessoa Desenvolvedora Full Stack Java** da Generation Brasil.

---

⭐ Se você gostou do projeto, deixe uma estrela no repositório!