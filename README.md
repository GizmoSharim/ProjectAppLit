# 🚀 Nexup / Litiara - Plataforma de Engajamento Corporativo

![Status do Projeto](https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow)
![PHP](https://img.shields.io/badge/Backend-PHP-blue)
![MySQL](https://img.shields.io/badge/Database-MySQL-orange)
![Frontend](https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-green)

> Uma solução gamificada para aumentar a produtividade e o engajamento de colaboradores através de recompensas.

## 🖼️ Telas do Projeto

<div align="center">
  <img src="https://via.placeholder.com/600x300?text=Dashboard+Screen" alt="Dashboard" width="400">
  <img src="https://via.placeholder.com/600x300?text=Catalogo+Screen" alt="Catálogo" width="400">
</div>

## 📄 Sobre

O **Nexup** (codinome Litiara) é uma aplicação web desenvolvida para gerenciar o ciclo de recompensas em ambientes corporativos. O sistema permite que colaboradores acumulem pontos ao realizar tarefas e os troquem por prêmios reais em um catálogo exclusivo.

O projeto foca na experiência do usuário (UX) e na segurança dos dados, utilizando autenticação via banco de dados e validação de saldo em tempo real.

## ✨ Funcionalidades

- **🔐 Autenticação Segura:** Login via CPF e Senha com hash de verificação.
- **📊 Dashboard Interativo:** Visualização rápida de tarefas pendentes e status do usuário.
- **⭐ Sistema de Gamificação:**
  - Exibição de pontos em tempo real.
  - Avatar personalizado com iniciais.
- **🛍️ Catálogo de Recompensas:**
  - Vitrine de produtos/benefícios.
  - **Bloqueio Visual:** Itens ficam "cinzas" e bloqueados se o usuário não tiver saldo.
  - **Validação de Compra:** O sistema verifica o saldo no banco de dados antes de processar o resgate.
- **📱 Design Responsivo:** Interface adaptada para Desktop e Mobile.

## 🛠️ Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3 (Variáveis CSS, Flexbox/Grid), JavaScript (Fetch API, DOM Manipulation).
- **Backend:** PHP 8.x (Estruturado, PDO/MySQLi).
- **Banco de Dados:** MySQL.
- **Ferramentas:** XAMPP (Apache server), VS Code, Git.
