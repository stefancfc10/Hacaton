import AddToCartModal from "@/components/AddToCartModal";
import Breadcrumbs from "@/components/BreadCrumbs";
import Maintenance from "@/components/Maintenance";
import ProductCard from "@/components/ProductCard";
import ProductSameCategoryCard from "@/components/ProductSameCategoryCard";
import { FavoritesAndBasketContext } from "@/context/BasketContextConstructor";
import { ToggleAddToCartModalContext } from "@/context/ToggleAddToCartModal";
import { ProductTypes } from "@/types";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

interface Props {
  product: ProductTypes;
}

const ProductsDetail: NextPage<Props> = ({ product }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productQuantity, setProductQuantity] = useState<number>(1);
  const [filteredData, setFilteredData] = useState<ProductTypes[]>([]);
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { toggle, toggleAddToCart } = useContext(ToggleAddToCartModalContext);

  const {
    favorites,
    basket,
    handleAddFavorite,
    handleRemoveFavorite,
    handleAddToBasket,
  } = useContext(FavoritesAndBasketContext);

  const isFavorite = favorites?.find((fav) => fav.id === product.id);
  const isAddedToBasket = basket?.find((item) => item.id === product.id);

  // fetching same products as the product
  useEffect(() => {
    fetch("http://localhost:5001/products")
      .then((res) => res.json())
      .then((data) => {
        const productsData = data.filter((prod: ProductTypes) => {
          if (prod.category === product.category) {
            return true;
          }
          return false;
        });
        setFilteredData(productsData);
      })
      .catch((err) => console.log(err, "error fetching the data"));
  }, []);

  // fns for the image carousel
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? product.images.length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === product.images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // fns for the quantity
  const handlePlusProductQuantity = (product: ProductTypes) => {
    if (!product.inStock) {
      return;
    }
    if (productQuantity < +product.quantity) {
      setProductQuantity((prev) => prev + 1);
    }
  };

  const handleMinusProductQuantity = () => {
    if (!product.inStock) {
      return;
    }

    if (productQuantity > 1) {
      setProductQuantity((prev) => prev - 1);
    } else {
      setProductQuantity(1);
    }
  };

  const toggleModal = () => {
    toggleAddToCart(!toggle);
  };

  return (
    <div className="main">
      <div className="container-fluid position-relative">
        <div className="row">
          <div className="col-12 px-0 position-relative">
            {/* modal  */}
            {toggle && (
              <AddToCartModal title={product.name} closeModal={toggleModal} />
            )}
            {/* discount  */}
            {product.discount.isDiscounted && (
              <>
                <span className="discounted-price">
                  - {product.discount.discount_price}%
                </span>
              </>
            )}

            {/* main image */}
            <img
              style={{ height: "600px" }}
              src={product.images[currentIndex]}
              alt={product.name}
            />

            {/* slide left and right  */}
            <img
              src="/icons/leftArrow.png"
              className="left-arrow-detail"
              alt="leftArrow"
              onClick={goToPrevious}
            />
            <img
              src="/icons/rightArrow.png"
              className="right-arrow-detail"
              alt="leftArrow"
              onClick={goToNext}
            />
          </div>
          {/* actice dots */}
          <div className="col-6 offset-3">
            <div className="d-flex justify-content-center align-items-center py-3 py-2 circles-container">
              {product.images.map((image, index) => {
                return (
                  <img
                    key={index}
                    onClick={() => goToSlide(index)}
                    src={
                      index === currentIndex
                        ? "/icons/bigCircle.svg"
                        : "/icons/smallCircle.svg"
                    }
                    className="circles text-center mr-2"
                  />
                );
              })}
            </div>
          </div>
          <Breadcrumbs
            home="Home"
            type={capitalizeFirstLetter(product.type)}
            category={capitalizeFirstLetter(product.category)}
            name={capitalizeFirstLetter(product.name)}
          />

          <div className="col-12">
            <h2>{product.name}</h2>
            <h5
              className={`${product.discount.isDiscounted ? "line-through mr-2" : ""
                } d-inline`}
            >
              &euro;{product.price}
            </h5>
            {product.discount.isDiscounted && (
              <h5 className="calculated-discounted-price d-inline">
                &euro;
                {product.price -
                  (product.price * product.discount.discount_price) / 100}
              </h5>
            )}
          </div>
        </div>
        <div className="row d-flex align-items-center">
          <div className="col-6">
            <div
              className={`add-quantity px-5 d-flex align-items-center justify-content-around my-3 ${!product.inStock && "opacity-1"
                }`}
            >
              <span
                className="px-3 border-right"
                onClick={() => {
                  handlePlusProductQuantity(product);
                }}
              >
                +
              </span>
              <span className="px-3 border-right">{productQuantity}</span>
              <span className="px-3" onClick={handleMinusProductQuantity}>
                -
              </span>
            </div>
          </div>
          <div className="col-6">
            <div
              className="favorites d-inline"
              onClick={() =>
                isFavorite
                  ? handleRemoveFavorite(product)
                  : handleAddFavorite(product)
              }
            >
              {isFavorite ? (
                <img
                  className="d-inline mr-1"
                  src="/icons/dark-heart.png"
                  style={{ width: "30px" }}
                  alt=""
                />
              ) : (
                <img
                  className="d-inline"
                  src="/icons/heart.png"
                  style={{ width: "40px" }}
                  alt=""
                />
              )}
              <p className="d-inline">Save for later</p>
            </div>
          </div>
          <div className="col-12 mt-2 mb-5">
            <div
              className={`add-to-card  text-center p-2 ${!product.inStock && "opacity-1"
                }`}
            >
              {isAddedToBasket ? (
                <p className="mb-0">Added to the card</p>
              ) : (
                <>
                  {product.inStock ? (
                    <p
                      className="mb-0"
                      onClick={() => {
                        handleAddToBasket({
                          ...product,
                          prodQuantity: productQuantity,
                        });
                        toggleModal();
                      }}
                    >
                      Add to Card
                    </p>
                  ) : (
                    <>
                      <p className="mb-0">Out of stock</p>
                    </>
                  )}
                </>
              )}
            </div>
            {!product.inStock && (
              <div className="my-2">
                <span className="d-block mb-3">
                  Unfortunately, this item has been sold. But all is not lost!
                  Write to us and we’ll do our best to replicate it for you!
                </span>
                <Link
                  href={"/customOrders"}
                  className="request-order text-center font-weight-bold d-block text-dark"
                >
                  Request Custom Order
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12 mb-4">
            <p>{product.product_info.description}</p>
          </div>
          <div className="col-12 mb-4">
            <p className="mb-1">
              <strong className="mr-2">Material:</strong>
              {product.product_info.material}
            </p>
            <p className="mb-1">
              <strong className="mr-2">Dimensions:</strong>
              {product.product_info.dimensions}
            </p>
            <p className="mb-1">
              <strong className="mr-2">Weight:</strong>
              {product.product_info.weight}
            </p>
          </div>
          <Maintenance product={product} />

          <div className="col-12">
            <p>
              Follow these tips to maintain the beauty and integrity of your
              earrings, ensuring they remain a stunning accessory for years to
              come.
            </p>
          </div>

          <div className="col-2 offset-5 py-5">
            <img
              style={{ width: "40px" }}
              src="/images/home_page/leaf_divider.svg"
              className="text-center"
              alt="leaf"
            />
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h4 className="px-1 mb-3">You might also like:</h4>
          </div>
          <div className="col-12">
            <ProductSameCategoryCard products={filteredData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const productsResponse = await fetch("http://localhost:5001/products");
  const productsData: ProductTypes[] = await productsResponse.json();

  const paths = productsData.map((product) => {
    return {
      params: {
        id: product.id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  let product: ProductTypes | undefined = undefined;

  if (params?.id) {
    const productsResponse = await fetch(
      `http://localhost:5001/products/${params.id}`
    );
    product = await productsResponse.json();
  }

  return {
    props: {
      product,
    },
  };
};
