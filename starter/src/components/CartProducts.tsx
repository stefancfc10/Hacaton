import { useContext, useEffect, useMemo } from "react";
import CartProduct from "./CartProduct";
import Link from "next/link";
import { useRouter } from "next/router";
import { ProductTypes } from "@/types";
import { GetTotalCostContext } from "@/context/GetTotalCostContext";

interface CartProductsProps {
    products: ProductTypes[];
}

const CartProducts: React.FC<CartProductsProps> = ({ products }) => {
    const router = useRouter();
    // const shippingCost = router.pathname === "/checkout" ? 10 : 0;
    const { getTotalCost } = useContext(GetTotalCostContext);

    const totalPrice = useMemo(() => {
        return products.reduce((accumulator, currentItem) => {
            if (currentItem.discount.isDiscounted) {
                if (currentItem.prodQuantity) {
                    return accumulator + (currentItem.price - (currentItem.price * currentItem.discount.discount_price) / 100) * currentItem.prodQuantity;
                } else {
                    return accumulator + (currentItem.price - (currentItem.price * currentItem.discount.discount_price) / 100);
                }
            } else {
                if (currentItem.prodQuantity) {
                    return accumulator + (currentItem.price * currentItem.prodQuantity);
                } else {
                    return accumulator + currentItem.price;
                }
            }
        }, 0);
    }, [products]);

    useEffect(() => {
        getTotalCost(totalPrice);
    }, [getTotalCost, totalPrice]);

    return (
        <section className="cart-products-section pt-3">
            <div className="container cart-products-wrapper">
                {products && products.map(data => {
                    return (
                        <CartProduct key={data.id} product={data} />
                    )
                })}
            </div>
            <div className="container">
                <div className="total-price d-flex justify-content-between px-1 py-2">
                    <p>Subtotal</p>
                    <p>&euro;{totalPrice}</p>
                </div>
                {router.pathname === "/checkout" ?
                    <div className="shipping-price d-flex justify-content-between px-1 py-2">
                        <p>Shipping</p>
                        <p>&euro;10</p>
                    </div>
                    :
                    <div className="desc">
                        <p>* Shipping costs not included. Proceed to checkout to calculate shipping costs.</p>
                        <Link href={"/checkout"}>Checkout</Link>
                    </div>
                }
            </div>
        </section>
    )
}

export default CartProducts;