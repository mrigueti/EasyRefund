# EasyRefund  

A empresa contratante, **Fortes Engenharia**, atua em um mercado dinâmico de construção civil, resultando em, para os funcionários, uma quantidade considerável de pedidos de reembolso. A necessidade de uma gestão eficiente desses pedidos tem sido um problema recorrente para a empresa, que atualmente depende de processos manuais e fragmentados. Esse processo resulta em atrasos na análise de pedidos, erros na aprovação de reembolsos, além de uma dificuldade geral em acompanhar o status das solicitações.  

Diante disso, o EasyRefund foi desenvolvido para centralizar e automatizar a gestão desses reembolsos.  

## 🚀 Funcionalidades  

- Submissão de pedidos de reembolso com comprovantes em PDF.  
- Acompanhamento do status das solicitações pelos funcionários.  
- Interface administrativa para análise e aprovação ou recusa dos pedidos.  
- Cadastro de novos usuários e monitoramento dos processos pelos gerentes.  
- Transparência e rastreabilidade no histórico de reembolsos.  

## 📦 Tecnologias  

- **Frontend:** React  
- **Backend:** Node.js  
- **Banco de Dados:** MySQL  

## 📥 Instalação  

1. Clone o repositório:  
   ```bash
   git clone https://github.com/mrigueti/EasyRefund.git
   ```  

2. Configure o banco de dados:  
   - Execute o **dump** SQL do banco de dados para criar as tabelas necessárias:  
     dump_default_easyrefund.sql

3. Configure o servidor:  
   ```bash
   cd server  
   npm install  
   cd src  
   node server.js  
   ```  

4. Configure o cliente:  
   ```bash
   cd client  
   npm install  
   npm start  
   ```  

## 📜 Créditos  

Desenvolvido por:  
- Lucas Catanio  
- Maykel Rigueti  
- Gabryel Modesto  
