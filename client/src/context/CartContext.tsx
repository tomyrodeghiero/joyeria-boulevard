"use client";
import React, { createContext, useContext, useState } from "react";

type Product = {
  mainImageUrl: string;
  name: string;
  price: number;
  productId: string;
};

type CartItem = Product & { quantity: number };

// Creación del contexto
const CartContext = createContext({} as any);

// Hook personalizado para usar el contexto del carrito
export const useCart = () => useContext(CartContext);

// Proveedor del contexto
export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (
    productId: any,
    name: string,
    price: number,
    mainImageUrl: string,
    quantity: any
  ) => {
    setCart((prevCart: any) => {
      const productInCart = prevCart.find(
        (item: any) => item.productId === productId
      );
      if (productInCart) {
        // Si el producto ya está en el carrito, aumentar la cantidad
        return prevCart.map((item: any) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Si el producto no está en el carrito, añadirlo
        return [
          ...prevCart,
          { productId, name, price, mainImageUrl, quantity },
        ];
      }
    });
  };

  const increment = (productId: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrement = (productId: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.productId !== productId)
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, increment, decrement }}
    >
      {children}
    </CartContext.Provider>
  );
};
