import ProductCard from "@/components/ProductCard";
import { ProductTypes } from "@/types";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";

interface Props {
  productsData: ProductTypes[];
}

const ProductsPage: NextPage<Props> = ({ productsData }) => {
  const router = useRouter();
  const [selectValue, setSelectValue] = useState(router.query.sort);
  const inputRef = useRef<HTMLInputElement>(null);
  const [visibleProducts, setVisibleProducts] = useState(4);
  const isLoadMoreVisible = visibleProducts < productsData.length;

  const handleOnSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setSelectValue(selectedValue);
    setVisibleProducts(4);

    router.push({
      pathname: "/productsPage",
      query: {
        ...router.query,
        sort: selectedValue,
      },
    });
  };

  // handles the search input
  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setVisibleProducts(4);

    router.push({
      pathname: "/productsPage",
      query: {
        ...router.query,
        searchTerm: inputRef?.current?.value.toLowerCase(),
      },
    });
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // handles the pagination
  const handleLoadMore = () => {
    setVisibleProducts((prevCount) => prevCount + 4);
  };

  return (
    <div className="main">
      <div className="container-fluid mb-4">
        <div className="row">
          <div className="col-12 px-0">
            {router.query.type === "jewelry" ? (
              <>
                <img
                  src="/images/jewelry_page_earrings/jewelry_title_earrings.jpg"
                  alt=""
                  style={{ height: "232px" }}
                />
              </>
            ) : (
              <img
                src="/images/home_decor_page_helmets/helmets_title.jpg"
                alt=""
                style={{ height: "232px" }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="font-weight-700 font-size-48">
              {router.query.type === "jewelry" ? "Jewerly" : "Home Decor"}
            </h1>
          </div>
          <div className="col-12 choose-category font-amulya">
            {router.query.type === "jewelry" ? (
              <ul className="d-flex align-items-center mb-0">
                {[
                  "Earrings",
                  "Rings",
                  "Necklaces",
                  "Bracelets",
                  "Sets",
                  "Other",
                ].map((prod) => {
                  return (
                    <li
                      key={prod}
                      className={`${
                        router.query.category === prod ? "how-active" : ""
                      }`}
                      onClick={() => {
                        setVisibleProducts(4);
                        router.push({
                          pathname: "/productsPage",
                          query: {
                            type: router.query.type,
                            sort: router.query.sort,
                            category: prod,
                          },
                        });
                      }}
                    >
                      {prod}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <>
                <ul className="d-flex align-items-center mb-3">
                  {["Helmets", "Other"].map((prod) => {
                    return (
                      <li
                        key={prod}
                        className={`${
                          router.query.category === prod ? "how-active" : ""
                        }`}
                        onClick={() => {
                          router.push({
                            pathname: "/productsPage",
                            query: {
                              type: router.query.type,
                              sort: router.query.sort,
                              category: prod,
                            },
                          });
                        }}
                      >
                        {prod}
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
          <div className="col-12 pb-3">
            <div className="d-flex align-items-center ">
              <div className="prod-search-input position-relative mr-3">
                <img
                  src="/icons/productsSearchIcon.png"
                  className="prodPage-search"
                  alt="search-icon"
                />
                <form onSubmit={handleOnSubmit}>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search..."
                    className="pl-4 w-100"
                  />
                </form>
              </div>
              <div className="prodPage-select brown-color d-flex">
                <span className="mr-1">Sort:</span>
                <select
                  style={{ maxWidth: "100px" }}
                  value={selectValue}
                  onChange={(event) => {
                    handleOnSelectChange(event);
                  }}
                >
                  <option disabled selected value="Featured">
                    Featured
                  </option>
                  <option value="Newest">Newest</option>
                  <option value="On Sale">On Sale</option>
                  <option value="Price-Lowest">Price - Lowest</option>
                  <option value="Price-Highest">Price - Highest</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          {productsData.slice(0, visibleProducts).map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}

          {isLoadMoreVisible && (
            <div className="col-12 text-center py-5">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  src="/icons/plusBold.png"
                  alt="bold plus"
                  style={{ width: "20px" }}
                />
                <p
                  className="d-inline mb-0 ml-1 font-weight-700"
                  onClick={handleLoadMore}
                  style={{ color: "#9B49234D", fontSize: "18px" }}
                >
                  Load more
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let apiUrl = "http://localhost:5001/products";

  const appendQueryCategoryParam = (paramName: any, paramValues: any) => {
    apiUrl += apiUrl.includes("?") ? "&" : "?";
    apiUrl += `${paramName}_like=${paramValues}`;
  };

  const appendQueryParam = (paramName: any, paramValues: any) => {
    apiUrl += apiUrl.includes("?") ? "&" : "?";
    apiUrl += `${paramName}=${paramValues}`;
  };

  if (query.type) {
    appendQueryParam("type", query.type);
  }

  if (query.category) {
    appendQueryCategoryParam("category", query.category);
  }

  if (query.searchTerm) {
    appendQueryCategoryParam("name", query.searchTerm);
  }

  if (query.sort) {
    if (query.sort === "Newest") {
      apiUrl += apiUrl.includes("?") ? "&" : "?";
      apiUrl += "_sort=createdAt&_order=asc";
    } else if (query.sort === "On Sale") {
      apiUrl += apiUrl.includes("?") ? "&" : "?";
      apiUrl += "discount.isDiscounted=true";
    } else if (query.sort === "Price-Lowest") {
      apiUrl += apiUrl.includes("?") ? "&" : "?";
      apiUrl += "_sort=price&_order=asc";
    } else if (query.sort === "Price-Highest") {
      apiUrl += apiUrl.includes("?") ? "&" : "?";
      apiUrl += "_sort=price&_order=desc";
    }
  }

  let res = await fetch(apiUrl);
  let productsData: ProductTypes[] = await res.json();

  return {
    props: {
      productsData,
    },
  };
};
