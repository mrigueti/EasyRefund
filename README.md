# EasyRefund  

A empresa contratante, **Fortes Engenharia**, atua em um mercado dinâmico de construção civil, resultando em, para os funcionários, uma quantidade considerável de pedidos de reembolso. A necessidade de uma gestão eficiente desses pedidos tem sido um problema recorrente para a empresa, que atualmente depende de processos manuais e fragmentados. Esse processo resulta em atrasos na análise de pedidos, erros na aprovação de reembolsos, além de uma dificuldade geral em acompanhar o status das solicitações.  

Diante disso, o EasyRefund foi desenvolvido para centralizar e automatizar a gestão desses reembolsos.  

## 📚 Documentação

- [Documentação Oficial](https://1drv.ms/w/c/4ed1ea9f0f948f60/Eb4oIZI0jVlKgbZJKh6vSCMBTPHRljczK-0YZzuzz9Bzaw?e=pizQ0u)
- [Documento capa laranja](https://1drv.ms/w/c/4ed1ea9f0f948f60/EVqzs2ryQv9BlHuTHN6Wq5cB0_LsU3GFHFPkgx_yHUeAeA?e=fK72Wo)

## 🚀 Funcionalidades  

- Submissão de pedidos de reembolso com comprovantes em PDF, DOC, DOCX, JPEG, PNG, JPG, JFIF.  
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
   - Execute o **dump** SQL do banco de dados para criar as tabelas necessárias: "**./dump_default_easyrefund.sql**"
   - Configure o arquivo **./server/src/.env** de acordo com as configurações locais para o banco funcionar corretamente.

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

## ❗ Observações: ❗
   - Configure o arquivo **./server/src/.env** de acordo com as configurações locais para o banco funcionar corretamente.
   - O dump do banco vem com 3 usuários cadastrados por padrão: login:senha
   - gerente@gmail.com:123456
   - aprovador@gmail.com:123456
   - funcionario@gmail.com:123456

## 📜 Créditos  

Desenvolvido por:  
- Lucas Catanio  
- Maykel Rigueti  
- Gabryel Modesto  
# TCC-EasyRefund
