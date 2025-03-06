import { useState } from 'react';
import { Link } from 'react-router-dom';
import trabalheConosco from '../assets/images/trabalhe-conosco.jpg';

export default function FaleConosco() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de envio do formulário
    console.log('Dados do formulário:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        {/* Cabeçalho */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-['Poppins'] font-bold text-gray-800 mb-4">
            Fale Conosco
          </h1>
          <p className="text-gray-600 font-['Poppins'] max-w-2xl mx-auto">
            Estamos aqui para ajudar. Entre em contato ou visite-nos para uma experiência gastronômica inesquecível.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Seção de Informações */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Card de Contatos */}
            <div className="bg-white rounded-2xl shadow-xl p-8 h-fit">
              <h2 className="text-2xl font-['Poppins'] font-bold text-gray-800 mb-6 border-b-2 border-[#FFA726] pb-3">
                Informações
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-[#FFA726]/10 rounded-xl transition-colors group-hover:bg-[#FFA726]/20">
                    <svg className="w-6 h-6 text-[#FFA726]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Endereço</h3>
                    <p className="text-gray-600">Rua Gastronomia, 123<br/>Bairro Saboroso - SP</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-[#FFA726]/10 rounded-xl transition-colors group-hover:bg-[#FFA726]/20">
                    <svg className="w-6 h-6 text-[#FFA726]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Telefone</h3>
                    <p className="text-gray-600">(11) 1234-5678</p>
                    <p className="text-gray-600">(11) 98765-4321</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-[#FFA726]/10 rounded-xl transition-colors group-hover:bg-[#FFA726]/20">
                    <svg className="w-6 h-6 text-[#FFA726]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600">contato@restaurante.com</p>
                    <p className="text-gray-600">reservas@restaurante.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulário Moderno */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-1">
                    <label className="block text-sm font-['Poppins'] font-medium text-gray-700">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      value={formData.nome}
                      onChange={(e) => setFormData({...formData, nome: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FFA726] focus:border-transparent transition-all"
                      placeholder="Digite seu nome"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="block text-sm font-['Poppins'] font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FFA726] focus:border-transparent transition-all"
                        placeholder="seu@email.com"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-sm font-['Poppins'] font-medium text-gray-700">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        value={formData.telefone}
                        onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FFA726] focus:border-transparent transition-all"
                        placeholder="(00) 00000-0000"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-['Poppins'] font-medium text-gray-700">
                      Assunto
                    </label>
                    <select
                      value={formData.assunto}
                      onChange={(e) => setFormData({...formData, assunto: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FFA726] focus:border-transparent transition-all appearance-none"
                      required
                    >
                      <option value="">Selecione um assunto</option>
                      <option>Reservas</option>
                      <option>Eventos</option>
                      <option>Dúvidas</option>
                      <option>Elogios</option>
                      <option>Sugestões</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-['Poppins'] font-medium text-gray-700">
                      Mensagem
                    </label>
                    <textarea
                      value={formData.mensagem}
                      onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FFA726] focus:border-transparent transition-all"
                      placeholder="Escreva sua mensagem..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#FFA726] text-white py-4 rounded-xl font-['Poppins'] font-semibold hover:bg-[#FF9800] transition-colors hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    Enviar Mensagem
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Card Trabalhe Conosco Aprimorado */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden group transition-all duration-300 hover:shadow-2xl">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={trabalheConosco} 
                alt="Trabalhe Conosco" 
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFA726]/80 to-[#FF9800]/80">
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <h2 className="text-3xl md:text-4xl font-['Poppins'] font-bold text-white mb-4">
                    Faça Parte do Nosso Time
                  </h2>
                  <p className="text-gray-100 max-w-xl mx-auto mb-6">
                    Buscamos talentos apaixonados por gastronomia e serviço excepcional.
                    Envie seu currículo e venha crescer conosco!
                  </p>
                  <Link 
                    to="/vagas" 
                    className="bg-white text-[#FFA726] px-8 py-3 rounded-xl font-['Poppins'] font-semibold hover:bg-gray-100 hover:text-[#FF9800] transition-colors flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    Ver Oportunidades
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}