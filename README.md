# 📊 Projeto de Análise de Transações com React e TypeScript

Este projeto foi desenvolvido como parte de um desafio para consumir uma API externa de transações financeiras, normalizar os dados recebidos e exibir estatísticas úteis ao usuário final.

## 🚀 Tecnologias Utilizadas

- ⚛️ **React**
- 💙 **TypeScript**
- 🌐 **Fetch API** (requisições HTTP)

## 🔧 Funcionalidade

A aplicação realiza as seguintes tarefas:

1. Consome os dados da API pública de transações:

2. Converte e normaliza os dados, por exemplo:
- Transforma strings monetárias (`R$ 1.234,56`) em `number`.
- Converte campos booleanos e datas se necessário.
3. Exibe estatísticas calculadas com base nos dados recebidos:

### 📈 Estatísticas Mostradas

- **Total de Valor Transacionado**
- **Quantidade por Forma de Pagamento**:
- Cartão de Crédito
- Boleto
- **Quantidade por Status**:
- Paga
- Recusada pela operadora de cartão
- Aguardando pagamento
- Estornada


## ▶️ Como Executar o Projeto

Clone o repositório: 
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio

npm install

npm run dev

http://localhost:5173

````
<img border="0" data-original-height="1080" data-original-width="1920" height="600" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj3pAu0XMbJS00wFm3StElMAnUiZoD4kfH0WWbLLtkdur0X8k0058BwZea5IU5WEqW9SREJnfPU3RS9CCGh06PhfwAy2BnQUO7fwnECOXSPpRHDytYjVR04C7jkI7sUpWaNc6RvlfZzZfjtdf7mol1C5lL1WghAVs0_WrHb7n_JQK3wxjcOsbZrGwi6NGWm/s1891/transcaoapi.png" width="1280" />

