import { ToggleAddToCartModalContext } from "@/context/ToggleAddToCartModal";
import { ProductTypes } from "@/types";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";

interface Props {
  products: ProductTypes[];
}

const ProductSameCategoryCard = ({ products }: Props) => {

  const router = useRouter();
  const { toggleAddToCart } = useContext(ToggleAddToCartModalContext);

  const handleClick = (id: number) => {
    router.push({
      pathname: `/productsPage/${id}`
    });

    toggleAddToCart(false);
  }

  return (
    <div className="choose-category d-flex">
      {products.map((product) => (
        <div
          key={product.id}
          className="category-product-container mb-2 position-relative px-0"
        >
          {product.discount.isDiscounted && (
            <span className="discounted-price">
              - {product.discount.discount_price}%
            </span>
          )}
          <Link href={`/productsPage/${product.id}`} onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            handleClick(+product.id)
          }}>
            <img
              src={product.images[0]}
              style={{ height: "240px" }}
              alt="product image"
              className="w-100 d-block"
            />
          </Link>

          <div className="content px-2">
            <p className="hide-overflow">{product.name}</p>
            <span
              className={`${
                product.discount.isDiscounted ? "line-through" : ""
              }`}
            >
              &euro;{product.price}
            </span>
            {product.discount.isDiscounted && (
              <span className="d-block calculated-discounted-price">
                &euro;
                {product.price -
                  (product.price * product.discount.discount_price) / 100}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSameCategoryCard;
