import { FavoritesAndBasketContext } from "@/context/BasketContextConstructor";
import { GetTotalCostContext } from "@/context/GetTotalCostContext";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormData {
  cardHolders: string;
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
}

const PaymentPage: NextPage = () => {
  const { register, handleSubmit, formState } = useForm<FormData>();

  const { savedTotalCost } = useContext(GetTotalCostContext);
  const { clearWholeBasket } = useContext(FavoritesAndBasketContext);

  const router = useRouter();

  const onFormSubmit: SubmitHandler<FormData> = (data) => {
    router.push({
      pathname: "/processing",
    });
    clearWholeBasket();
  };

  return (
    <>
      <main className="card-details-container">
        <div className="container">
          <div className="secure-payment">
            <div className="secure-payment-logo">
              <img
                className="secure-payment-helmet"
                src="/images/cardDetails/helmet.svg"
                alt=""
              />
              <img
                className="secure-payment-marinov"
                src="/images/cardDetails/marinov.svg"
                alt=""
              />
            </div>
            <div className="secure-payment-header">
              <img
                className="lock-img"
                src="/images/cardDetails/lock.svg"
                alt=""
              />
              <div className="secure-payment-text">Secure Payment</div>
            </div>
          </div>
          <div className="payment-info">
            <div className="payment-info-header">Payment Information</div>
            <div className="merchant">Merchant</div>
            <div className="merchant-name">Marinov design</div>
            <div className="website">Website</div>
            <div className="website-name">www.marinovdesign.com</div>
            <div className="ammount">Amount</div>
            <div className="ammount-total">€ {savedTotalCost}</div>
          </div>
          <h2 className="card-details-payment">Card Details</h2>
          <form className="card-form" onSubmit={handleSubmit(onFormSubmit)}>
            <div className="form-group">
              <label className="card-holders" htmlFor="cardHolders">
                Card Holder
              </label>
              <br />
              <input
                type="text"
                {...register("cardHolders", { required: true })}
                id="cardHolders"
                className="card-payment"
                placeholder="Card holder name here..."
              />
            </div>

            <div className="form-group">
              <label className="card-holders" htmlFor="cardNumber">
                Card Number
              </label>
              <br />
              <input
                type="text"
                {...register("cardNumber", { required: true })}
                id="cardNumber"
                className="card-payment"
                placeholder="0000 0000 0000 0000"
              />
            </div>

            <div className="form-group-order mb-5 d-flex">
              <div className="w-50">
                <label className="card-holders-small" htmlFor="expirationDate">
                  Expiration Date
                </label>
                <input
                  type="text"
                  {...register("expirationDate", { required: true })}
                  id="expirationDate"
                  className="card-payment"
                  placeholder="MM/YY"
                />
              </div>

              <div className="w-50">
                <label className="card-holders-small" htmlFor="securityCode">
                  Security Code
                </label>
                <input
                  type="text"
                  {...register("securityCode", { required: true })}
                  id="securityCode"
                  className="card-payment"
                  placeholder="000"
                />
              </div>
            </div>

            <div className="card-form-buttons d-flex flex-column align-items-center">
              <button
                className={`pay-now-btn ${!formState.isValid && "opacity-1"}`}
                type="submit"
                disabled={!formState.isValid}
              >
                Pay Now
              </button>
              <button className="cancel-btn">Cancel</button>
            </div>
          </form>
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
      </main>
    </>
  );
};

export default PaymentPage;
