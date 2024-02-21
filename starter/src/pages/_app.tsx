import Footer from "@/components/Footer";
import FooterWrapper from "@/components/FooterWrapper";
import Header from "@/components/Header";
import ScrollTopBtn from "@/components/ScrollTopBtn";
import BasketContextConstructor from "@/context/BasketContextConstructor";
import { GetTotalCostProvider } from "@/context/GetTotalCostContext";
import { ToggleAddToCartModalProvider } from "@/context/ToggleAddToCartModal";
import { ToggleHamMenuProvider } from "@/context/ToggleHamMenuContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const routesWithoutComponents = ["/processing", "/success", "/cardDetails"];
  const showComponents = !routesWithoutComponents.includes(router.pathname);

  return (
    <>
      <ToggleHamMenuProvider>
        <ToggleAddToCartModalProvider>
          <BasketContextConstructor>
            <GetTotalCostProvider>
              {showComponents && <Header />}
              {showComponents && <ScrollTopBtn />}
              <Component {...pageProps} />
              <FooterWrapper>{showComponents && <Footer />}</FooterWrapper>
            </GetTotalCostProvider>
          </BasketContextConstructor>
        </ToggleAddToCartModalProvider>
      </ToggleHamMenuProvider>
    </>
  );
}
