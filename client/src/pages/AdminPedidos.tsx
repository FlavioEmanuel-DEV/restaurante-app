import React, { useState } from 'react';
import { FiEdit, FiTrash, FiPlus, FiSearch } from 'react-icons/fi';

interface Pedido {
    id: number;
    cliente: string;
    descricao: string;
    total: number;
    status: string;
    data: string;
}

const initialPedidos: Pedido[] = [
    { id: 1, cliente: 'Carlos Andrade', descricao: 'Pedido com 3 itens', total: 152.80, status: 'Em preparo', data: '2024-03-19 19:45' },
    { id: 2, cliente: 'Ana Costa', descricao: 'Pedido com 2 itens', total: 89.90, status: 'Entregue', data: '2024-03-19 18:30' },
];

export default function AdminPedidos() {
    const [pedidos, setPedidos] = useState<Pedido[]>(initialPedidos);
    const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
    const [formData, setFormData] = useState<Pedido>({
        id: 0,
        cliente: '',
        descricao: '',
        total: 0,
        status: 'Pendente',
        data: '',
    });
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showForm, setShowForm] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedPedido) {
            // Editar pedido existente
            setPedidos(pedidos.map(pedido => pedido.id === selectedPedido.id ? formData : pedido));
        } else {
            // Adicionar novo pedido
            const newPedido = { ...formData, id: Date.now() }; // Usando Date.now() como ID único
            setPedidos([...pedidos, newPedido]);
        }
        resetForm();
    };

    const resetForm = () => {
        setSelectedPedido(null);
        setFormData({
            id: 0,
            cliente: '',
            descricao: '',
            total: 0,
            status: 'Pendente',
            data: '',
        });
        setShowForm(false);
    };

    const handleEdit = (pedido: Pedido) => {
        setSelectedPedido(pedido);
        setFormData(pedido);
        setShowForm(true);
    };

    const handleDelete = (id: number) => {
        setPedidos(pedidos.filter(pedido => pedido.id !== id));
    };

    const filteredPedidos = pedidos.filter(pedido => 
        pedido.cliente.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Gerenciamento de Pedidos</h1>

            {/* Filtro de Busca e Botão para Adicionar Novo Pedido */}
            <div className="flex items-center mb-4">
                <div className="flex flex-1 items-center">
                    <FiSearch className="mr-2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar pedido..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border p-2 rounded-lg flex-1"
                    />
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setShowForm(true);
                    }}
                    className="flex items-center gap-2 bg-[#FF5733] text-white px-4 py-2 rounded-lg hover:bg-[#E64A2E] ml-4"
                >
                    <FiPlus /> Adicionar Novo Pedido
                </button>
            </div>

            {/* Formulário */}
            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <h2 className="text-xl font-bold mb-4">
                        {selectedPedido ? 'Editar Pedido' : 'Adicionar Novo Pedido'}
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Cliente</label>
                            <input
                                type="text"
                                placeholder="Nome do cliente"
                                value={formData.cliente}
                                onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Descrição</label>
                            <input
                                type="text"
                                placeholder="Descrição do pedido"
                                value={formData.descricao}
                                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Total (R$)</label>
                            <input
                                type="number"
                                placeholder="Total do pedido"
                                value={formData.total}
                                onChange={(e) => setFormData({ ...formData, total: parseFloat(e.target.value) })}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:outline-none"
                            >
                                <option value="Pendente">Pendente</option>
                                <option value="Em preparo">Em preparo</option>
                                <option value="Entregue">Entregue</option>
                                <option value="Cancelado">Cancelado</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Data</label>
                            <input
                                type="datetime-local"
                                value={formData.data}
                                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={resetForm}
                            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#FF5733] text-white rounded-lg hover:bg-[#E64A2E]"
                        >
                            {selectedPedido ? 'Salvar Alterações' : 'Adicionar Pedido'}
                        </button>
                    </div>
                </form>
            )}

            {/* Lista de Pedidos */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">Pedidos</h2>
                <ul>
                    {filteredPedidos.map(pedido => (
                        <li key={pedido.id} className="flex justify-between items-center mb-2 p-4 border-b hover:bg-gray-50 transition">
                            <span>
                                <strong>{pedido.cliente}</strong> - {pedido.descricao} <br />
                                <small>Total: R$ {pedido.total.toFixed(2)} | Status: {pedido.status} | Data: {pedido.data}</small>
                            </span>
                            <div>
                                <button onClick={() => handleEdit(pedido)} className="text-blue-500 hover:text-blue-700">
                                    <FiEdit />
                                </button>
                                <button onClick={() => handleDelete(pedido.id)} className="text-red-500 hover:text-red-700 ml-2">
                                    <FiTrash />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}