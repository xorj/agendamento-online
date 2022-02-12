## agendamento-online
Projeto desenvolvido para a Fase 2 - Edital 005/2022 do LAIS - Sistemas para Saúde: Perfil Front-end.

## Passos para instalar o projeto

Após clonar o repositório use:
```
npm install
```
para instalar as dependências.

Em seguida use:
```
npm run serve
```
para rodar o projeto e poder acessar as telas no navagador em http://localhost:8080/.

## observação:
Para uso completo das funcionalidades, é necessário antes clonar o repositório usado como back: https://github.com/rayronvictor/agendamento-exames-edital-05-22, após clonar também é necessário instalar as depências:
```
npm install
```
É necessário fazer um ajuste no arquivo "package.json" excluindo o parâmetro "--host 0.0.0.0", pois faz com que o back não seja acessível em http://localhost:3004. Por fim, basta usar:
```
npm start
```
E a aplicação deve rodar perfeitamente.
