import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePromocao } from '../contexts/PromocaoContext';
import { FiEdit2Wrapper, FiTrash2Wrapper, FiPlusWrapper, FiSearchWrapper, FiCalendarWrapper, FiImageWrapper } from '../components/icons/IconsWrappers';

interface Promocao {
    id: number;
    nome: string;
    descricao: string;
    dataInicio: string;
    dataFim: string;
    imagem?: string;
    itemId?: number;
}

const initialPromocoes: Promocao[] = [
    { id: 1, nome: 'Promoção de Verão', descricao: 'Desconto de 20% em todos os pratos.', dataInicio: '2024-01-01', dataFim: '2024-03-31' },
    { id: 2, nome: 'Festa Junina', descricao: 'Compre 1, leve 2 em bebidas.', dataInicio: '2024-06-01', dataFim: '2024-06-30' },
    // Adicione mais promoções conforme necessário
];

export default function PromocaoAdmin() {
    const { id } = useParams<{ id: string }>();
    const { promocoes, setPromocoes } = usePromocao(); 
    const [selectedPromocao, setSelectedPromocao] = useState<Promocao | null>(null);
    const [formData, setFormData] = useState<Promocao>({
        id: 0,
        nome: '',
        descricao: '',
        dataInicio: '',
        dataFim: '',
        imagem: '',
    });
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showForm, setShowForm] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const promocaoToEdit = promocoes.find(promocao => promocao.id === parseInt(id));
            if (promocaoToEdit) {
                setSelectedPromocao(promocaoToEdit);
                setFormData(promocaoToEdit);
                setShowForm(true);
                setPreviewImage(promocaoToEdit.imagem || null);
            }
        }
    }, [id, promocoes]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedPromocao) {
            setPromocoes(promocoes.map(promocao => promocao.id === selectedPromocao.id ? formData : promocao));
        } else {
            const newPromocao = { ...formData, id: Date.now() };
            setPromocoes([...promocoes, newPromocao]);
        }
        resetForm();
    };

    const resetForm = () => {
        setSelectedPromocao(null);
        setFormData({
            id: 0,
            nome: '',
            descricao: '',
            dataInicio: '',
            dataFim: '',
            imagem: '',
        });
        setPreviewImage(null);
        setShowForm(false);
    };

    const handleEdit = (promocao: Promocao) => {
        setSelectedPromocao(promocao);
        setFormData(promocao);
        setPreviewImage(promocao.imagem || null);
        setShowForm(true);
    };

    const handleDelete = (id: number) => {
        setPromocoes(promocoes.filter(promocao => promocao.id !== id));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
                const imageUrl = reader.result as string;
                setFormData({ ...formData, imagem: imageUrl });
                setPreviewImage(imageUrl);
          };
          reader.readAsDataURL(file);
        }
      };

    const filteredPromocoes = promocoes.filter(promocao =>
        promocao.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        promocao.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Cabeçalho e Ações */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <h1 className="text-2xl md:text-3xl font-['Poppins'] font-bold text-gray-800">
                        Gerenciamento de Promoções
                    </h1>
                    <button
                        onClick={() => {
                            resetForm();
                            setShowForm(true);
                        }}
                        className="flex items-center justify-center gap-2 bg-[#FF5733] text-white px-4 py-2 rounded-xl hover:bg-[#E64A2E] transition-colors shadow-lg shadow-[#FF5733]/20"
                    >
                        <FiPlusWrapper className="w-5 h-5" />
                        <span>Nova Promoção</span>
                    </button>
                </div>

                {/* Barra de Busca */}
                <div className="relative mb-6">
                    <FiSearchWrapper className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar promoções..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#FF5733] focus:outline-none bg-white shadow-sm"
                    />
            </div>

            {/* Formulário */}
            {showForm && (
                    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                        <h2 className="text-xl font-['Poppins'] font-bold text-gray-800 mb-6">
                            {selectedPromocao ? 'Editar Promoção' : 'Nova Promoção'}
                    </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Upload de Imagem */}
                                <div className="md:col-span-2">
                        <label className="block text-sm font-['Poppins'] font-medium text-gray-700 mb-2">
                            Imagem da Promoção
                        </label>
                        <div className="relative group">
                                        <div className={`
                                            flex items-center justify-center w-full h-48 border-2 border-dashed 
                                            rounded-xl transition-colors duration-200
                                            ${previewImage ? 'border-[#FF5733]' : 'border-gray-300 hover:border-[#FF5733]'}
                                        `}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            
                                            {previewImage ? (
                                                <div className="relative w-full h-full">
                                                    <img 
                                                        src={previewImage}
                                                        alt="Preview"
                                                        className="w-full h-full object-cover rounded-lg"
                                                    />
                                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <FiImageWrapper className="w-8 h-8 text-white" />
                                                    </div>
                                                </div>
                                            ) : (
                            <div className="text-center">
                                                    <FiImageWrapper className="w-8 h-8 mx-auto text-gray-400 group-hover:text-[#FF5733] transition-colors" />
                                <p className="mt-2 text-sm text-gray-500">
                                                        Arraste e solte ou <span className="text-[#FF5733] font-medium">clique para enviar</span>
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                Formatos suportados: PNG, JPG, JPEG
                                </p>
                            </div>
                                            )}
                            </div>
                        </div>
                        </div>

                                {/* Campos do Formulário */}
                                <div className="space-y-4">
                        <div>
                                        <label className="block text-sm font-['Poppins'] font-medium text-gray-700 mb-1">
                                            Nome da Promoção
                                        </label>
                            <input
                                type="text"
                                            value={formData.nome}
                                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-['Poppins'] font-medium text-gray-700 mb-1">
                                            Descrição
                                        </label>
                                        <textarea
                                value={formData.descricao}
                                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:outline-none resize-none"
                                            rows={3}
                                required
                            />
                                    </div>
                        </div>

                                <div className="space-y-4">
                        <div>
                                        <label className="block text-sm font-['Poppins'] font-medium text-gray-700 mb-1">
                                            Data de Início
                                        </label>
                                        <div className="relative">
                                            <FiCalendarWrapper className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="date"
                                value={formData.dataInicio}
                                onChange={(e) => setFormData({ ...formData, dataInicio: e.target.value })}
                                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:outline-none"
                                required
                            />
                        </div>
                                    </div>
                        <div>
                                        <label className="block text-sm font-['Poppins'] font-medium text-gray-700 mb-1">
                                            Data de Término
                                        </label>
                                        <div className="relative">
                                            <FiCalendarWrapper className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="date"
                                value={formData.dataFim}
                                onChange={(e) => setFormData({ ...formData, dataFim: e.target.value })}
                                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:outline-none"
                                required
                            />
                                        </div>
                                    </div>
                        </div>
                    </div>

                            <div className="flex justify-end gap-3 pt-6 border-t">
                        <button
                            type="button"
                            onClick={resetForm}
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors font-['Poppins']"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                                    className="px-6 py-2 bg-[#FF5733] text-white rounded-lg hover:bg-[#E64A2E] transition-colors shadow-lg shadow-[#FF5733]/20 font-['Poppins']"
                        >
                                    {selectedPromocao ? 'Salvar Alterações' : 'Criar Promoção'}
                        </button>
                    </div>
                </form>
                    </div>
            )}

                {/* Lista de Promoções */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPromocoes.map((promocao) => (
                        <div
                            key={promocao.id}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group"
                        >
                            {promocao.imagem ? (
                                <div className="relative h-48">
                                    <img
                                        src={promocao.imagem}
                                        alt={promocao.nome}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            ) : (
                                <div className="h-48 bg-gray-100 flex items-center justify-center">
                                    <FiImageWrapper className="w-12 h-12 text-gray-300" />
                                </div>
                            )}

                            <div className="p-6">
                                <h3 className="text-lg font-['Poppins'] font-semibold text-gray-800 mb-2">
                                    {promocao.nome}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {promocao.descricao}
                                </p>
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <span>
                                        {new Date(promocao.dataInicio).toLocaleDateString('pt-BR')} até{' '}
                                        {new Date(promocao.dataFim).toLocaleDateString('pt-BR')}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-100">
                                <button
                                    onClick={() => handleEdit(promocao)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Editar promoção"
                                >
                                    <FiEdit2Wrapper className="w-4 h-4" />
                            </button>
                                <button
                                    onClick={() => handleDelete(promocao.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Excluir promoção"
                                >
                                    <FiTrash2Wrapper className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
                </div>

                {filteredPromocoes.length === 0 && (
                    <div className="text-center py-12">
                        <FiImageWrapper className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-['Poppins'] font-medium text-gray-800 mb-2">
                            Nenhuma promoção encontrada
                        </h3>
                        <p className="text-gray-500">
                            Comece criando uma nova promoção clicando no botão acima.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
} 