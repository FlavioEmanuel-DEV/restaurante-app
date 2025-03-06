import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiSettings, FiUsers, FiPackage, FiClock, FiDollarSign } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

export default function AdminDashboard() {

const [editingItem, setEditingItem] = useState<{
    type: 'reserva' | 'cardapio' | 'promocao' | 'pedido' | null;
     data: any;
    }>({ type: null, data: null });

  const [activeTab, setActiveTab] = useState('reservas');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { logout } = useAuth();

  // Dados de exemplo
  const reservas = [
    { id: 1, nome: 'João Silva', data: '2024-03-20', horario: '19:00', mesa: 'A3', status: 'Confirmada' },
    { id: 2, nome: 'Maria Souza', data: '2024-03-21', horario: '20:30', mesa: 'B2', status: 'Pendente' }
  ];

  const cardapio = [
    { id: 1, nome: 'Risoto de Camarão', preco: 89.90, categoria: 'Pratos Principais', disponivel: true },
    { id: 2, nome: 'Tiramisu', preco: 32.90, categoria: 'Sobremesas', disponivel: false }
  ];

  const pedidos = [
    { id: 1, cliente: 'Carlos Andrade', total: 152.80, status: 'Em preparo', data: '2024-03-19 19:45' },
    { id: 2, cliente: 'Ana Costa', total: 89.90, status: 'Entregue', data: '2024-03-19 18:30' }
  ];

  const promocoes = [
    { id: 1, titulo: 'Jantar Romântico', desconto: 20, validoAte: '2024-03-31' },
    { id: 2, titulo: 'Happy Hour', desconto: 30, validoAte: '2024-04-15' }
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'reservas':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Gerenciar Reservas</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 text-left">Nome</th>
                    <th className="p-3 text-left">Data</th>
                    <th className="p-3 text-left">Horário</th>
                    <th className="p-3 text-left">Mesa</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {reservas.map(reserva => (
                    <tr key={reserva.id} className="border-b">
                      <td className="p-3">{reserva.nome}</td>
                      <td className="p-3">{reserva.data}</td>
                      <td className="p-3">{reserva.horario}</td>
                      <td className="p-3">{reserva.mesa}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-sm ${reserva.status === 'Confirmada' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {reserva.status}
                        </span>
                      </td>
                      <td className="p-3">
                      <button onClick={() => setEditingItem({ type: 'reserva', data: reserva })}
                        className="text-blue-600 hover:text-blue-800 mr-2"
                        >Editar
                        </button>
                        <button className="text-red-600 hover:text-red-800">Excluir</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'cardapio':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Gerenciar Cardápio</h2>
            <div className="mb-6">
              <button className="bg-[#FF5733] text-white px-4 py-2 rounded hover:bg-[#E64A2E]">
                Adicionar Item
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {cardapio.map(item => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{item.nome}</h3>
                      <p className="text-gray-600">{item.categoria}</p>
                    </div>
                    <span className={`px-2 py-1 text-sm rounded-full ${item.disponivel ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {item.disponivel ? 'Disponível' : 'Indisponível'}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xl font-bold">R$ {item.preco.toFixed(2)}</span>
                    <div>
                    <button 
  onClick={() => setEditingItem({ type: 'cardapio', data: item })}
  className="text-blue-600 hover:text-blue-800 mr-2"
>Editar</button>
                      <button className="text-red-600 hover:text-red-800">Excluir</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'pedidos':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Pedidos Recentes</h2>
            <div className="space-y-4">
              {pedidos.map(pedido => (
                <div key={pedido.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">Pedido #{pedido.id}</h3>
                      <p className="text-gray-600">{pedido.cliente}</p>
                    </div>
                    <span className={`px-2 py-1 text-sm rounded-full ${
                      pedido.status === 'Entregue' ? 'bg-green-100 text-green-800' :
                      pedido.status === 'Em preparo' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {pedido.status}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-gray-600">{pedido.data}</span>
                    <span className="text-xl font-bold">R$ {pedido.total.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'promocoes':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Gerenciar Promoções</h2>
            <div className="mb-6">
              <button className="bg-[#FF5733] text-white px-4 py-2 rounded hover:bg-[#E64A2E]">
                Nova Promoção
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {promocoes.map(promocao => (
                <div key={promocao.id} className="border rounded-lg p-4 bg-[#FFF3E0]">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{promocao.titulo}</h3>
                      <p className="text-gray-600">Válido até: {promocao.validoAte}</p>
                    </div>
                    <span className="text-xl font-bold text-[#FF5733]">-{promocao.desconto}%</span>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                  <button onClick={() => setEditingItem({ type: 'promocao', data: promocao })}
                  className="text-blue-600 hover:text-blue-800 mr-2"
                    >Editar
                    </button>
                    <button className="text-red-600 hover:text-red-800">Excluir</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      
      default:
        return null;
    }
  };

  const handleLogout = () => {
    logout();
    // Redirecionar para a página de login ou outra página
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className={`bg-white shadow-lg ${isSidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 fixed h-screen z-20`}>
          <div className={`${isSidebarOpen ? 'block' : 'hidden'} p-4`}>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <FiSettings className="text-[#FF5733]" />
              Admin Dashboard
            </h2>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('reservas')}
                className={`w-full flex items-center gap-2 p-3 rounded-lg ${
                  activeTab === 'reservas' ? 'bg-[#FF5733] text-white' : 'hover:bg-gray-100'
                }`}
              >
                <FiClock />
                Reservas
              </button>
              <button
                onClick={() => setActiveTab('cardapio')}
                className={`w-full flex items-center gap-2 p-3 rounded-lg ${
                  activeTab === 'cardapio' ? 'bg-[#FF5733] text-white' : 'hover:bg-gray-100'
                }`}
              >
                <FiPackage />
                Cardápio
              </button>
              <button
                onClick={() => setActiveTab('promocoes')}
                className={`w-full flex items-center gap-2 p-3 rounded-lg ${
                  activeTab === 'promocoes' ? 'bg-[#FF5733] text-white' : 'hover:bg-gray-100'
                }`}
              >
                <FiDollarSign />
                Promoções
              </button>
              <button
                onClick={() => setActiveTab('pedidos')}
                className={`w-full flex items-center gap-2 p-3 rounded-lg ${
                  activeTab === 'pedidos' ? 'bg-[#FF5733] text-white' : 'hover:bg-gray-100'
                }`}
              >
                <FiUsers />
                Pedidos
              </button>
            </nav>
          </div>
        </aside>

        {/* Conteúdo Principal */}
        <main className={`flex-1 p-4 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <h1 className="text-2xl font-bold capitalize">{activeTab}</h1>
          </div>

          {renderContent()}

          <button onClick={handleLogout}>Logout</button>
        </main>
      </div>
    </div>
  );
}