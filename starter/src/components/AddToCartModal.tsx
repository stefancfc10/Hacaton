import Link from "next/link";

interface Props {
  title: string;
  closeModal: () => void;
}

const AddToCartModal = ({ title, closeModal }: Props) => {
  const handleOnClick = () => {
    closeModal();
  };
  return (
    <div className="cart-modal d-flex flex-column">
      <div
        onClick={handleOnClick}
        className="close-icon-container align-self-end"
      >
        <img
          src="/images/home_page/close-icon.svg"
          alt="close icon for the modal"
        />
      </div>
      <div className="heading d-flex flex-column align-items-center">
        {/* TODO: MAKE THIS DYNAMIC BASED ON THE PRODUCT THATS BEEN ADDED TO CART */}
        <h2>{title}</h2>
        <p>has been added to the cart.</p>
        <img
          src="/images/home_page/cart-butterfly-icon.svg"
          alt="image with a small butterfly"
        />
      </div>
      <div className="func d-flex flex-column">
        <Link href={"/cart"}>Go to Cart</Link>
        <button onClick={handleOnClick} type="button">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default AddToCartModal;
