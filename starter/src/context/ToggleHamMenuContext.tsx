import { createContext, useState } from "react";

interface ContextData {
    toggle: boolean;
    toggleHamMenu: (state: boolean) => void;
}

interface IToggleHamMenuProvider {
    children: React.ReactNode;
}

export const ToggleHamMenuContext = createContext({} as ContextData);

export const ToggleHamMenuProvider = ({ children }: IToggleHamMenuProvider) => {
    const [toggle, setToggle] = useState(false);

    const toggleHamMenu = (state: boolean) => {
        setToggle(state);
    }

    return (
        <ToggleHamMenuContext.Provider value={{ toggle, toggleHamMenu }}>
            {children}
        </ToggleHamMenuContext.Provider>
    )
}