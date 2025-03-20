import React, { useState } from 'react';
import { MenuItem } from '../types';
import camarao from '../assets/images/download.jpeg';
import { FiEditWrapper, FiTrashWrapper, FiPlusWrapper, FiSearchWrapper, FiToggleLeftWrapper, FiToggleRightWrapper, FiFilterWrapper } from '../components/icons/IconsWrappers';

const initialMenuItems: MenuItem[] = [
    // Exemplo de itens do cardápio
    {
        id: 1,
        nome: "Camarão à Milanesa",
        descricao: "Camarões empanados e fritos, servidos com molho tártaro",
        preco: 89.90,
        categoria: "Entradas",
        imagem: camarao,
        disponivel: true,
        promocao: false,
        desconto: 0,
        validoAte: "",
        ativa: true,
        qtdPessoas: 0,
    },
    // Adicione mais itens conforme necessário
];

export default function CardapioAdmin() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState<MenuItem>({
    id: 0,
    nome: '',
    descricao: '',
    preco: 0,
    categoria: '',
    imagem: '',
    disponivel: true,
    promocao: false,
    desconto: 0,
    validoAte: '',
    ativa: true,
    qtdPessoas: 0,
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showInactive, setShowInactive] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem) {
      setMenuItems(menuItems.map(item => item.id === selectedItem.id ? formData : item));
    } else {
      const newItem = { ...formData, id: Date.now() };
      setMenuItems([...menuItems, newItem]);
    }
    resetForm();
  };

  const resetForm = () => {
    setSelectedItem(null);
    setFormData({
      id: 0,
      nome: '',
      descricao: '',
      preco: 0,
      categoria: '',
      imagem: '',
      disponivel: true,
      promocao: false,
      desconto: 0,
      validoAte: '',
      ativa: true,
      qtdPessoas: 0,
    });
    setShowForm(false);
  };

  const handleEdit = (item: MenuItem) => {
    setSelectedItem(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  // Função para alternar o status ativo/inativo de um item
  const toggleItemStatus = (id: number) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, ativa: !item.ativa } : item
    ));
  };

  // Função para alternar a disponibilidade de um item
  const toggleItemAvailability = (id: number) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, disponivel: !item.disponivel } : item
    ));
  };

  const filteredItems = menuItems
    .filter(item => showInactive ? true : item.ativa) // Mostra itens inativos apenas se showInactive for true
    .filter(item => selectedCategory === 'Todas' || item.categoria === selectedCategory)
    .filter(item => item.nome.toLowerCase().includes(searchTerm.toLowerCase()));

    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Gerenciamento de Cardápio</h1>

      {/* Filtros e Busca */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <FiSearchWrapper className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar item..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:outline-none"
          />
        </div>
        
        <div className="relative">
          <FiFilterWrapper className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:outline-none"
          >
            <option value="Todas">Todas as Categorias</option>
            <option value="Entradas">Entradas</option>
            <option value="Pratos Principais">Pratos Principais</option>
            <option value="Sobremesas">Sobremesas</option>
            <option value="Bebidas">Bebidas</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="showInactive" className="cursor-pointer flex items-center gap-2">
            <input
              id="showInactive"
              type="checkbox"
              checked={showInactive}
              onChange={() => setShowInactive(!showInactive)}
              className="sr-only"
            />
            <div className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors ${showInactive ? 'bg-[#FF5733]' : 'bg-gray-300'}`}>
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${showInactive ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </div>
            <span>Mostrar Inativos</span>
          </label>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-[#FF5733] text-white px-4 py-2 rounded-lg hover:bg-[#E64A2E] transition-colors"
        >
          <FiPlusWrapper />
          {showForm ? 'Fechar Formulário' : 'Novo Item'}
        </button>
      </div>

      {/* Formulário */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">
            {selectedItem ? 'Editar Item' : 'Adicionar Novo Item'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome</label>
              <input
                type="text"
                placeholder="Nome do item"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Preço</label>
              <input
                type="number"
                step="0.01"
                placeholder="Preço"
                value={formData.preco}
                onChange={(e) => setFormData({ ...formData, preco: parseFloat(e.target.value) })}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Categoria</label>
              <select
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:outline-none"
              >
                <option value="">Selecione uma categoria</option>
                <option value="Entradas">Entradas</option>
                <option value="Pratos Principais">Pratos Principais</option>
                <option value="Sobremesas">Sobremesas</option>
                <option value="Bebidas">Bebidas</option>
              </select>
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

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Descrição</label>
              <textarea
                placeholder="Descrição do item"
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:outline-none"
                rows={3}
              />
            </div>
            
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.disponivel}
                  onChange={(e) => setFormData({ ...formData, disponivel: e.target.checked })}
                  className="rounded text-[#FF5733] focus:ring-[#FF5733]"
                />
                <span>Disponível</span>
              </label>
              
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.ativa}
                  onChange={(e) => setFormData({ ...formData, ativa: e.target.checked })}
                  className="rounded text-[#FF5733] focus:ring-[#FF5733]"
                />
                <span>Ativo</span>
              </label>
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
              {selectedItem ? 'Salvar Alterações' : 'Adicionar Item'}
            </button>
          </div>
        </form>
      )}

      {/* Lista de Itens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div 
            key={item.id} 
            className={`bg-white rounded-xl shadow-lg overflow-hidden ${!item.ativa ? 'opacity-70 border-2 border-red-300' : ''}`}
          >
            <div className="relative">
              <img 
                src={item.imagem} 
                alt={item.nome} 
                className="w-full h-48 object-cover"
              />
              {!item.ativa && (
                <div className="absolute inset-0 bg-red-500 bg-opacity-20 flex items-center justify-center">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full font-bold">
                    INATIVO
                  </span>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{item.nome}</h3>
                <span className="text-lg font-bold text-[#FF5733]">
                  R$ {item.preco.toFixed(2)}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{item.descricao}</p>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    {item.categoria}
                  </span>
                  <span 
                    className={`px-2 py-1 text-sm rounded-full ${
                      item.disponivel ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.disponivel ? 'Disponível' : 'Indisponível'}
                  </span>
                </div>
                <div className="flex gap-2">
                  
                  <button
                    onClick={() => toggleItemStatus(item.id)}
                    title={item.ativa ? "Inativar item" : "Ativar item"}
                    className={`${item.ativa ? 'text-blue-600' : 'text-gray-400'} hover:text-gray-800`}
                  >
                    
                    {item.ativa ? (
                      <FiToggleRightWrapper size={20} />
                    ) : (
                      <FiToggleLeftWrapper size={20} />
                    )}
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    title="Editar item"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FiEditWrapper size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    title="Excluir item"
                    className="text-red-600 hover:text-red-800"
                  >
                    <FiTrashWrapper size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">Nenhum item encontrado.</p>
        </div>
      )}
    </div>
  );
}