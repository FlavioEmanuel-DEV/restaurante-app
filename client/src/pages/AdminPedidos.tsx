import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Contexto de autenticação
import { Pedido } from '../types'; // Supondo que você tenha um tipo Pedido definido

const AdminPedidos = () => {
    const [pedidos, setPedidos] = useState<Pedido[]>([]); // Estado para armazenar pedidos
    const [newPedido, setNewPedido] = useState<Pedido | null>(null); // Estado para novo pedido
    const [message, setMessage] = useState<string | null>(null); // Estado para mensagem
    const navigate = useNavigate();

    const handleAddPedido = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPedido) {
            // Lógica para adicionar um novo pedido
            setPedidos([...pedidos, newPedido]);
            setNewPedido(null); // Limpa o formulário
            setMessage("Pedido adicionado com sucesso!");
        }
    };

    const handleDeletePedido = (id: number) => {
        // Lógica para excluir um pedido
        setPedidos(pedidos.filter(pedido => pedido.id !== id));
        setMessage("Pedido excluído com sucesso!");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Administração de Pedidos</h2>
            {message && (
                <div className="mb-4 p-2 text-green-600 bg-green-100 rounded">
                    {message}
                </div>
            )}
            <form onSubmit={handleAddPedido} className="bg-white shadow-md rounded-lg p-8 max-w-md w-full mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Adicionar Novo Pedido</h3>
                {/* Campos do formulário para adicionar um novo pedido */}
                <input
                    type="text"
                    placeholder="Nome do Cliente"
                    className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 mb-4"
                    onChange={(e) => setNewPedido({ ...newPedido, cliente: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Descrição do Pedido"
                    className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 mb-4"
                    onChange={(e) => setNewPedido({ ...newPedido, descricao: e.target.value })}
                    required
                />
                <button
                    type="submit"
                    className="bg-[#FFA726] hover:bg-[#FF9800] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                >
                    Adicionar Pedido
                </button>
            </form>

            {/* Lista de Pedidos */}
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Lista de Pedidos</h3>
                <ul>
                    {pedidos.map((pedido) => (
                        <li key={pedido.id} className="flex justify-between items-center mb-4">
                            <span>{pedido.cliente} - {pedido.descricao}</span>
                            <button
                                onClick={() => handleDeletePedido(pedido.id)}
                                className="text-red-600 hover:text-red-800"
                            >
                                Excluir
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminPedidos; 