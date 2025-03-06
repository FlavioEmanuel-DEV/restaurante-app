import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Contexto de autenticação

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<string | null>(null); // Estado para mensagem
    const { login } = useAuth(); // Função de login do contexto
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null); // Limpa a mensagem anterior
        try {
            await login(username, password);
            navigate('/area-adm'); // Redireciona para a área administrativa após login
        } catch (error) {
            setMessage("Erro ao fazer login. Verifique suas credenciais."); // Mensagem de erro
            console.error("Erro ao fazer login:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                {message && (
                    <div className="mb-4 p-2 text-red-600 bg-red-100 rounded">
                        {message}
                    </div>
                )}
                <input
                    type="text"
                    placeholder="Usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
                />
                <button type="submit" className="w-full bg-[#FFA726] text-white py-2 rounded hover:bg-[#FF9800]">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login; 