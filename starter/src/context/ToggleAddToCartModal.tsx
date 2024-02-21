import { createContext, useState } from "react";

interface ContextData {
    toggle: boolean;
    toggleAddToCart: (state: boolean) => void;
}

interface IToggleAddToCartModalProvider {
    children: React.ReactNode;
}

export const ToggleAddToCartModalContext = createContext({} as ContextData);

export const ToggleAddToCartModalProvider = ({ children }: IToggleAddToCartModalProvider) => {
    const [toggle, setToggle] = useState(false);

    const toggleAddToCart = (state: boolean) => {
        setToggle(state);
    }

    return (
        <ToggleAddToCartModalContext.Provider value={{ toggle, toggleAddToCart }}>
            {children}
        </ToggleAddToCartModalContext.Provider>
    )
}