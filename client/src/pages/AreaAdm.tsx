import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiSettings, FiUsers, FiPackage, FiClock, FiDollarSign } from 'react-icons/fi';
import CardapioAdmin from './CardapioAdmin'; // Componente CardapioAdmin
import ReservaAdmin from './ReservaAdmin'; // Componente ReservaAdmin
import AdminPedidos from './AdminPedidos'; // Importando o componente AdminPedidos
import PromocaoAdmin from './PromocaoAdmin';


export default function AdminDashboard() {
  const [editingItem, setEditingItem] = useState<{
    type: 'reserva' | 'cardapio' | 'promocao' | 'pedido' | null;
    data: any;
  }>({ type: null, data: null });

  const [activeTab, setActiveTab] = useState('reservas');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { logout } = useAuth();

  // Dados de exemplo para outras abas (reservas, cardapio, promocoes)
  const reservas = [
    { id: 1, nome: 'João Silva', data: '2024-03-20', horario: '19:00', mesa: 'A3', status: 'Confirmada' },
    { id: 2, nome: 'Maria Souza', data: '2024-03-21', horario: '20:30', mesa: 'B2', status: 'Pendente' }
  ];

  const cardapio = [
    { id: 1, nome: 'Risoto de Camarão', preco: 89.90, categoria: 'Pratos Principais', disponivel: true },
    { id: 2, nome: 'Tiramisu', preco: 32.90, categoria: 'Sobremesas', disponivel: false }
  ];

  const promocoes = [
    { id: 1, titulo: 'Jantar Romântico', desconto: 20, validoAte: '2024-03-31' },
    { id: 2, titulo: 'Happy Hour', desconto: 30, validoAte: '2024-04-15' }
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'reservas':
        return <ReservaAdmin />;
      case 'cardapio':
        return <CardapioAdmin />;
      case 'pedidos':
        return <AdminPedidos />;
      case 'promocoes':
        return <PromocaoAdmin />;
      default:
        return null;
    }
  };

  const handleLogout = () => {
    logout();
    // Redirecionar para a página de login ou outra página, se necessário
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
                onClick={() => setActiveTab('pedidos')}
                className={`w-full flex items-center gap-2 p-3 rounded-lg ${
                  activeTab === 'pedidos' ? 'bg-[#FF5733] text-white' : 'hover:bg-gray-100'
                }`}
              >
                <FiUsers />
                Pedidos
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
            </nav>
          </div>
          {/* Botão de Logoff na parte inferior */}
          <button 
            onClick={handleLogout}
            className="mt-6 w-full flex items-center gap-2 p-3 rounded-lg hover:bg-red-100 text-red-500"
          >
            <FiX />
            Logout
          </button>
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
        </main>
      </div>
    </div>
  );
}
