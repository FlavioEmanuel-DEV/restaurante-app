import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function Pedidos() {
  const { items, updateQuantity, removeItem } = useCart();

  const total = items.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="animate-bounce-slow mb-6">
              <svg 
                className="w-32 h-32 mx-auto text-[#FFA726]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="1.5" 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
            </div>
            <h2 className="text-3xl font-['Poppins'] font-bold text-gray-800 mb-3">
              Seu Carrinho Está Vazio
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Explore nosso cardápio e adicione delícias gastronômicas para começar seu pedido!
            </p>
            <Link
              to="/cardapio"
              className="bg-[#FFA726] text-white px-8 py-3 rounded-xl font-['Poppins'] font-semibold hover:bg-[#FF9800] transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              Ver Cardápio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-24">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <h1 className="text-3xl md:text-4xl font-['Poppins'] font-bold text-gray-800 mb-6 lg:mb-8 text-center lg:text-left">
          Seu Pedido
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lista de Itens */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {items.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start p-4 sm:p-6 gap-4 sm:gap-6">
                  {/* Imagem do Item */}
                  <div className="w-full sm:w-32 h-48 sm:h-32 relative rounded-xl overflow-hidden">
                    <img 
                      src={item.imagem} 
                      alt={item.nome} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Detalhes do Item */}
                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-['Poppins'] font-semibold text-gray-800">
                        {item.nome}
                      </h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        aria-label="Remover item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.descricao}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <span className="text-2xl font-['Poppins'] font-bold text-[#FFA726]">
                        R$ {(item.preco * item.quantidade).toFixed(2)}
                      </span>
                      
                      <div className="flex items-center gap-3 bg-gray-50 rounded-full p-1">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantidade - 1))}
                          className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-100 transition-colors"
                          aria-label="Diminuir quantidade"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-['Poppins'] font-medium">
                          {item.quantidade}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantidade + 1)}
                          className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-100 transition-colors"
                          aria-label="Aumentar quantidade"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 sticky top-24">
              <h2 className="text-2xl font-['Poppins'] font-bold text-gray-800 mb-6 pb-3 border-b-2 border-[#FFA726]">
                Resumo do Pedido
              </h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex justify-between items-center text-sm sm:text-base"
                  >
                    <div className="flex-1 pr-4">
                      <span className="text-gray-600 font-medium">
                        {item.quantidade}x {item.nome}
                      </span>
                    </div>
                    <span className="text-gray-800 font-['Poppins'] font-semibold whitespace-nowrap">
                      R$ {(item.preco * item.quantidade).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-dashed border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-['Poppins'] font-bold text-gray-800">
                    Total
                  </span>
                  <span className="text-2xl font-['Poppins'] font-bold text-[#FFA726]">
                    R$ {total.toFixed(2)}
                  </span>
                </div>

                <button 
                  className="w-full bg-gradient-to-r from-[#FFA726] to-[#FF5733] text-white py-4 rounded-xl font-['Poppins'] font-semibold hover:shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                  onClick={() => console.log('Finalizando pedido:', items)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  Finalizar Pedido
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}