import { useState, useEffect } from "react";

// API original

type TransaçãoPagamento = "Cartão de Crédito" | "Boleto";
type StatusTransação =
  | "Paga"
  | "Aguardando pagamento"
  | "Recusada pela operadora de cartão"
  | "Estornada";

interface TransaçãoAPI {
  Nome: string;
  ID: number;
  Data: string;
  Status: StatusTransação;
  Email: string;
  ["Valor (R$)"]: string;
  ["Forma de Pagamento"]: TransaçãoPagamento;
  ["Cliente Novo"]: number;
}

interface TransacaoNormalizada {
  Nome: string;
  ID: number;
  Data: string;
  Status: StatusTransação;
  Email: string;
  moeda: number | null;
  Pagamento: TransaçãoPagamento;
  novo: boolean;
}

export default function App() {
  const [transacoes, setTransacoes] = useState<TransacaoNormalizada[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://api.origamid.dev/json/transacoes.json"
        );
        const data: TransaçãoAPI[] = await response.json();
        if (!data) return;
        const transacoesNormalizadas = data.map(normalizarTransacao);
        setTransacoes(transacoesNormalizadas);
        console.log("Transações carregadas:", data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
  }, []);

  function normalizarTransacao(transacao: TransaçãoAPI): TransacaoNormalizada {
    return {
      Nome: transacao.Nome,
      ID: transacao.ID,
      Data: transacao.Data,
      Status: transacao.Status,
      Email: transacao.Email,
      moeda: moedaParaNumero(transacao["Valor (R$)"]),
      Pagamento: transacao["Forma de Pagamento"],
      novo: Boolean(transacao["Cliente Novo"]),
    };
  }

  function moedaParaNumero(moeda: string): number | null {
    const numero = Number(moeda.replaceAll(".", "").replace(",", "."));
    return isNaN(numero) ? null : numero;
  }

  const total = transacoes
    .map((item) => item.moeda)
    .filter((valor): valor is number => valor !== null)
    .reduce((acc, valor) => acc + valor, 0);

  const totalFormatado = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  
  const todasPagas = transacoes.filter((item) => item.Status === "Paga").length;
  
  const cartaoCredito = transacoes.filter((item) => item.Pagamento === "Cartão de Crédito").length;
  
  const boleto = transacoes.filter((item) => item.Pagamento === "Boleto").length;
 
  const recusada = transacoes.filter((item) => item.Status === "Recusada pela operadora de cartão").length;
  
  const estornada = transacoes.filter((item) => item.Status === "Estornada").length;
  
  const aguardandoPagamento = transacoes.filter((item) => item.Status === "Aguardando pagamento").length;

  
  return (
    <div>
      <h1>Estatísticas</h1>
      <div className="estatisticas">
        <p>
          Total: <span>{totalFormatado}</span>
        </p>
      </div>
      <div className="detalhes">
        <p>
          Boleto: <span>{boleto}</span>
        </p>
        <p>
          Cartão de Crédito: <span>{cartaoCredito}</span>
        </p>
        <p>
          Paga: <span>{todasPagas}</span>
        </p>
        <p>
          Recusada pela operadora de cartão: <span>{recusada}</span>
        </p>
        <p>
          Aguardando pagamento: <span>{aguardandoPagamento}</span>
        </p>
        <p>
          Estornada: <span>{estornada}</span>
        </p>
      </div>

      <h2>Dados</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Compra</th>
            <th>Forma de Pagamento</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transacoes.map((item) => (
            <tr key={item.ID}>
              <td>{item.Nome}</td>
              <td>{item.Email}</td>
              <td>
                {item.moeda?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>
              <td>{item.Pagamento}</td>
              <td>{item.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
