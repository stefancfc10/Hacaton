import Link from "next/link";
import { useRouter } from "next/router";

const Footer: React.FC = () => {

    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const type = e.currentTarget.getAttribute("data-type");
        const category = e.currentTarget.getAttribute("data-category");

        if (category) {
            router.push({
                pathname: "/productsPage",
                query: {
                    type,
                    category,
                }
            })
        } else {
            router.push({
                pathname: "/productsPage",
                query: {
                    type
                }
            })
        }
    }

    return (
        <footer className="footer">
            <div className="top-footer">
                <div className="overlay"></div>
                <div className="img-container">
                    <img src="/images/home_page/logomark_L.svg" alt="logo" />
                </div>
                <div className="link">
                    <a href="/ourstory">See Our Story</a>
                </div>
            </div>
            <div className="bottom-footer">
                <div className="container">
                    <div className="img-container">
                        <img src="/images/home_page/logotype-footer.svg" alt="footer logo" />
                    </div>
                    <div className="footer-nav">
                        <ul className="w-100">
                            <li className="d-flex justify-content-between align-items-center w-100">
                                <Link href={"/productsPage"} data-type="jewelry" className="heading" onClick={handleClick}>Jewelry</Link>
                                <p><span className="heading en">EN</span>|<span className="mk">MK</span></p>
                            </li>
                            <li>
                                <Link href={"/productsPage"} data-category="earrings" data-type="jewelry" className="link-item" onClick={handleClick}>Earrings</Link>
                            </li>
                            <li>
                                <Link href={"/productsPage"} data-type="jewelry" data-category="rings" className="link-item" onClick={handleClick}>Rings</Link>
                            </li>
                            <li>
                                <Link href={"/productsPage"} data-type="jewelry" data-category="necklaces" className="link-item" onClick={handleClick}>Necklaces</Link>
                            </li>
                            <li>
                                <Link href={"/productsPage"} data-type="jewelry" data-category="bracelets" className="link-item" onClick={handleClick}>Bracelets</Link>
                            </li>
                            <li>
                                <Link href={"/productsPage"} data-type="jewelry" data-category="sets" className="link-item" onClick={handleClick}>Sets</Link>
                            </li>
                            <li>
                                <Link href={"/productsPage"} data-type="jewelry" data-category="other" className="link-item" onClick={handleClick}>Other</Link>
                            </li>
                            <li>
                                <Link href={"/productsPage"} data-type="decor" className="heading" onClick={handleClick}>Home Decor</Link>
                            </li>
                            <li>
                                <Link href={"/productsPage"} data-type="decor" data-category="helmets" className="link-item" onClick={handleClick}>Helmets</Link>
                            </li>
                            <li>
                                <Link href={"/productsPage"} data-type="decor" data-category="other" className="link-item" onClick={handleClick}>Other</Link>
                            </li>
                            <li>
                                <Link href={"/customOrders"} className="heading">Custom Orders</Link>
                            </li>
                            <li>
                                <Link href={"/about"} className="heading">Our Story</Link>
                            </li>
                            <li>
                                <Link href={"/faq"} className="heading">FAQ</Link>
                            </li>
                            <li>
                                <Link href={"/"} className="heading">Contact</Link>
                            </li>
                            <li>
                                <Link href={"/"} className="heading">Profile</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="socials">
                        <Link href={"/"}><img src="/images/home_page/instagram-icon.svg" alt="instagram icon" /></Link>
                        <Link href={"/"}><img src="/images/home_page/facebook-icon.svg" alt="facebook icon" /></Link>
                        <Link href={"/"}><img src="/images/home_page/whatsapp-icon.png" alt="whatsapp icon" /></Link>
                    </div>
                    <div className="legals">
                        <Link href={"/"}>Privacy Policy</Link>
                        <Link href={"/"}>Terms & Conditions</Link>
                        <Link href={"/"}>Shipping and Returns Policy</Link>
                    </div>
                    <div className="copyright">
                        <p>&copy; Marinov Design 2023 - All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;