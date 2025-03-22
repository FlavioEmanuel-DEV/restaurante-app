import React, { useState } from 'react';
import { FiEditWrapper, FiTrashWrapper, FiPlusWrapper, FiSearchWrapper } from '../components/icons/IconsWrappers';

interface Reserva {
    id: number;
    nome: string;
    data: string;
    horario: string;
    mesa: string;
    status: string;
}

const initialReservas: Reserva[] = [
    { id: 1, nome: 'João Silva', data: '2024-03-20', horario: '19:00', mesa: 'A3', status: 'Confirmada' },
    { id: 2, nome: 'Maria Souza', data: '2024-03-21', horario: '20:30', mesa: 'B2', status: 'Pendente' },
    // Adicione mais reservas conforme necessário
];

export default function ReservaAdmin() {
    const [reservas, setReservas] = useState<Reserva[]>(initialReservas);
    const [selectedReserva, setSelectedReserva] = useState<Reserva | null>(null);
    const [formData, setFormData] = useState<Reserva>({
        id: 0,
        nome: '',
        data: '',
        horario: '',
        mesa: '',
        status: 'Pendente',
    });
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showForm, setShowForm] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedReserva) {
            // Editar reserva existente
            setReservas(reservas.map(reserva => reserva.id === selectedReserva.id ? formData : reserva));
        } else {
            // Adicionar nova reserva
            const newReserva = { ...formData, id: Date.now() }; // Usando Date.now() como ID único
            setReservas([...reservas, newReserva]);
        }
        resetForm();
    };

    const resetForm = () => {
        setSelectedReserva(null);
        setFormData({
            id: 0,
            nome: '',
            data: '',
            horario: '',
            mesa: '',
            status: 'Pendente',
        });
        setShowForm(false);
    };

    const handleEdit = (reserva: Reserva) => {
        setSelectedReserva(reserva);
        setFormData(reserva);
        setShowForm(true);
    };

    const handleDelete = (id: number) => {
        setReservas(reservas.filter(reserva => reserva.id !== id));
    };

    const filteredReservas = reservas.filter(reserva => 
        reserva.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800">Gerenciamento de Reservas</h1>

            {/* Filtro de Busca e Botão para Adicionar Nova Reserva */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                <div className="flex w-full sm:flex-1 items-center">
                    <FiSearchWrapper className="mr-2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar reserva..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border p-2 rounded-lg w-full"
                    />
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setShowForm(true);
                    }}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#FF5733] text-white px-4 py-2 rounded-lg hover:bg-[#E64A2E]"
                >
                    <FiPlusWrapper /> Adicionar Nova Reserva
                </button>
            </div>

            {/* Formulário */}
            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
                    <h2 className="text-xl font-bold mb-4">
                        {selectedReserva ? 'Editar Reserva' : 'Adicionar Nova Reserva'}
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Nome</label>
                            <input
                                type="text"
                                placeholder="Nome do cliente"
                                value={formData.nome}
                                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Data</label>
                            <input
                                type="date"
                                value={formData.data}
                                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Horário</label>
                            <input
                                type="time"
                                value={formData.horario}
                                onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Mesa</label>
                            <input
                                type="text"
                                placeholder="Número da mesa"
                                value={formData.mesa}
                                onChange={(e) => setFormData({ ...formData, mesa: e.target.value })}
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
                            {selectedReserva ? 'Salvar Alterações' : 'Adicionar Reserva'}
                        </button>
                    </div>
                </form>
            )}

            {/* Lista de Reservas */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                <h2 className="text-xl font-bold mb-4">Reservas</h2>
                <div className="overflow-x-auto">
                    <ul className="min-w-full">
                        {filteredReservas.map(reserva => (
                            <li key={reserva.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 p-4 border-b hover:bg-gray-50 transition">
                                <div className="mb-2 sm:mb-0">
                                    <span className="block sm:inline">{reserva.nome}</span>
                                    <span className="block sm:inline sm:ml-2 text-gray-600">{reserva.data} {reserva.horario}</span>
                                    <span className="block sm:inline sm:ml-2">Mesa {reserva.mesa}</span>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(reserva)} className="text-blue-500 hover:text-blue-700 p-2">
                                        <FiEditWrapper />
                                    </button>
                                    <button onClick={() => handleDelete(reserva.id)} className="text-red-500 hover:text-red-700 p-2">
                                        <FiTrashWrapper />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
} 