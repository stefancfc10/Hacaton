import { FavoritesAndBasketContext } from "@/context/BasketContextConstructor";
import { ProductTypes } from "@/types";
import { useContext } from "react";

interface CartProductProps {
    product: ProductTypes;
}

const CartProduct: React.FC<CartProductProps> = ({ product }) => {
    const { handleRemoveProduct } = useContext(FavoritesAndBasketContext);

    const handleClick = () => {
        handleRemoveProduct(product);
    }

    const printDiscountedPrice = () => {
        if (product.discount.isDiscounted) {
            return (
                <>
                    <p className="line-through-paragraph">&euro;{product.prodQuantity ? product.price * product.prodQuantity : product.price}</p>
                    <p>&euro;{product.prodQuantity ? (product.price - (product.price * product.discount.discount_price) / 100) * product.prodQuantity : (product.price - (product.price * product.discount.discount_price) / 100)}</p>
                </>
            )
        } else {
            return (
                <p>&euro;{product.prodQuantity ? product.price * product.prodQuantity : product.price}</p>
            )
        }
    }

    return (
        <div className="row cart-product align-items-center">
            <div className="col-3 img-container">
                <img src={product.images[0]} alt="product image" />
            </div>
            <div className="col-6 title d-flex flex-column justify-content-between">
                <h3>{product.name} x{product.prodQuantity}</h3>
                <button type="button" className="remove-btn" onClick={handleClick}>Remove</button>
            </div>
            <div className="col-3 price">
                {printDiscountedPrice()}
            </div>
        </div>
    )
}

export default CartProduct;