import { FavoritesAndBasketContext } from "@/context/BasketContextConstructor";
import { ToggleHamMenuContext } from "@/context/ToggleHamMenuContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ToggleAddToCartModalContext } from "@/context/ToggleAddToCartModal";

const Header: React.FC = () => {
  const { toggle, toggleHamMenu } = useContext(ToggleHamMenuContext);
  const { toggleAddToCart } = useContext(ToggleAddToCartModalContext);
  const { basket } = useContext(FavoritesAndBasketContext);
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 200;
      if (window.scrollY > scrollThreshold && isVisible) {
        setIsVisible(false);
      } else if (window.scrollY <= scrollThreshold && !isVisible) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isVisible]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const type = e.currentTarget.getAttribute("data-type");

    router.push({
      pathname: "/productsPage",
      query: {
        type,
      },
    });

    toggleHamMenu(false);
    toggleAddToCart(false);
  };

  const toggleMenu = () => {
    toggleHamMenu(!toggle);
  };

  const variants = {
    initial: {
      scaleY: 0,
      opacity: 0,
    },
    animate: {
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      opacity: 0,
      scaleY: 0,
      transformOrigin: "top",
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <>
      <header className="header">
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          className="container"
        >
          <AnimatePresence>
            <div className="row align-items-center justify-content-around">
              <div className="menu-container">
                <img
                  src="/images/home_page/nav_item_menu.svg"
                  alt="nav menu icon"
                  onClick={toggleMenu}
                />
                {toggle && (
                  <nav className="dropdown-nav">
                    <ul>
                      <li>
                        <Link href={"/"} onClick={toggleMenu}>
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"/productsPage"}
                          data-type="jewelry"
                          className="heading"
                          onClick={handleClick}
                        >
                          Jewelry
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"/productsPage"}
                          data-type="decor"
                          className="heading"
                          onClick={handleClick}
                        >
                          Home Decor
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"/customOrders"}
                          onClick={toggleMenu}
                          className="heading"
                        >
                          Custom Orders
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"/ourstory"}
                          onClick={toggleMenu}
                          className="heading"
                        >
                          Our Story
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"/faq"}
                          onClick={toggleMenu}
                          className="heading"
                        >
                          FAQ
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"/"}
                          className="heading"
                          onClick={toggleMenu}
                        >
                          Contact
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"/"}
                          className="heading"
                          onClick={toggleMenu}
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <p>
                          <span className="mr-2">EN</span>|
                          <span className="ml-2">MK</span>
                        </p>
                      </li>
                    </ul>
                  </nav>
                )}
              </div>
              <Link href={"/"} className="logo-container">
                <div className="logos-container d-flex flex-column justify-content-center align-items-center">
                  {isVisible && router.pathname === "/" && (
                    <motion.img
                      variants={variants}
                      src="/images/home_page/logomark.svg"
                      alt="logo"
                      className="w-50 mb-3"
                    />
                  )}
                  <img src="/images/home_page/logotype.svg" alt="logo" />
                </div>
              </Link>
              <Link href={"/cart"} className="cart-icon-container">
                <img
                  src="/images/home_page/nav_item_cart.svg"
                  alt="cart icon"
                />
                {basket.length > 0 && (
                  <span className="notification-icon">{basket.length}</span>
                )}
              </Link>
            </div>
          </AnimatePresence>
        </motion.div>
      </header>
    </>
  );
};
export default Header;
