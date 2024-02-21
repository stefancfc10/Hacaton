import { BasketType, ProductTypes } from "@/types";
import dynamic from "next/dynamic";
import React, { createContext, useEffect, useState } from "react";

export interface ProductsTypeContext {
  favorites: ProductTypes[];
  basket: ProductTypes[];
  handleAddFavorite: (res: ProductTypes) => void;
  handleRemoveFavorite: (res: ProductTypes) => void;
  handleAddToBasket: (res: BasketType) => void;
  handleRemoveProduct: (res: ProductTypes) => void;
  clearWholeBasket: () => void;
}
export const FavoritesAndBasketContext = createContext<ProductsTypeContext>({
  favorites: [],
  basket: [],
  handleAddFavorite: (res: ProductTypes) => {},
  handleRemoveFavorite: (res: ProductTypes) => {},
  handleAddToBasket: (res: BasketType) => {},
  handleRemoveProduct: (res: ProductTypes) => {},
  clearWholeBasket: () => {},
});

interface Props {
  children: React.ReactNode;
}

const LS_FAVORITES = "favorites";
const LS_BASKET = "basket";

const BasketContextConstructor = ({ children }: Props) => {
  const [favorites, setFavorites] = useState<ProductTypes[]>(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem(LS_FAVORITES)) {
        return JSON.parse(localStorage.getItem(LS_FAVORITES)!);
      }
      return [];
    }
  });
  const [basket, setBasket] = useState<BasketType[]>(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem(LS_BASKET)) {
        return JSON.parse(localStorage.getItem(LS_BASKET)!);
      }
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(LS_FAVORITES, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(LS_BASKET, JSON.stringify(basket));
  }, [basket]);

  const handleRemoveFavorite = (res: ProductTypes) => {
    setFavorites(favorites.filter((favorite) => favorite.id !== res.id));
  };

  const handleAddFavorite = (res: ProductTypes) => {
    setFavorites([...favorites, res]);
  };

  const handleAddToBasket = (res: BasketType) => {
    setBasket([...basket, res]);
  };
  const handleRemoveProduct = (res: ProductTypes) => {
    setBasket(basket.filter((prod) => prod.id !== res.id));
  };
  const clearWholeBasket = () => {
    setBasket([]);
  };

  return (
    <FavoritesAndBasketContext.Provider
      value={{
        favorites,
        basket,
        handleAddFavorite,
        handleRemoveFavorite,
        handleAddToBasket,
        handleRemoveProduct,
        clearWholeBasket,
      }}
    >
      {children}
    </FavoritesAndBasketContext.Provider>
  );
};
export default dynamic(() => Promise.resolve(BasketContextConstructor), {
  ssr: false,
});
