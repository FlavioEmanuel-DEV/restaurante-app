export interface Reserva {
  id: number;
  nome: string;
  data: string;
  horario: string;
  qtdPessoas: number;
  status: string;
}

export interface MenuItem {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  imagem: string;
  disponivel: boolean;
  promocao: boolean;
  desconto: number;
  validoAte: string;
  ativa: boolean;
  qtdPessoas: number;
}

export interface Horario {
    hora: string;
    disponivel: boolean;
}

export interface Mesa {
    id: number;
    numero: string;
    status: string;
    posicao: { x: number; y: number };
    capacidade: number;
    horarios: Horario[];
}

export interface Pedido {
    id: number;
    cliente: string;
    descricao: string;
    // Adicione outros campos conforme necessário
} 

   // types.ts
   export interface Vaga {
    id: number;
    titulo: string;
    tipo: string;
    local: string;
    descricao: string;
    requisitos: string[];
    beneficios: string[];
}