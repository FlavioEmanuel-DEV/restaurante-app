import React, { createContext, useContext, useState } from 'react';

interface ItemCardapio {
    id: number;
    nome: string;
}

interface CardapioContextType {
    itensCardapio: ItemCardapio[];
    setItensCardapio: React.Dispatch<React.SetStateAction<ItemCardapio[]>>;
}

const CardapioContext = createContext<CardapioContextType | undefined>(undefined);

export const CardapioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [itensCardapio, setItensCardapio] = useState<ItemCardapio[]>([
        { id: 1, nome: 'Prato Principal 1' },
        { id: 2, nome: 'Prato Principal 2' },
        { id: 3, nome: 'Prato Principal 3' },
        // Adicione mais itens conforme necessário
    ]);

    return (
        <CardapioContext.Provider value={{ itensCardapio, setItensCardapio }}>
            {children}
        </CardapioContext.Provider>
    );
};

export const useCardapio = () => {
    const context = useContext(CardapioContext);
    if (!context) {
        throw new Error('useCardapio must be used within a CardapioProvider');
    }
    return context;
}; 