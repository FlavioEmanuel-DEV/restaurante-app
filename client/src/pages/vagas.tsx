import { useState } from 'react';
import { Vaga } from '../types';

const vagas: Vaga[] = [
  {
      id: 6,
      titulo: "Chef de Cozinha",
      tipo: "Tempo Integral",
      local: "São Paulo, SP",
      descricao: "Buscamos um Chef de Cozinha criativo e experiente para liderar nossa equipe na criação de pratos exclusivos e de alta qualidade.",
      requisitos: [
        "Formação em Gastronomia",
        "Experiência mínima de 5 anos em cozinha profissional",
        "Conhecimento em culinária internacional",
        "Habilidade para gerenciar equipe e estoque"
      ],
      beneficios: [
        "Salário competitivo",
        "Vale-refeição",
        "Participação em eventos gastronômicos",
        "Plano de saúde"
      ]
    },
    {
      id: 7,
      titulo: "Garçom/Garçonete",
      tipo: "Meio Período",
      local: "Rio de Janeiro, RJ",
      descricao: "Procuramos garçons/garçonetes com experiência para atender nossos clientes com excelência e garantir uma experiência memorável.",
      requisitos: [
        "Experiência anterior em atendimento ao cliente",
        "Boa comunicação e postura profissional",
        "Disponibilidade para trabalhar em finais de semana e feriados",
        "Conhecimento básico de vinhos e drinks"
      ],
      beneficios: [
        "Gorjetas",
        "Vale-transporte",
        "Refeição no local",
        "Ambiente de trabalho dinâmico"
      ]
    },
    {
      id: 8,
      titulo: "Auxiliar de Cozinha",
      tipo: "Tempo Integral",
      local: "Belo Horizonte, MG",
      descricao: "Vaga para Auxiliar de Cozinha com disposição para aprender e trabalhar em equipe em um ambiente de alta demanda.",
      requisitos: [
        "Experiência prévia em cozinha (desejável)",
        "Organização e agilidade",
        "Disponibilidade para turnos variados",
        "Vontade de aprender novas técnicas"
      ],
      beneficios: [
        "Treinamento em culinária",
        "Refeição no local",
        "Vale-transporte",
        "Possibilidade de crescimento"
      ]
    },
    {
      id: 9,
      titulo: "Bartender",
      tipo: "Tempo Integral",
      local: "Curitiba, PR",
      descricao: "Estamos em busca de um Bartender criativo e experiente para preparar drinks exclusivos e atender nossos clientes no bar.",
      requisitos: [
        "Experiência comprovada como Bartender",
        "Conhecimento em mixologia e preparo de drinks",
        "Boa comunicação e atendimento ao cliente",
        "Disponibilidade para trabalhar à noite"
      ],
      beneficios: [
        "Gorjetas",
        "Vale-refeição",
        "Participação em eventos de mixologia",
        "Ambiente descontraído"
      ]
    },
    {
      id: 10,
      titulo: "Gerente de Restaurante",
      tipo: "Tempo Integral",
      local: "Porto Alegre, RS",
      descricao: "Procuramos um Gerente de Restaurante para liderar nossa equipe, garantir a satisfação dos clientes e administrar as operações do estabelecimento.",
      requisitos: [
        "Experiência em gestão de restaurantes",
        "Conhecimento em controle de custos e estoque",
        "Habilidades de liderança e comunicação",
        "Disponibilidade para trabalhar em horários flexíveis"
      ],
      beneficios: [
        "Salário competitivo",
        "Bônus por desempenho",
        "Plano de saúde",
        "Vale-transporte"
      ]
    }
  ];

export default function Vagas() {
  const [vagaSelecionada, setVagaSelecionada] = useState<Vaga | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        {/* Banner Aprimorado */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#FFA726] to-[#FF5733] p-12 text-white mb-16">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-['Poppins'] font-bold mb-4 animate-fade-in-down">
              Faça Parte do Nosso Time
            </h1>
            <p className="text-xl md:text-2xl opacity-95 max-w-2xl">
              Transforme sua paixão por gastronomia em uma carreira cheia de sabor
            </p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/5" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Vagas Aprimorada */}
          <div className="lg:col-span-2">
            <div className="grid gap-6">
              {vagas.map((vaga) => (
                <div 
                  key={vaga.id}
                  className={`group bg-white rounded-2xl shadow-lg p-8 cursor-pointer transition-all duration-300 ${
                    vagaSelecionada?.id === vaga.id 
                      ? 'ring-2 ring-[#FFA726] border-[#FFA726]/20' 
                      : 'hover:shadow-xl hover:border-[#FFA726]/10'
                  } border-2 border-transparent`}
                  onClick={() => setVagaSelecionada(vaga)}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#FFA726]/10 rounded-xl">
                      <svg className="w-6 h-6 text-[#FFA726]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-['Poppins'] font-semibold text-gray-800 mb-2">
                        {vaga.titulo}
                      </h3>
                      <div className="flex flex-wrap gap-3 mb-4">
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          {vaga.tipo}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          </svg>
                          {vaga.local}
                        </span>
                      </div>
                      <p className="text-gray-600 line-clamp-2">
                        {vaga.descricao}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detalhes da Vaga Aprimorado */}
          <div className="lg:col-span-1">
            {vagaSelecionada ? (
              <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24 border-2 border-gray-100">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-['Poppins'] font-bold text-gray-800 mb-4">
                      {vagaSelecionada.titulo}
                    </h2>
                    <div className="flex flex-wrap gap-3 mb-6">
                      <span className="px-3 py-1 bg-[#FFA726]/10 text-[#FFA726] rounded-full text-sm">
                        {vagaSelecionada.tipo}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                        {vagaSelecionada.local}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-['Poppins'] font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <svg className="w-6 h-6 text-[#FFA726]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Descrição da Vaga
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {vagaSelecionada.descricao}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-['Poppins'] font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <svg className="w-6 h-6 text-[#FFA726]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Requisitos
                      </h3>
                      <ul className="space-y-3">
                        {vagaSelecionada.requisitos.map((req, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-600">
                            <svg className="w-5 h-5 text-[#FFA726] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                            </svg>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-['Poppins'] font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <svg className="w-6 h-6 text-[#FFA726]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Benefícios
                      </h3>
                      <ul className="space-y-3">
                        {vagaSelecionada.beneficios.map((ben, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-600">
                            <svg className="w-5 h-5 text-[#FFA726] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                            </svg>
                            {ben}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => console.log('Candidatura para:', vagaSelecionada.titulo)}
                      className="w-full bg-gradient-to-r from-[#FFA726] to-[#FF5733] text-white py-4 rounded-xl font-['Poppins'] font-semibold hover:shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
                      </svg>
                      Candidatar-se Agora
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center border-2 border-dashed border-gray-200">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <p className="text-gray-600 font-['Poppins']">
                  Selecione uma vaga para visualizar os detalhes completos
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}