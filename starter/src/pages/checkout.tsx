import CartProducts from "@/components/CartProducts";
import { FavoritesAndBasketContext } from "@/context/BasketContextConstructor";
import { GetTotalCostContext } from "@/context/GetTotalCostContext";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import ReactFlagsSelect from "react-flags-select";

const Checkout: NextPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [toggleGiftCard, setToggleGiftCard] = useState(false);
  const [giftCardDiscount, setGiftCardDiscount] = useState(0);

  const { basket } = useContext(FavoritesAndBasketContext);
  const { totalCost, saveTotalCost } = useContext(GetTotalCostContext);

  const router = useRouter();

  function changeSelectedCountry(newCountryCode: string) {
    setSelectedCountry(newCountryCode);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleToggle = () => {
    setToggleGiftCard(!toggleGiftCard);
  };

  const redirectOnClick = () => {
    if (giftCardDiscount === 0) {
      saveTotalCost(totalCost + 10);
    }

    router.push({
      pathname: "/cardDetails",
    });
  };

  const handleGiftCard = () => {
    const calculateTotal = (totalCost + 10) * 0.2;
    const giftCardCost = Math.floor(calculateTotal);
    saveTotalCost(totalCost - calculateTotal);
    setGiftCardDiscount(giftCardCost);
  };

  return (
    <div className="main pb-3">
      <div className="checkout-container container">
        <div className="row">
          <div className="col-12">
            <h1>Contact and Shiping Details</h1>
            <p>
              Have an account? link <Link href="/">Log In</Link>
            </p>

            <form className="formPlace">
              <div>
                <label htmlFor="name">Full Name:</label>
                <br />
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your full name here..."
                  required
                  className="w-100 d-block"
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <br />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your email here..."
                  required
                  className="w-100 d-block"
                />
              </div>
              <br />
              <div>
                <label htmlFor="countrySelect">Country:</label>
                <ReactFlagsSelect
                  id="countrySelect"
                  selected={selectedCountry}
                  onSelect={(newCountryCode) =>
                    changeSelectedCountry(newCountryCode)
                  }
                />
              </div>

              <div>
                <label htmlFor="postalZip">Postal Zip:</label>
                <br />
                <input
                  type="number"
                  id="postalZip"
                  name="postalZip"
                  placeholder="Your Zip Code here..."
                  required
                  className="w-100 d-block"
                />
              </div>
              <div>
                <label htmlFor="city">City:</label>
                <br />
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Your City here..."
                  required
                  className="w-100 d-block"
                />
              </div>
              <div>
                <label htmlFor="address">Address:</label>
                <br />
                <input
                  id="address"
                  name="address"
                  placeholder="Your address here..."
                  required
                />
              </div>
            </form>
            <div>
              <div className="review-order">
                <h2>Review Order</h2>
                <div className="d-flex justify-content-between ml-3 mr-3">
                  <p>Product</p>
                  <p className="mr-3">Price</p>
                </div>
              </div>
              {basket.length !== 0 && (
                <>
                  <CartProducts products={basket} />
                  <div className="total-acumulated-price ml-3 mr-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <p>total</p>
                      <span>&euro;{totalCost + 10}</span>
                    </div>
                    {giftCardDiscount !== 0 && (
                      <>
                        <div className="d-flex align-items-center justify-content-between">
                          <p>-20%</p>
                          <span>-&euro;{giftCardDiscount}</span>
                        </div>
                        <div className="text-right">
                          <span>&euro;{totalCost - giftCardDiscount}</span>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}

              {basket.length !== 0 && (
                <div className="gift-card-container d-flex justify-content-between align-items-center pt-5">
                  <div className="img-container">
                    <img
                      src="/images/home_page/cart-butterfly-icon.svg"
                      alt="butterfly icon"
                      className="rotate"
                    />
                  </div>
                  <div>
                    <p>I have a Discount Code / Gift Card</p>
                  </div>
                  <div className="img-container" onClick={handleToggle}>
                    <img
                      src="/icons/shevron-down-icon.svg"
                      alt="arrow pointing up"
                    />
                  </div>
                </div>
              )}
              {toggleGiftCard && (
                <div className="mini-form d-flex pt-5 pb-5">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="gift-card-btn"
                    onClick={handleGiftCard}
                  >
                    Apply
                  </button>
                </div>
              )}
              <button
                disabled={basket.length === 0}
                className={`proceedBtn  ${basket.length === 0 ? "opacity-1" : ""
                  }`}
                type="button"
                onClick={redirectOnClick}
              >
                Proceed to Payment
              </button>
            </div>
            <div className="credid-cards d-flex justify-content-center align-items-center py-5">
              <div className="img-container">
                <img
                  src="/images/Contact/visa.png"
                  alt="credit card visa image"
                />
              </div>
              <div className="img-container">
                <img
                  src="/images/Contact/masterCard.png"
                  alt="credit card master card image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
