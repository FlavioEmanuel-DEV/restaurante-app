import { Link } from "react-router-dom";
import combo2 from "../assets/images/download1.jpeg";
import { usePromocao } from '../contexts/PromocaoContext'; // Importando o contexto
import CarouselBanner from '../components/CarouselBanner';
import { motion } from "framer-motion";





export default function Home() {
  const { promocoes } = usePromocao(); // Usando o contexto

  

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Banner Principal */}
      <div className="relative overflow-hidden">
      <div className="h-screen max-h-[800px] w-full relative">
        <CarouselBanner />
        {/* Fundo com gradiente animado */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 animate-[gradientShift_10s_ease-in-out_infinite]">
          <div className="container mx-auto h-full flex flex-col justify-center items-start text-left px-8">
            {/* Título com fonte moderna e animação */}
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold text-white font-['Inter'] mb-4"
            >
              Sabor Incomparável
            </motion.h1>
            {/* Subtítulo com descrição */}
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-200 mb-8"
            >
              Uma experiência gastronômica única para surpreender seu paladar
            </motion.p>
            {/* Botões modernos */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex gap-4"
            >
              <Link 
                to="/reserva" 
                className="px-8 py-4 rounded-md bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Reserve Agora
              </Link>
              <Link 
                to="/cardapio" 
                className="px-8 py-4 rounded-md border border-white text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                Ver Menu
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
      


      {/* Seção de Promoções */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-['Poppins'] font-bold text-center mb-8 text-gray-800">
          Promoções Atuais
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {promocoes.map((promocao) => (
            <Link key={promocao.id} to={`/cardapio/${promocao.itemId}`} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
              <div className="relative h-48">
                {promocao.imagem && (
                  <img 
                    src={promocao.imagem} 
                    alt={promocao.nome} 
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-4 right-4 bg-[#FFA726] text-white px-3 py-1 rounded-full text-sm font-bold">
                  -20%
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-['Poppins'] font-semibold mb-2">{promocao.nome}</h3>
                <p className="text-gray-600 mb-4">{promocao.descricao}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-[#FF5733]">De {promocao.dataInicio} até {promocao.dataFim}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Seção Destaque do Chef */}
      <div className="bg-[#FFA726]/10 py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <img 
              src={combo2} 
              alt="Prato do Chef" 
              className="rounded-2xl shadow-xl"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl font-['Poppins'] font-bold mb-4 text-gray-800">
              Especialidade do Chef
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Nosso premiado Risoto de Camarão com Trufa Branca, preparado com ingredientes
              frescos e selecionados diretamente dos melhores fornecedores.
            </p>
            <Link 
              to="/cardapio" 
              className="bg-[#FF5733] text-white px-6 py-3 rounded-xl font-['Poppins'] font-semibold hover:bg-[#E64A2E] transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Experimente Agora
            </Link>
          </div>
        </div>
      </div>

      {/* Seção Depoimentos */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-['Poppins'] font-bold text-center mb-8 text-gray-800">
          O que dizem nossos clientes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={`/clientes/cliente${item}.jpg`} 
                  alt="Cliente" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-['Poppins'] font-semibold">Maria Silva</h4>
                  <div className="flex items-center gap-1 text-[#FFA726]">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "Melhor experiência gastronômica da cidade! Ambiente aconchegante e atendimento impecável."
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Aprimorado */}
      <footer className="bg-gray-900 mt-24 border-t-8 border-[#FFA726]/20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            
            {/* Contato */}
            <div className="space-y-4">
              <h3 className="text-xl font-['Poppins'] font-bold text-[#FFA726] mb-4">Contato</h3>
              <p className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#FFA726]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (11) 1234-5678
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#FFA726]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                contato@restaurante.com
              </p>
            </div>

            {/* Redes Sociais */}
            <div className="space-y-4">
              <h3 className="text-xl font-['Poppins'] font-bold text-[#FFA726] mb-4">Redes Sociais</h3>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-[#FFA726] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                {/* Outras redes sociais... */}
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="text-xl font-['Poppins'] font-bold text-[#FFA726] mb-4">Newsletter</h3>
              <form className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Seu melhor email" 
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-[#FFA726]"
                />
                <button 
                  type="submit"
                  className="px-4 py-2 bg-[#FFA726] text-gray-900 rounded-lg hover:bg-[#FF9800] transition-colors font-semibold"
                >
                  Assinar
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p className="font-['Poppins']">
              © {new Date().getFullYear()} Restaurante. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}