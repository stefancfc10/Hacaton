import { useRouter } from "next/router";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const FooterWrapper = ({ children }: Props) => {
  const router = useRouter();
  const isCartPageActive = router.pathname === "/cart";
  const isCheckOutPageActive = router.pathname === "/checkout";

  if (isCartPageActive || isCheckOutPageActive) {
    return null;
  }
  return <>{children}</>;
};

export default FooterWrapper;
