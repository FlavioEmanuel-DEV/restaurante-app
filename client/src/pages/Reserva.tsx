import { useState } from 'react';
import { Horario, Mesa } from '../types';

// Dados de exemplo das mesas
const mesas: Mesa[] = [
  { 
    id: 1, 
    numero: '01', 
    status: 'disponivel', 
    posicao: { x: 100, y: 100 },
    capacidade: 4,
    horarios: [
      { hora: '12:00', disponivel: true },
      { hora: '13:00', disponivel: false },
      { hora: '14:00', disponivel: true },
      { hora: '15:00', disponivel: true },
      { hora: '18:00', disponivel: true },
      { hora: '19:00', disponivel: false },
      { hora: '20:00', disponivel: true },
    ]
  },
  { 
    id: 2, 
    numero: '02', 
    status: 'ocupada', 
    posicao: { x: 200, y: 100 },
    capacidade: 6,
    horarios: [
      { hora: '12:00', disponivel: false },
      { hora: '13:00', disponivel: false },
      { hora: '14:00', disponivel: true },
      { hora: '15:00', disponivel: true },
      { hora: '18:00', disponivel: true },
      { hora: '19:00', disponivel: true },
      { hora: '20:00', disponivel: true },
    ]
  },
  // Outras mesas podem ser adicionadas
];

export default function Reserva() {
  const [mesaSelecionada, setMesaSelecionada] = useState<Mesa | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    data: '',
    horario: ''
  });
  const [loading, setLoading] = useState(false);
  const [reservationConfirmed, setReservationConfirmed] = useState(false);
  const [zoom, setZoom] = useState(1);

  const handleMesaClick = (mesa: Mesa) => {
    if (mesa.status === 'ocupada') return;
    setMesaSelecionada(mesa.id === mesaSelecionada?.id ? null : mesa);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validação simples
    if (!formData.nome || !formData.telefone || !formData.data || !formData.horario) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    setLoading(true);
    // Simulação de chamada à API (2 segundos)
    setTimeout(() => {
      setLoading(false);
      setReservationConfirmed(true);
      console.log('Dados da reserva:', { ...formData, mesa: mesaSelecionada });
      // Reseta os estados
      setMesaSelecionada(null);
      setFormData({ nome: '', telefone: '', data: '', horario: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-['Poppins'] font-bold text-gray-800 mb-8 text-center">
          Faça sua Reserva
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Planta Baixa Aprimorada */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-['Poppins'] font-semibold text-gray-800">
                Selecione sua Mesa
              </h2>
              <p className="text-gray-600 mt-1">
                Clique em uma mesa disponível para reservar
              </p>
            </div>
            
            <div 
              className="relative w-full aspect-[4/3] bg-gray-50 rounded-xl border-2 border-gray-100 overflow-hidden"
              style={{ transform: `scale(${zoom})`, transformOrigin: '0 0' }}
            >
              <img 
                src="/planta.jpeg"
                alt="Planta baixa do restaurante"
                className="w-full h-full object-cover opacity-50"
              />
              
              <div className="absolute inset-0">
                {mesas.map((mesa) => (
                  <button
                    key={mesa.id}
                    onClick={() => handleMesaClick(mesa)}
                    style={{
                      left: `${mesa.posicao.x}px`,
                      top: `${mesa.posicao.y}px`,
                    }}
                    title={`Mesa ${mesa.numero} - Capacidade: ${mesa.capacidade} pessoas`}
                    className={`absolute w-12 h-12 rounded-full flex items-center justify-center transition-all
                      ${mesa.status === 'ocupada' 
                        ? 'bg-red-500 cursor-not-allowed' 
                        : mesa.id === mesaSelecionada?.id 
                        ? 'bg-[#FFA726] ring-4 ring-[#FFA726]/30 scale-110' 
                        : 'bg-green-500 hover:scale-105'
                      }`}
                    disabled={mesa.status === 'ocupada'}
                  >
                    <span className="text-white font-['Poppins'] font-bold">
                      {mesa.numero}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Legenda */}
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Disponível</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm text-gray-600">Ocupada</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full">
                <div className="w-3 h-3 rounded-full bg-[#FFA726]"></div>
                <span className="text-sm text-gray-600">Selecionada</span>
              </div>
            </div>
          </div>

          {/* Formulário de Reserva */}
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:sticky lg:top-24">
            {mesaSelecionada ? (
              <div className="space-y-6">
                <div className="pb-4 border-b border-gray-100">
                  <h3 className="text-2xl font-['Poppins'] font-bold text-gray-800">
                    Mesa {mesaSelecionada.numero}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                    <span className="text-gray-600">
                      Capacidade para {mesaSelecionada.capacidade} pessoas
                    </span>
                  </div>
                </div>

                {/* Seletor de Horários */}
                <div className="space-y-4">
                  <h4 className="text-lg font-['Poppins'] font-semibold text-gray-800">
                    Selecione o Horário
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {mesaSelecionada.horarios.map((horario: Horario, index: number) => (
                      <button
                        key={index}
                        type="button"
                        disabled={!horario.disponivel}
                        onClick={() => setFormData({ ...formData, horario: horario.hora })}
                        className={`p-3 text-sm rounded-xl transition-all
                          ${formData.horario === horario.hora
                            ? 'bg-gradient-to-r from-[#FFA726] to-[#FF5733] text-white'
                            : horario.disponivel
                            ? 'bg-gray-50 text-gray-800 hover:bg-gray-100'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                      >
                        {horario.hora}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Formulário */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-['Poppins'] font-medium text-gray-700 mb-2">
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

                    <div>
                      <label className="block text-sm font-['Poppins'] font-medium text-gray-700 mb-2">
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

                    <div>
                      <label className="block text-sm font-['Poppins'] font-medium text-gray-700 mb-2">
                        Data da Reserva
                      </label>
                      <input
                        type="date"
                        value={formData.data}
                        onChange={(e) => setFormData({...formData, data: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FFA726] focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!formData.horario || loading}
                    className={`w-full py-4 rounded-xl font-['Poppins'] font-semibold transition-all
                      ${formData.horario && !loading
                        ? 'bg-gradient-to-r from-[#FFA726] to-[#FF5733] text-white hover:shadow-lg'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                  >
                    {loading ? 'Reservando...' : 'Confirmar Reserva'}
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="inline-block p-6 bg-gray-100 rounded-2xl mb-4">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16m-7 6h7"/>
                  </svg>
                </div>
                <h3 className="text-xl font-['Poppins'] text-gray-600">
                  Selecione uma mesa para continuar
                </h3>
                <p className="text-gray-500 mt-1">
                  Clique em uma mesa disponível no mapa ao lado
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Confirmação */}
      {reservationConfirmed && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Reserva Confirmada!</h2>
            <p className="text-gray-600 mb-6">Sua reserva foi realizada com sucesso.</p>
            <button
              onClick={() => setReservationConfirmed(false)}
              className="px-6 py-3 bg-gradient-to-r from-[#FFA726] to-[#FF5733] text-white rounded-xl hover:shadow-lg transition-all"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
