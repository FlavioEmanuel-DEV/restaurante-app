import { useState } from 'react';
import { MenuItem } from '../types';
import { useCart } from '../contexts/CartContext';
import camarao from '../assets/images/download.jpeg';
import bruschetta from '../assets/images/download (1).jpeg';
import carpaccio from '../assets/images/download (2).jpeg';

// Dados de exemplo
const menuItems: MenuItem[] = [
  // Entradas
  {
    id: 1,
    nome: "Camarão à Milanesa",
    descricao: "Camarões empanados e fritos, servidos com molho tártaro",
    preco: 89.90,
    imagem: camarao,
    categoria: "Entradas",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 2,
    nome: "Bruschetta",
    descricao: "Pão italiano torrado com tomate, manjericão e azeite",
    preco: 25.90,
    imagem: bruschetta,
    categoria: "Entradas",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 3,
    nome: "Carpaccio",
    descricao: "Finas fatias de carne crua com rúcula e queijo parmesão",
    preco: 45.90,
    imagem: carpaccio,
    categoria: "Entradas",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 4,
    nome: "Bolinhos de Bacalhau",
    descricao: "Bolinhos fritos de bacalhau servidos com molho de pimenta",
    preco: 35.90,
    imagem: "/pratos/bolinho_bacalhau.jpg",
    categoria: "Entradas",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 5,
    nome: "Salada Caprese",
    descricao: "Tomate, mussarela de búfala e manjericão com azeite",
    preco: 30.90,
    imagem: "/pratos/caprese.jpg",
    categoria: "Entradas",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 6,
    nome: "Ceviche",
    descricao: "Peixe marinado em limão com cebola roxa e coentro",
    preco: 50.90,
    imagem: "/pratos/ceviche.jpg",
    categoria: "Entradas",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 7,
    nome: "Queijo Coalho",
    descricao: "Queijo coalho grelhado servido com mel de engenho",
    preco: 28.90,
    imagem: "/pratos/queijo_coalho.jpg",
    categoria: "Entradas",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 8,
    nome: "Coxinha de Frango",
    descricao: "Coxinhas crocantes recheadas com frango desfiado",
    preco: 18.90,
    imagem: "/pratos/coxinha.jpg",
    categoria: "Entradas",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 9,
    nome: "Pastel de Vento",
    descricao: "Pastel frito recheado com queijo e presunto",
    preco: 22.90,
    imagem: "/pratos/pastel.jpg",
    categoria: "Entradas",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 10,
    nome: "Iscas de Polvo",
    descricao: "Polvo grelhado com azeite e páprica",
    preco: 65.90,
    imagem: "/pratos/polvo.jpg",
    categoria: "Entradas",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },

  // Pratos Principais
  {
    id: 11,
    nome: "Salmão Grelhado",
    descricao: "Salmão grelhado com molho de alho e cebolinha",
    preco: 89.90,
    imagem: "/pratos/salmao.jpg",
    categoria: "Pratos Principais",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 12,
    nome: "Filé Mignon",
    descricao: "Filé mignon grelhado com molho de vinho tinto",
    preco: 120.90,
    imagem: "/pratos/file_mignon.jpg",
    categoria: "Pratos Principais",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 13,
    nome: "Frango à Parmegiana",
    descricao: "Filé de frango empanado com molho de tomate e queijo",
    preco: 55.90,
    imagem: "/pratos/frango_parmegiana.jpg",
    categoria: "Pratos Principais",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 14,
    nome: "Risoto de Cogumelos",
    descricao: "Risoto cremoso com cogumelos frescos",
    preco: 65.90,
    imagem: "/pratos/risoto.jpg",
    categoria: "Pratos Principais",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 15,
    nome: "Feijoada",
    descricao: "Feijoada completa com arroz, couve e farofa",
    preco: 70.90,
    imagem: "/pratos/feijoada.jpg",
    categoria: "Pratos Principais",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 16,
    nome: "Lasanha à Bolonhesa",
    descricao: "Lasanha com molho bolonhesa e queijo derretido",
    preco: 60.90,
    imagem: "/pratos/lasanha.jpg",
    categoria: "Pratos Principais",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 17,
    nome: "Peixe à Dorê",
    descricao: "Filé de peixe empanado e frito, servido com arroz",
    preco: 50.90,
    imagem: "/pratos/peixe_dore.jpg",
    categoria: "Pratos Principais",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 18,
    nome: "Strogonoff de Carne",
    descricao: "Strogonoff de carne com arroz e batata palha",
    preco: 58.90,
    imagem: "/pratos/strogonoff.jpg",
    categoria: "Pratos Principais",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 19,
    nome: "Espaguete Carbonara",
    descricao: "Espaguete com molho carbonara tradicional",
    preco: 45.90,
    imagem: "/pratos/carbonara.jpg",
    categoria: "Pratos Principais",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 20,
    nome: "Bobó de Camarão",
    descricao: "Bobó de camarão com arroz e farofa",
    preco: 85.90,
    imagem: "/pratos/bobo_camarao.jpg",
    categoria: "Pratos Principais",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },

  // Sobremesas
  {
    id: 21,
    nome: "Pudim de Leite",
    descricao: "Pudim de leite com calda de chocolate",
    preco: 18.90,
    imagem: "/pratos/pudim.jpg",
    categoria: "Sobremesas",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 22,
    nome: "Cheesecake",
    descricao: "Cheesecake com calda de morango",
    preco: 22.90,
    imagem: "/pratos/cheesecake.jpg",
    categoria: "Sobremesas",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 23,
    nome: "Mousse de Chocolate",
    descricao: "Mousse de chocolate cremoso",
    preco: 15.90,
    imagem: "/pratos/mousse.jpg",
    categoria: "Sobremesas",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 24,
    nome: "Torta de Limão",
    descricao: "Torta de limão com merengue",
    preco: 20.90,
    imagem: "/pratos/torta_limao.jpg",
    categoria: "Sobremesas",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 25,
    nome: "Sorvete de Creme",
    descricao: "Sorvete de creme com calda de caramelo",
    preco: 12.90,
    imagem: "/pratos/sorvete.jpg",
    categoria: "Sobremesas",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 26,
    nome: "Brigadeiro Gourmet",
    descricao: "Brigadeiro gourmet com granulado de chocolate",
    preco: 8.90,
    imagem: "/pratos/brigadeiro.jpg",
    categoria: "Sobremesas",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 27,
    nome: "Petit Gateau",
    descricao: "Bolo de chocolate com recheio cremoso",
    preco: 25.90,
    imagem: "/pratos/petit_gateau.jpg",
    categoria: "Sobremesas",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 28,
    nome: "Pavê de Chocolate",
    descricao: "Pavê de chocolate com biscoito champagne",
    preco: 18.90,
    imagem: "/pratos/pave.jpg",
    categoria: "Sobremesas",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 29,
    nome: "Banana Split",
    descricao: "Banana com sorvete, calda e chantilly",
    preco: 28.90,
    imagem: "/pratos/banana_split.jpg",
    categoria: "Sobremesas",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 30,
    nome: "Tiramisu",
    descricao: "Tiramisu tradicional italiano",
    preco: 24.90,
    imagem: "/pratos/tiramisu.jpg",
    categoria: "Sobremesas",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },

  // Bebidas
  {
    id: 31,
    nome: "Coca-Cola",
    descricao: "Coca-Cola 350ml",
    preco: 8.90,
    imagem: "/pratos/coca.jpg",
    categoria: "Bebidas",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 32,
    nome: "Suco de Laranja",
    descricao: "Suco natural de laranja",
    preco: 12.90,
    imagem: "/pratos/suco_laranja.jpg",
    categoria: "Bebidas",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 33,
    nome: "Água Mineral",
    descricao: "Água mineral sem gás 500ml",
    preco: 5.90,
    imagem: "/pratos/agua.jpg",
    categoria: "Bebidas",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 34,
    nome: "Caipirinha",
    descricao: "Caipirinha de cachaça com limão",
    preco: 18.90,
    imagem: "/pratos/caipirinha.jpg",
    categoria: "Bebidas",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 35,
    nome: "Vinho Tinto",
    descricao: "Vinho tinto seco 750ml",
    preco: 120.90,
    imagem: "/pratos/vinho_tinto.jpg",
    categoria: "Bebidas",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 36,
    nome: "Cerveja Artesanal",
    descricao: "Cerveja artesanal IPA 500ml",
    preco: 25.90,
    imagem: "/pratos/cerveja.jpg",
    categoria: "Bebidas",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 37,
    nome: "Chá Gelado",
    descricao: "Chá gelado de pêssego",
    preco: 10.90,
    imagem: "/pratos/cha_gelado.jpg",
    categoria: "Bebidas",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 38,
    nome: "Refrigerante Guaraná",
    descricao: "Guaraná Antarctica 350ml",
    preco: 8.90,
    imagem: "/pratos/guarana.jpg",
    categoria: "Bebidas",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 39,
    nome: "Milkshake",
    descricao: "Milkshake de chocolate",
    preco: 22.90,
    imagem: "/pratos/milkshake.jpg",
    categoria: "Bebidas",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  },
  {
    id: 40,
    nome: "Café Expresso",
    descricao: "Café expresso tradicional",
    preco: 6.90,
    imagem: "/pratos/cafe.jpg",
    categoria: "Bebidas",
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: "",
    ativa: true,
    qtdPessoas: 0,
  }
];


