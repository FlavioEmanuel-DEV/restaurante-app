import React, { createContext, useContext, useState } from 'react';

interface Promocao {
    [x: string]: any;
    id: number;
    nome: string;
    descricao: string;
    dataInicio: string;
    dataFim: string;
    imagem?: string;
}

interface PromocaoContextType {
    promocoes: Promocao[];
    setPromocoes: React.Dispatch<React.SetStateAction<Promocao[]>>;
}

const PromocaoContext = createContext<PromocaoContextType | undefined>(undefined);

export const PromocaoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [promocoes, setPromocoes] = useState<Promocao[]>([
        { id: 1, nome: 'Promoção de Verão', descricao: 'Desconto de 20% em todos os pratos.', dataInicio: '2024-01-01', dataFim: '2024-03-31' },
        { id: 2, nome: 'Festa Junina', descricao: 'Compre 1, leve 2 em bebidas.', dataInicio: '2024-06-01', dataFim: '2024-06-30' },
    ]);

    return (
        <PromocaoContext.Provider value={{ promocoes, setPromocoes }}>
            {children}
        </PromocaoContext.Provider>
    );
};

export const usePromocao = () => {
    const context = useContext(PromocaoContext);
    if (!context) {
        throw new Error('usePromocao must be used within a PromocaoProvider');
    }
    return context;
}; 