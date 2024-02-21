import CartProducts from "@/components/CartProducts";
import ContinueShopping from "@/components/ContinueShopping";
import { FavoritesAndBasketContext } from "@/context/BasketContextConstructor";
import React, { useContext } from "react";

const Cart: React.FC = () => {

  const { basket } = useContext(FavoritesAndBasketContext);

  return (
    <main className="main">
      <div className="cart-container">
        <div className="cart-header">Your Cart</div>
        <ContinueShopping />
        <div className="product-and-price-headers">
          <div className="product-header">Product</div>
          <div className="price-header">Price</div>
        </div>
      </div>

      {basket.length > 0 ? (
        <CartProducts products={basket} />
      ) : (
        <div className="products-container">
          <img
            src="/images/home_page/bg_spiral_butterfly_home_mobile.svg"
            alt=""
          />
          <div className="empty-cart">Your cart is empty</div>
        </div>
      )}
    </main>
  );
};

export default Cart;
