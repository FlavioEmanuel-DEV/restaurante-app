import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePromocao } from '../contexts/PromocaoContext'; //
import { FiEdit, FiTrash, FiPlus, FiSearch } from 'react-icons/fi';

interface Promocao {
    id: number;
    nome: string;
    descricao: string;
    dataInicio: string;
    dataFim: string;
    imagem?: string;
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

    useEffect(() => {
        if (id) {
            const promocaoToEdit = promocoes.find(promocao => promocao.id === parseInt(id));
            if (promocaoToEdit) {
                setSelectedPromocao(promocaoToEdit);
                setFormData(promocaoToEdit);
                setShowForm(true);
            }
        }
    }, [id, promocoes]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedPromocao) {
            // Editar promoção existente
            setPromocoes(promocoes.map(promocao => promocao.id === selectedPromocao.id ? formData : promocao));
        } else {
            // Adicionar nova promoção
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
            imagem:'',
        });
        setShowForm(false);
    };

    const handleEdit = (promocao: Promocao) => {
        setSelectedPromocao(promocao);
        setFormData(promocao);
        setShowForm(true);
    };

    const handleDelete = (id: number) => {
        setPromocoes(promocoes.filter(promocao => promocao.id !== id));
    };

    const filteredPromocoes = promocoes.filter(promocao => 
        promocao.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setFormData({ ...formData, imagem: reader.result as string }); // Atualiza o estado com a nova imagem
            setPreviewImage(reader.result as string);
          };
          reader.readAsDataURL(file);
        }
      };


    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Gerenciamento de Promoções</h1>

            {/* Filtro de Busca e Botão para Adicionar Nova Promoção */}
            <div className="flex items-center mb-4">
                <div className="flex flex-1 items-center">
                    <FiSearch className="mr-2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar promoção..."
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
                    <FiPlus /> Adicionar Nova Promoção
                </button>
            </div>

            {/* Formulário */}
            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <h2 className="text-xl font-bold mb-4">
                        {selectedPromocao ? 'Editar Promoção' : 'Adicionar Nova Promoção'}
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Nome</label>
                            <input
                                type="text"
                                placeholder="Nome da promoção"
                                value={formData.nome}
                                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:outline-none"
                            />
                        </div>

                        <div className="col-span-2">
                        <label className="block text-sm font-['Poppins'] font-medium text-gray-700 mb-2">
                            Imagem da Promoção
                        </label>
  
                        <div className="relative group">
                            <div className="flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#FFA726] transition-colors duration-200">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            
                            <div className="text-center">
                                <svg 
                                className="w-8 h-8 mx-auto text-gray-400 group-hover:text-[#FFA726] transition-colors duration-200" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                                >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                />
                                </svg>
                                <p className="mt-2 text-sm text-gray-500">
                                Arraste e solte ou <span className="text-[#FFA726] font-medium">clique para enviar</span>
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                Formatos suportados: PNG, JPG, JPEG
                                </p>
                            </div>
                            </div>
                            
                            {previewImage && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
                                <img 
                                src={previewImage} 
                                alt="Preview da imagem" 
                                className="max-w-full max-h-48 rounded-lg"
                                />
                            </div>
                            )}
                        </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Descrição</label>
                            <input
                                type="text"
                                placeholder="Descrição da promoção"
                                value={formData.descricao}
                                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Data de Início</label>
                            <input
                                type="date"
                                value={formData.dataInicio}
                                onChange={(e) => setFormData({ ...formData, dataInicio: e.target.value })}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Data de Fim</label>
                            <input
                                type="date"
                                value={formData.dataFim}
                                onChange={(e) => setFormData({ ...formData, dataFim: e.target.value })}
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
                            {selectedPromocao ? 'Salvar Alterações' : 'Adicionar Promoção'}
                        </button>
                    </div>
                </form>
            )}

             {/* Lista de Promoções como Cards Individuais */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPromocoes.map(promocao => (
                    <div key={promocao.id} className="bg-white rounded-xl shadow-lg p-4">
                        <h3 className="text-lg font-bold">{promocao.nome}</h3>
                        <p className="text-gray-600">{promocao.descricao}</p>
                        <p className="text-gray-500">De {promocao.dataInicio} até {promocao.dataFim}</p>
                        <div className="flex justify-end mt-4">
                            <button onClick={() => handleEdit(promocao)} className="text-blue-500 hover:text-blue-700 mr-2">
                                <FiEdit />
                            </button>
                            <button onClick={() => handleDelete(promocao.id)} className="text-red-500 hover:text-red-700">
                                <FiTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 