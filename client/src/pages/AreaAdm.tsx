import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import CardapioAdmin from './CardapioAdmin'; // Componente CardapioAdmin
import ReservaAdmin from './ReservaAdmin'; // Componente ReservaAdmin
import AdminPedidos from './AdminPedidos'; // Importando o componente AdminPedidos
import PromocaoAdmin from './PromocaoAdmin';
import { FiMenuWrapper, FiXWrapper, FiSettingsWrapper, FiUsersWrapper, FiPackageWrapper, FiClockWrapper, FiDollarSignWrapper, FiLogOutWrapper } from '../components/icons/IconsWrappers';

export default function AdminDashboard() {
  const [editingItem, setEditingItem] = useState<{
    type: 'reserva' | 'cardapio' | 'promocao' | 'pedido' | null;
    data: any;
  }>({ type: null, data: null });

  const [activeTab, setActiveTab] = useState('reservas');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const { logout } = useAuth();

  // Detectar se é dispositivo móvel
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const menuItems = [
    { id: 'reservas', label: 'Reservas', icon: FiClockWrapper },
    { id: 'cardapio', label: 'Cardápio', icon: FiPackageWrapper },
    { id: 'pedidos', label: 'Pedidos', icon: FiUsersWrapper },
    { id: 'promocoes', label: 'Promoções', icon: FiDollarSignWrapper }
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

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Overlay para dispositivos móveis */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside 
          className={`
            fixed top-0 left-0 h-screen bg-white shadow-xl z-40
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            ${isMobile ? 'w-[80%] max-w-[300px]' : 'w-64'}
          `}
        >
          <div className="flex flex-col h-full">
            {/* Cabeçalho do Sidebar */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-['Poppins'] font-bold flex items-center gap-2 text-gray-800">
              <FiSettingsWrapper className="text-[#FF5733]" />
                  Dashboard
            </h2>
                {isMobile && (
              <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"
                  >
                    <FiXWrapper size={20} />
              </button>
                )}
              </div>
            </div>

            {/* Menu de Navegação */}
            <nav className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
              <button
                      key={item.id}
                      onClick={() => handleTabChange(item.id)}
                      className={`
                        w-full flex items-center gap-3 p-3 rounded-xl
                        transition-all duration-200 font-['Poppins']
                        ${activeTab === item.id 
                          ? 'bg-[#FF5733] text-white shadow-lg shadow-[#FF5733]/20' 
                          : 'text-gray-600 hover:bg-gray-50'
                        }
                      `}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
              </button>
                  );
                })}
              </div>
            </nav>

            {/* Botão de Logout */}
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors font-['Poppins']"
              >
                <FiLogOutWrapper size={20} />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Conteúdo Principal */}
        <main className={`
          flex-1 min-h-screen transition-all duration-300 
          ${isSidebarOpen && !isMobile ? 'ml-64' : 'ml-0'}
        `}>
          {/* Header */}
          <header className="bg-white shadow-sm sticky top-0 z-20">
            <div className="px-4 py-4 flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                aria-label={isSidebarOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {isSidebarOpen ? <FiXWrapper size={24} /> : <FiMenuWrapper size={24} />}
            </button>
              <h1 className="text-xl md:text-2xl font-['Poppins'] font-bold text-gray-800 capitalize">
                {menuItems.find(item => item.id === activeTab)?.label || ''}
              </h1>
              <div className="w-10" /> {/* Espaçador para centralizar o título */}
            </div>
          </header>

          {/* Conteúdo da Página */}
          <div className="p-4 md:p-6 lg:p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
