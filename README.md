📝 Cadastro de Usuários (Fullstack)
---
Este é um projeto completo (CRUD) desenvolvido para o gerenciamento de usuários. Ele permite criar, listar, editar e excluir registros de forma dinâmica, integrando um front-end moderno com um back-end robusto.

🚀 Tecnologias Utilizadas
---
Front-end: React.js, Vite, Axios.

Back-end: Node.js, Express.

Banco de Dados: Prisma (ORM) com SQLite.

Estilização: CSS Modules/Styled Components.

🛠️ Funcionalidades
---
Criação: Cadastro de usuários com Nome, Idade e E-mail.

Leitura: Listagem automática de usuários vinda da API ao carregar a página.

Edição: Ao clicar no ícone de editar, os dados do usuário são carregados no formulário para alteração.

Exclusão: Remoção de usuários do banco de dados com atualização instantânea da interface.

📦 Como rodar o projeto
---

1 - Clonar o repositório:
git clone https://github.com/Pedrosjm12/Projetos.git

2 - Configurar o Back-end:
cd Back-End
npm install
npx prisma migrate dev
node servidor.js

3 - Configurar o Front-end
Abra um novo terminal e entre na pasta do front:
cd Front-ends
npm install
npm run dev