export default function Cardapio() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Entradas");
  const categorias = ["Entradas", "Pratos Principais", "Sobremesas", "Bebidas", "Ofertas"];
  const { addItem } = useCart();
  const [addedItemId, setAddedItemId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      nome: item.nome,
      preco: item.preco,
      quantidade: 1,
      descricao: item.descricao,
      imagem: item.imagem,
    });

    setAddedItemId(item.id);
    setTimeout(() => setAddedItemId(null), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Menu Lateral Aprimorado */}
          <aside className="lg:w-64 xl:w-72 bg-white shadow-xl rounded-2xl p-6 h-fit sticky top-8">
            <h2 className="text-2xl font-['Poppins'] font-bold text-gray-800 mb-6 border-b-2 border-[#FFA726] pb-3">
              Categorias
            </h2>
            <nav className="space-y-2">
              {categorias.map((categoria) => (
                <button
                  key={categoria}
                  onClick={() => setCategoriaAtiva(categoria)}
                  className={`w-full text-left py-4 px-6 rounded-xl transition-all duration-300 font-['Poppins']
                    ${
                      categoriaAtiva === categoria
                        ? 'bg-[#FFA726]/10 text-[#FFA726] font-bold border-2 border-[#FFA726]'
                        : 'text-gray-600 hover:bg-gray-50 hover:pl-8'
                    }`}
                >
                  {categoria}
                </button>
              ))}
            </nav>
          </aside>

          {/* Conteúdo Principal */}
          <div className="flex-1">
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-['Poppins'] font-bold text-gray-800 mb-4">
                Cardápio Completo
              </h1>
              <p className="text-gray-600 font-['Poppins'] max-w-2xl mx-auto">
                Explore nossa seleção premium de pratos cuidadosamente preparados por nossos chefs renomados.
              </p>
              <input
                type="text"
                placeholder="Pesquisar itens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 rounded-lg mb-4 w-full"
              />
            </div>

            {/* Grade de Produtos Aprimorada */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {menuItems
                .filter((item: MenuItem) => item.nome.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((item: MenuItem) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
                  >
                    {/* Imagem com Overlay */}
                    <div className="relative h-60 overflow-hidden">
                      <img
                        src={item.imagem}
                        alt={item.nome}
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <span className="absolute top-4 right-4 bg-[#FFA726] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                        {item.categoria}
                      </span>
                    </div>

                    {/* Detalhes do Produto */}
                    <div className="p-6">
                      <h3 className="font-['Poppins'] font-bold text-xl text-gray-800 mb-2">
                        {item.nome}
                      </h3>
                      <p className="font-['Poppins'] text-gray-600 mb-4 line-clamp-3 min-h-[60px]">
                        {item.descricao}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <span className="font-['Poppins'] font-bold text-2xl text-[#FFA726]">
                          R$ {item.preco.toFixed(2)}
                        </span>
                        <button
                          onClick={() => handleAddToCart(item)}
                          className={`relative flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 overflow-hidden
                            ${addedItemId === item.id ? 'bg-green-500 text-white' : 'bg-[#FFA726] text-white hover:bg-[#FF9800] hover:pr-12'}`}
                        >
                          {addedItemId === item.id ? (
                            <>
                              <span className="opacity-0">Adicionado</span>
                              <svg
                                className="w-5 h-5 absolute"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </>
                          ) : (
                            <>
                              <span>Adicionar</span>
                              <svg
                                className="w-5 h-5 absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 4v16m8-8H4"
                                />
                              </svg>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}