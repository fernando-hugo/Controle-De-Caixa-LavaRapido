# Controle-De-Caixa-LavaRapido
# LavaRápido Pro | Controle

![LavaRápido Pro Banner](https://via.placeholder.com/800x200.png?text=LavaR%C3%A1pido+Pro)

Sistema completo para gestão de lava rápido, desenvolvido em **HTML, CSS e JavaScript**.  
Gerencie clientes, serviços, lavagens, pagamentos, gastos e relatórios em PDF de forma simples e prática.

---

## 🖥️ Interface do Sistema

### Dashboard Principal
![Dashboard GIF](https://via.placeholder.com/800x400.gif?text=Dashboard+LavaR%C3%A1pido+Pro)

- Visualização rápida das lavagens do dia, faturamento, clientes novos e média por carro.
- Botões de ação rápida para adicionar lavagens, clientes e serviços.

### Lavagens em Andamento
![Lavagens GIF](https://via.placeholder.com/800x400.gif?text=Lavagens+em+Andamento)

- Cadastro de nova lavagem (com ou sem cliente).
- Ações: Finalizar, Pagar, Editar e Excluir.

### Clientes e Serviços
![Clientes e Serviços GIF](https://via.placeholder.com/800x400.gif?text=Clientes+e+Servi%C3%A7os)

- Cadastro e gerenciamento de clientes e serviços.
- Serviços mais populares exibidos no dashboard.

### Gastos e Relatórios
![Gastos e Relatórios GIF](https://via.placeholder.com/800x400.gif?text=Gastos+e+Relat%C3%B3rios)

- Registro de gastos com dedução automática do faturamento.
- Relatórios Diário, Semanal e Mensal.
- Exportação em PDF, incluindo total bruto, gastos, taxa da máquina (3%) e total líquido.

---

## ⚡ Funcionalidades

- Dashboard com estatísticas em tempo real.
- Cadastro de clientes e serviços.
- Registro e gestão de lavagens.
- Controle de pagamentos e status das lavagens.
- Registro de gastos e dedução automática.
- Relatórios detalhados com exportação em PDF.
- Dados salvos localmente via `localStorage`.
- Responsivo: funciona em desktop, tablet e celular.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, TailwindCSS
- **JavaScript**: ES6, localStorage
- **Ícones**: Feather Icons
- **PDF**: jsPDF + jsPDF AutoTable

---

## 📂 Estrutura do Projeto

lava-rapido-pro/
│
├── index.html # Interface principal
├── style.css # Estilos da aplicação
├── app.js # Lógica do sistema
├── README.md # Documentação do projeto
└── assets/ # Imagens, ícones ou arquivos adicionais

---

## 🚀 Como Usar

1. **Clonar o repositório**
```bash
git clone https://github.com/seu-usuario/lava-rapido-pro.git
Abrir o projeto no navegador

Abra o arquivo index.html em qualquer navegador moderno.

Não requer servidor, pois todos os dados são salvos localmente.

Cadastrar clientes, serviços e lavagens

Utilize os botões da dashboard ou os modais para inserir informações.

Os relatórios podem ser exportados em PDF.

🔔 Observações

Dados locais: Sistema utiliza localStorage. Se o navegador limpar os dados, todas as informações serão perdidas.

Multiusuário: Para compartilhamento de dados entre dispositivos, é necessário adicionar back-end (Node.js + banco de dados).

PDF: Exportação em tabela, incluindo total bruto, gastos, taxa da máquina e total líquido.

🤝 Contribuição

Fork do projeto

Criar branch: git checkout -b minha-contribuicao

Commit das alterações: git commit -m "Minha contribuição"

Push para o branch: git push origin minha-contribuicao

Abrir Pull Request

📜 Licença

Licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

👤 Autor

Fernando Hugo Ferreira

GitHub: [https://github.com/seu-usuario](https://github.com/fernando-hugo)

E-mail: fernandohugoferreira@gmail.com
