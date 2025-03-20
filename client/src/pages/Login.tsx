import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiLockWrapper, FiUserWrapper, FiArrowRightWrapper } from '../components/icons/IconsWrappers';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setIsLoading(true);
        
        try {
            await login(username, password);
            navigate('/area-adm');
        } catch (error) {
            setMessage("Erro ao fazer login. Verifique suas credenciais.");
            console.error("Erro ao fazer login:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen">
            {/* Background sem overlay */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${require('../assets/images/bgLogin.JPG')})` }}

            ></div>
            


            {/* Formulário de Login */}
            <div className="relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 overflow-hidden">
                {/* Decoração superior */}
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#FFA726]/10 rounded-full"></div>
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FFA726]/5 rounded-full"></div>

                <div className="relative z-10">
                    <h2 className="text-3xl font-['Poppins'] font-bold text-center text-gray-800 mb-2">
                        Bem-vindo de volta
                    </h2>
                    <p className="text-center text-gray-600 mb-8">
                        Faça login para acessar sua conta
                    </p>

                    {message && (
                        <div className="mb-6 p-3 text-sm text-red-600 bg-red-50 rounded-lg flex items-center gap-2">
                            <FiLockWrapper />
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Campo de Usuário */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Usuário
                            </label>
                            <div className="relative">
                                <FiUserWrapper className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFA726] focus:border-transparent transition-all"
                                    placeholder="Digite seu usuário"
                                    required
                                />
                            </div>
                        </div>

                        {/* Campo de Senha */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Senha
                            </label>
                            <div className="relative">
                                <FiLockWrapper className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFA726] focus:border-transparent transition-all"
                                    placeholder="Digite sua senha"
                                    required
                                />
                            </div>
                        </div>

                        {/* Botão de Login */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-[#FFA726] to-[#FF5733] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    Entrar
                                    <FiArrowRightWrapper />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Rodapé do Formulário */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Problemas para acessar?{' '}
                            <a href="#" className="text-[#FF5733] hover:underline">
                                Contate o suporte
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;