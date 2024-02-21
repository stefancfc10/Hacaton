import { ProductTypes } from "@/types";
import Link from "next/link";

interface ProductCardProps {
  product: ProductTypes;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="col-6 mb-2 position-relative">
      {product.discount.isDiscounted && (
        <>
          <span className="discounted-price">
            - {product.discount.discount_price}%
          </span>
        </>
      )}
      <Link href={`productsPage/${product.id}`}>
        <img src={product.images[0]} alt="product image" />
      </Link>

      <div className="content px-2">
        <h4 className="h6">{product.name}</h4>
        <span
          className={`${product.discount.isDiscounted ? "line-through" : ""}`}
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
  );
};

export default ProductCard;
