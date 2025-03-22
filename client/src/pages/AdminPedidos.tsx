import React, { useState } from 'react';
import { FiEdit2Wrapper, FiTrash2Wrapper, FiPlusWrapper, FiSearchWrapper, FiFilterWrapper } from '../components/icons/IconsWrappers';

interface Pedido {
    id: number;
    cliente: string;
    descricao: string;
    total: number;
    status: string;
    data: string;
    itens: Array<{
        nome: string;
        quantidade: number;
        preco: number;
    }>;
}

const initialPedidos: Pedido[] = [
    {
        id: 1,
        cliente: 'Carlos Andrade',
        descricao: 'Pedido com 3 itens',
        total: 152.80,
        status: 'Em preparo',
        data: '2024-03-19 19:45',
        itens: [
            { nome: 'Risoto de Camarão', quantidade: 2, preco: 89.90 },
            { nome: 'Água Mineral', quantidade: 1, preco: 5.90 }
        ]
    },
    {
        id: 2,
        cliente: 'Ana Costa',
        descricao: 'Pedido com 2 itens',
        total: 89.90,
        status: 'Entregue',
        data: '2024-03-19 18:30',
        itens: [
            { nome: 'Filé Mignon', quantidade: 1, preco: 79.90 },
            { nome: 'Coca-Cola', quantidade: 1, preco: 8.90 }
        ]
    }
];

export default function AdminPedidos() {
    const [pedidos, setPedidos] = useState<Pedido[]>(initialPedidos);
    const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('Todos');
    const [showForm, setShowForm] = useState<boolean>(false);
    const [formData, setFormData] = useState<Pedido>({
        id: 0,
        cliente: '',
        descricao: '',
        total: 0,
        status: 'Pendente',
        data: '',
        itens: []
    });

    const statusColors = {
        'Pendente': 'bg-yellow-100 text-yellow-800',
        'Em preparo': 'bg-blue-100 text-blue-800',
        'Entregue': 'bg-green-100 text-green-800',
        'Cancelado': 'bg-red-100 text-red-800'
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedPedido) {
            setPedidos(pedidos.map(pedido => pedido.id === selectedPedido.id ? formData : pedido));
        } else {
            const newPedido = { ...formData, id: Date.now() };
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
            itens: []
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

    const filteredPedidos = pedidos
        .filter(pedido => 
            pedido.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pedido.descricao.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(pedido => statusFilter === 'Todos' ? true : pedido.status === statusFilter);

    return (
        <div className="min-h-screen bg-gray-50 pt-24">
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                    {/* Cabeçalho */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <h1 className="text-2xl md:text-3xl font-['Poppins'] font-bold text-gray-800">
                            Gerenciamento de Pedidos
                        </h1>
                <button
                    onClick={() => {
                        resetForm();
                        setShowForm(true);
                    }}
                            className="flex items-center justify-center gap-2 bg-[#FF5733] text-white px-4 py-2 rounded-lg hover:bg-[#E64A2E] transition-colors"
                >
                            <FiPlusWrapper className="w-5 h-5" />
                            <span>Novo Pedido</span>
                </button>
            </div>

                    {/* Filtros e Busca */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="relative">
                            <FiSearchWrapper className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar pedidos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:outline-none"
                            />
                        </div>
                        <div className="relative">
                            <FiFilterWrapper className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:outline-none appearance-none bg-white"
                            >
                                <option value="Todos">Todos os Status</option>
                                <option value="Pendente">Pendente</option>
                                <option value="Em preparo">Em preparo</option>
                                <option value="Entregue">Entregue</option>
                                <option value="Cancelado">Cancelado</option>
                            </select>
                        </div>
                    </div>

                    {/* Formulário */}
                    {showForm && (
                        <div className="bg-gray-50 rounded-xl p-6 mb-8">
                            <h2 className="text-xl font-['Poppins'] font-bold text-gray-800 mb-6">
                                {selectedPedido ? 'Editar Pedido' : 'Novo Pedido'}
                            </h2>
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                                    <input
                                        type="text"
                                value={formData.cliente}
                                onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                            <input
                                type="text"
                                value={formData.descricao}
                                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
                            <input
                                type="number"
                                value={formData.total}
                                onChange={(e) => setFormData({ ...formData, total: parseFloat(e.target.value) })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
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
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                            <input
                                type="datetime-local"
                                value={formData.data}
                                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:outline-none"
                                required
                            />
                    </div>

                                <div className="md:col-span-2 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={resetForm}
                                        className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                                        className="px-4 py-2 bg-[#FF5733] text-white rounded-lg hover:bg-[#E64A2E] transition-colors"
                        >
                                        {selectedPedido ? 'Salvar Alterações' : 'Criar Pedido'}
                        </button>
                    </div>
                </form>
                        </div>
            )}

            {/* Lista de Pedidos */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left border-b-2 border-gray-100">
                                    <th className="pb-3 font-['Poppins'] text-gray-600">Cliente</th>
                                    <th className="pb-3 font-['Poppins'] text-gray-600 hidden md:table-cell">Data</th>
                                    <th className="pb-3 font-['Poppins'] text-gray-600">Status</th>
                                    <th className="pb-3 font-['Poppins'] text-gray-600 text-right">Total</th>
                                    <th className="pb-3 font-['Poppins'] text-gray-600 w-20">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredPedidos.map((pedido) => (
                                    <tr 
                                        key={pedido.id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="py-4">
                                            <div>
                                                <p className="font-medium text-gray-800">{pedido.cliente}</p>
                                                <p className="text-sm text-gray-500">{pedido.descricao}</p>
                                            </div>
                                        </td>
                                        <td className="py-4 hidden md:table-cell">
                                            <span className="text-sm text-gray-600">
                                                {new Date(pedido.data).toLocaleString('pt-BR')}
                                            </span>
                                        </td>
                                        <td className="py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[pedido.status as keyof typeof statusColors]}`}>
                                                {pedido.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right">
                                            <span className="font-medium text-gray-800">
                                                R$ {pedido.total.toFixed(2)}
                            </span>
                                        </td>
                                        <td className="py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(pedido)}
                                                    className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                                                    title="Editar pedido"
                                                >
                                                    <FiEdit2Wrapper className="w-4 h-4" />
                                </button>
                                                <button
                                                    onClick={() => handleDelete(pedido.id)}
                                                    className="p-2 text-red-600 hover:text-red-800 transition-colors"
                                                    title="Excluir pedido"
                                                >
                                                    <FiTrash2Wrapper className="w-4 h-4" />
                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredPedidos.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-gray-500">Nenhum pedido encontrado.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}