import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useState } from 'react';
import { GiMeal } from 'react-icons/gi';
import { FiMenu, FiX, FiSettings, FiUsers, FiPackage, FiClock, FiDollarSign } from 'react-icons/fi';
import { FaUtensils } from 'react-icons/fa'; // Ícone de comida
import { IconType } from 'react-icons/lib/iconBase';


export default function Header() {
  const location = useLocation();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const gimeal: IconType = GiMeal;

  const isActive = (path: string) => location.pathname === path;

  interface IconProps {
    className?: string;
  }

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/reserva', label: 'Reserva' },
    { path: '/cardapio', label: 'Cardápio' },
    { path: '/pedidos', label: 'Pedidos' },
    { path: '/fale-conosco', label: 'Contato' },
    { path: '/area-adm', label: 'Area Adm' },
  ];

  return (
    <header className="bg-white shadow-lg fixed w-full top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-3xl font-['Poppins'] font-bold bg-gradient-to-r from-[#FFA726] to-[#FF5733] bg-clip-text text-transparent">
              Restaurante XYZ
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-['Poppins'] transition-all px-2 py-1 ${
                  isActive(link.path)
                    ? 'text-[#FF5733] font-semibold'
                    : 'text-gray-600 hover:text-[#FF5733]'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#FFA726] to-[#FF5733] rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <Link to="/pedidos" className="relative p-2 group">
              <GiMeal 
                size={24}
                color={totalItems > 0 ? '#FF5733' : '#4B5563'}
                className="transition-all group-hover:text-[#FF5733]"
              />
              {/*<FaUtensils size={24} color="#FF5733" />*/}
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF5733] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-[#FF5733] transition-colors"
              aria-label="Abrir menu"
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100">
            <nav className="flex flex-col p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-['Poppins'] transition-colors ${
                    isActive(link.path)
                      ? 'bg-[#FFA726]/10 text-[#FF5733] font-semibold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}