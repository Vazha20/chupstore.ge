"use client";

/*import {createContext, useContext, useState, ReactNode} from 'react';

type CartContextType = {
    cartCount: number;
    increaseCart: (amount?: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({children}) => {
    const [cartCount,setCartCount] = useState<number>(0)

    const increaseCart = (amount: number = 1 ) => {
        setCartCount(prev => prev + amount)
    };

    return(
        <CartContext.Provider value={{cartCount,increaseCart}}>
        {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}; */

'use client'
import { createContext, useContext, useState, ReactNode } from 'react';

type CartContextType = {
    cartCount: number;
    cartItems: string[];
    addItemToCart: (item: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartCount, setCartCount] = useState(0);
    const [cartItems, setCartItems] = useState<string[]>([]);

    const addItemToCart = (item: string) => {
        setCartItems(prev => [...prev, item]);
        setCartCount(prev => prev + 1);
    }

    return (
        <CartContext.Provider value={{ cartCount, cartItems, addItemToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
};
